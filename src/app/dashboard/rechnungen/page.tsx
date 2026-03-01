"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API = "https://app.sbsdeutschland.com/api/erechnung";

interface Invoice {
  document_id: string;
  status: string;
  file_name: string;
  document_type?: string;
  uploaded_at: string | null;
}

interface InvoiceDetail extends Invoice {
  tenant_id: string;
  uploaded_by: string | null;
  processed_at: string | null;
  source_system: string | null;
  allowed_transitions: string[];
}

interface AuditEvent {
  id: number;
  event_type: string;
  status_from: string | null;
  status_to: string | null;
  actor: string | null;
  created_at: string | null;
  details: Record<string, unknown>;
}

interface KontierungSuggestion {
  konto: string;
  gegenkonto: string;
  steuerschluessel: string;
  buchungstext: string;
  kostenstelle: string;
  confidence: number;
  reasoning: string;
  model: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  uploaded:          { label: "Hochgeladen",       color: "text-slate-400",   bg: "bg-slate-500/20" },
  classified:        { label: "Klassifiziert",     color: "text-blue-400",    bg: "bg-blue-500/20" },
  validated:         { label: "Validiert",         color: "text-teal-400",    bg: "bg-teal-500/20" },
  validation_failed: { label: "Validierung fehlg.",color: "text-red-400",     bg: "bg-red-500/20" },
  suggested:         { label: "KI-Vorschlag",      color: "text-amber-400",   bg: "bg-amber-500/20" },
  approved:          { label: "Freigegeben",       color: "text-emerald-400", bg: "bg-emerald-500/20" },
  rejected:          { label: "Abgelehnt",         color: "text-red-400",     bg: "bg-red-500/20" },
  exported:          { label: "DATEV Export",      color: "text-cyan-400",    bg: "bg-cyan-500/20" },
  archived:          { label: "Archiviert",        color: "text-purple-400",  bg: "bg-purple-500/20" },
};

const TRANSITION_ACTIONS: Record<string, { label: string; icon: string; style: string }> = {
  validated:    { label: "Validieren",  icon: "✓", style: "bg-teal-600 hover:bg-teal-500" },
  suggested:    { label: "KI Kontierung", icon: "🤖", style: "bg-amber-600 hover:bg-amber-500" },
  approved:     { label: "Freigeben",   icon: "✅", style: "bg-emerald-600 hover:bg-emerald-500" },
  rejected:     { label: "Ablehnen",    icon: "✗", style: "bg-red-600 hover:bg-red-500" },
  exported:     { label: "DATEV Export", icon: "📤", style: "bg-cyan-600 hover:bg-cyan-500" },
  archived:     { label: "Archivieren", icon: "📦", style: "bg-purple-600 hover:bg-purple-500" },
};

export default function ERechnungenPage() {
  const [user, setUser] = useState<{ id: number; name: string; email?: string } | null>(null);
  const [tenantId, setTenantId] = useState<string>("");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selected, setSelected] = useState<InvoiceDetail | null>(null);
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [kontierung, setKontierung] = useState<KontierungSuggestion | null>(null);
  const [chainStatus, setChainStatus] = useState<{ verified: boolean; chain_length: number } | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [tab, setTab] = useState<"detail" | "events" | "kontierung">("detail");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("sbs_user");
    if (!stored) { router.push("/login"); return; }
    const u = JSON.parse(stored);
    setUser(u);
    setTenantId(`tenant-${u.id}`);
  }, [router]);

  const headers = useCallback(() => ({
    "X-Tenant-ID": tenantId,
    "X-User-ID": user?.email || user?.name || "unknown",
  }), [tenantId, user]);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch invoices
  const fetchInvoices = useCallback(async () => {
    if (!tenantId) return;
    try {
      const url = filterStatus
        ? `${API}/invoices?status=${filterStatus}&limit=100`
        : `${API}/invoices?limit=100`;
      const res = await fetch(url, { headers: headers() });
      const data = await res.json();
      setInvoices(data.items || []);
    } catch { setInvoices([]); }
    setLoading(false);
  }, [tenantId, filterStatus, headers]);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  // Select invoice
  const selectInvoice = async (docId: string) => {
    try {
      const res = await fetch(`${API}/invoices/${docId}`, { headers: headers() });
      const detail: InvoiceDetail = await res.json();
      setSelected(detail);
      setTab("detail");
      setKontierung(null);
      setChainStatus(null);

      const evRes = await fetch(`${API}/invoices/${docId}/events`, { headers: headers() });
      setEvents(await evRes.json());
    } catch { showToast("Fehler beim Laden", "err"); }
  };

  // Transition
  const doTransition = async (target: string) => {
    if (!selected) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API}/invoices/${selected.document_id}/transition`, {
        method: "POST",
        headers: { ...headers(), "Content-Type": "application/json" },
        body: JSON.stringify({
          target_status: target,
          actor: user?.email || user?.name,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        showToast(err.detail || "Transition fehlgeschlagen", "err");
        return;
      }
      showToast(`Status → ${STATUS_CONFIG[target]?.label || target}`);
      await selectInvoice(selected.document_id);
      await fetchInvoices();
    } catch { showToast("Netzwerkfehler", "err"); }
    finally { setActionLoading(false); }
  };

  // AI Kontierung
  const requestKontierung = async () => {
    if (!selected) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API}/invoices/${selected.document_id}/kontierung`, {
        method: "POST",
        headers: { ...headers(), "Content-Type": "application/json" },
        body: JSON.stringify({
          invoice_data: {
            file_name: selected.file_name,
            rechnungsaussteller: selected.file_name.replace(/\.[^.]+$/, ""),
            document_type: selected.document_type,
          },
        }),
      });
      const data = await res.json();
      setKontierung(data.suggestion);
      setTab("kontierung");
      showToast("KI-Kontierung abgeschlossen");
      await selectInvoice(selected.document_id);
      await fetchInvoices();
    } catch { showToast("Kontierung fehlgeschlagen", "err"); }
    finally { setActionLoading(false); }
  };

  // DATEV Export
  const doDATEVExport = async () => {
    if (!selected || !kontierung) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API}/invoices/${selected.document_id}/datev-export`, {
        method: "POST",
        headers: { ...headers(), "Content-Type": "application/json" },
        body: JSON.stringify({
          konto: kontierung.konto,
          gegenkonto: kontierung.gegenkonto,
          betrag: 0,
          buchungstext: kontierung.buchungstext,
          steuerschluessel: kontierung.steuerschluessel,
          kostenstelle: kontierung.kostenstelle,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        showToast(err.detail || "DATEV Export fehlgeschlagen", "err");
        return;
      }
      const data = await res.json();
      showToast(`DATEV Export: ${data.batch_id}`);
      await selectInvoice(selected.document_id);
      await fetchInvoices();
    } catch { showToast("Export fehlgeschlagen", "err"); }
    finally { setActionLoading(false); }
  };

  // Verify Chain
  const verifyChain = async () => {
    if (!selected) return;
    try {
      const res = await fetch(`${API}/invoices/${selected.document_id}/chain/verify`, { headers: headers() });
      const data = await res.json();
      setChainStatus(data);
    } catch { showToast("Chain-Verification fehlgeschlagen", "err"); }
  };

  // Create Evidence Package
  const createEvidence = async () => {
    if (!selected) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API}/invoices/${selected.document_id}/evidence`, {
        method: "POST",
        headers: headers(),
      });
      if (!res.ok) {
        const err = await res.json();
        showToast(err.detail || "Evidence fehlgeschlagen", "err");
        return;
      }
      const data = await res.json();
      showToast(`GoBD Evidence: ${data.size_bytes} Bytes`);
    } catch { showToast("Evidence fehlgeschlagen", "err"); }
    finally { setActionLoading(false); }
  };

  // Upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setActionLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API}/invoices/upload`, {
        method: "POST",
        headers: headers(),
        body: formData,
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      showToast(`Hochgeladen: ${data.file_name}`);
      setShowUpload(false);
      await fetchInvoices();
      await selectInvoice(data.document_id);
    } catch { showToast("Upload fehlgeschlagen", "err"); }
    finally { setActionLoading(false); }
  };

  const statusBadge = (status: string) => {
    const cfg = STATUS_CONFIG[status] || { label: status, color: "text-slate-400", bg: "bg-slate-500/20" };
    return <span className={`text-xs px-2 py-1 rounded-full ${cfg.bg} ${cfg.color} font-medium`}>{cfg.label}</span>;
  };

  const formatDate = (d: string | null) => {
    if (!d) return "–";
    return new Date(d).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  // Stats
  const statusCounts = invoices.reduce<Record<string, number>>((acc, inv) => {
    acc[inv.status] = (acc[inv.status] || 0) + 1;
    return acc;
  }, {});

  if (!user) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-white">Laden...</p></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${toast.type === "ok" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm">← Dashboard</Link>
            <span className="text-slate-600">|</span>
            <span className="text-xl font-bold text-white">📄 E-Rechnungen</span>
            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Phase 1 MVP</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUpload(true)}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-500 transition"
            >
              + Rechnung hochladen
            </button>
            <span className="text-slate-400 text-sm">{user.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* KPI Row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {(["uploaded","classified","suggested","approved","exported","archived"] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
              className={`p-3 rounded-xl border transition text-center ${filterStatus === s ? "border-cyan-500 bg-cyan-500/10" : "border-slate-700 bg-slate-800 hover:border-slate-600"}`}
            >
              <p className={`text-2xl font-bold ${STATUS_CONFIG[s].color}`}>{statusCounts[s] || 0}</p>
              <p className="text-xs text-slate-500 mt-1">{STATUS_CONFIG[s].label}</p>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Invoice List */}
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-white font-semibold">Rechnungen ({invoices.length})</h2>
              {filterStatus && (
                <button onClick={() => setFilterStatus("")} className="text-xs text-cyan-400 hover:underline">
                  Filter zurücksetzen
                </button>
              )}
            </div>
            <div className="max-h-[calc(100vh-320px)] overflow-y-auto divide-y divide-slate-700/50">
              {loading ? (
                <div className="p-8 text-center text-slate-500">Laden...</div>
              ) : invoices.length === 0 ? (
                <div className="p-8 text-center text-slate-500">Keine Rechnungen{filterStatus ? ` mit Status "${STATUS_CONFIG[filterStatus]?.label}"` : ""}</div>
              ) : invoices.map(inv => (
                <button
                  key={inv.document_id}
                  onClick={() => selectInvoice(inv.document_id)}
                  className={`w-full text-left p-4 hover:bg-slate-700/50 transition ${selected?.document_id === inv.document_id ? "bg-slate-700/30 border-l-2 border-l-cyan-500" : ""}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-white text-sm font-medium truncate flex-1 mr-2">{inv.file_name}</p>
                    {statusBadge(inv.status)}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-500">{inv.document_id.slice(0, 8)}...</p>
                    <p className="text-xs text-slate-500">{formatDate(inv.uploaded_at)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-3 space-y-4">
            {!selected ? (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
                <p className="text-4xl mb-4">📄</p>
                <p className="text-slate-400">Rechnung auswählen oder neue hochladen</p>
              </div>
            ) : (
              <>
                {/* Action Bar */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h2 className="text-white font-semibold">{selected.file_name}</h2>
                      <p className="text-xs text-slate-500 font-mono mt-1">{selected.document_id}</p>
                    </div>
                    {statusBadge(selected.status)}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.allowed_transitions.map(t => {
                      const cfg = TRANSITION_ACTIONS[t];
                      if (!cfg) return null;

                      if (t === "suggested") {
                        return (
                          <button key={t} onClick={requestKontierung} disabled={actionLoading}
                            className={`px-3 py-2 rounded-lg text-sm text-white font-medium transition ${cfg.style} disabled:opacity-50`}>
                            {cfg.icon} {cfg.label}
                          </button>
                        );
                      }
                      if (t === "exported" && selected.status === "approved") {
                        return (
                          <button key={t} onClick={doDATEVExport} disabled={actionLoading || !kontierung}
                            className={`px-3 py-2 rounded-lg text-sm text-white font-medium transition ${cfg.style} disabled:opacity-50`}
                            title={!kontierung ? "Erst KI-Kontierung durchführen" : ""}>
                            {cfg.icon} {cfg.label}
                          </button>
                        );
                      }
                      return (
                        <button key={t} onClick={() => doTransition(t)} disabled={actionLoading}
                          className={`px-3 py-2 rounded-lg text-sm text-white font-medium transition ${cfg.style} disabled:opacity-50`}>
                          {cfg.icon} {cfg.label}
                        </button>
                      );
                    })}
                    {(selected.status === "exported" || selected.status === "archived") && (
                      <button onClick={createEvidence} disabled={actionLoading}
                        className="px-3 py-2 rounded-lg text-sm text-white font-medium bg-purple-600 hover:bg-purple-500 transition disabled:opacity-50">
                        🔒 GoBD Evidence
                      </button>
                    )}
                    <button onClick={verifyChain}
                      className="px-3 py-2 rounded-lg text-sm text-slate-300 font-medium bg-slate-700 hover:bg-slate-600 transition">
                      🔗 Chain prüfen
                    </button>
                  </div>
                  {chainStatus && (
                    <div className={`mt-3 p-2 rounded-lg text-sm ${chainStatus.verified ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                      {chainStatus.verified ? "✅" : "❌"} Hash-Chain: {chainStatus.chain_length} Events, {chainStatus.verified ? "Integrität bestätigt" : "MANIPULIERT"}
                    </div>
                  )}
                </div>

                {/* Tabs */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                  <div className="flex border-b border-slate-700">
                    {(["detail", "events", "kontierung"] as const).map(t => (
                      <button key={t} onClick={() => setTab(t)}
                        className={`px-4 py-3 text-sm font-medium transition ${tab === t ? "text-cyan-400 border-b-2 border-cyan-400 bg-slate-700/30" : "text-slate-400 hover:text-white"}`}>
                        {t === "detail" ? "📋 Details" : t === "events" ? `📜 Audit Trail (${events.length})` : "🤖 Kontierung"}
                      </button>
                    ))}
                  </div>

                  <div className="p-4">
                    {tab === "detail" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div><p className="text-xs text-slate-500">Tenant</p><p className="text-white text-sm">{selected.tenant_id}</p></div>
                        <div><p className="text-xs text-slate-500">Typ</p><p className="text-white text-sm">{selected.document_type || "–"}</p></div>
                        <div><p className="text-xs text-slate-500">Hochgeladen von</p><p className="text-white text-sm">{selected.uploaded_by || "–"}</p></div>
                        <div><p className="text-xs text-slate-500">Quelle</p><p className="text-white text-sm">{selected.source_system || "–"}</p></div>
                        <div><p className="text-xs text-slate-500">Upload</p><p className="text-white text-sm">{formatDate(selected.uploaded_at)}</p></div>
                        <div><p className="text-xs text-slate-500">Verarbeitet</p><p className="text-white text-sm">{formatDate(selected.processed_at)}</p></div>
                      </div>
                    )}

                    {tab === "events" && (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {events.map((ev, i) => (
                          <div key={ev.id} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full ${i === events.length - 1 ? "bg-cyan-400" : "bg-slate-600"}`} />
                              {i < events.length - 1 && <div className="w-0.5 flex-1 bg-slate-700" />}
                            </div>
                            <div className="flex-1 pb-3">
                              <div className="flex justify-between items-start">
                                <p className="text-white text-sm font-medium">{ev.event_type}</p>
                                <p className="text-xs text-slate-500">{formatDate(ev.created_at)}</p>
                              </div>
                              <p className="text-xs text-slate-400 mt-1">
                                {ev.status_from ? `${ev.status_from} → ${ev.status_to}` : `→ ${ev.status_to}`}
                                {ev.actor && ` • ${ev.actor}`}
                              </p>
                              {Object.keys(ev.details).length > 0 && (
                                <pre className="text-xs text-slate-500 mt-1 bg-slate-900/50 p-2 rounded overflow-x-auto">
                                  {JSON.stringify(ev.details, null, 2)}
                                </pre>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {tab === "kontierung" && (
                      kontierung ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 p-3 rounded-lg">
                              <p className="text-xs text-slate-500">Konto</p>
                              <p className="text-2xl font-bold text-amber-400">{kontierung.konto}</p>
                            </div>
                            <div className="bg-slate-900/50 p-3 rounded-lg">
                              <p className="text-xs text-slate-500">Gegenkonto</p>
                              <p className="text-2xl font-bold text-amber-400">{kontierung.gegenkonto}</p>
                            </div>
                            <div><p className="text-xs text-slate-500">Steuerschlüssel</p><p className="text-white text-sm">{kontierung.steuerschluessel}</p></div>
                            <div><p className="text-xs text-slate-500">Buchungstext</p><p className="text-white text-sm">{kontierung.buchungstext}</p></div>
                            <div><p className="text-xs text-slate-500">Kostenstelle</p><p className="text-white text-sm">{kontierung.kostenstelle || "–"}</p></div>
                            <div><p className="text-xs text-slate-500">Model</p><p className="text-white text-sm">{kontierung.model}</p></div>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-xs text-slate-500">Confidence</p>
                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${kontierung.confidence >= 0.7 ? "bg-emerald-500" : kontierung.confidence >= 0.4 ? "bg-amber-500" : "bg-red-500"}`}
                                style={{ width: `${kontierung.confidence * 100}%` }} />
                            </div>
                            <p className="text-sm text-white font-medium">{(kontierung.confidence * 100).toFixed(0)}%</p>
                          </div>
                          <p className="text-xs text-slate-400 italic">{kontierung.reasoning}</p>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-slate-500 text-sm">Noch keine Kontierung. Klicke "🤖 KI Kontierung" um einen Vorschlag zu erhalten.</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowUpload(false)}>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-semibold text-lg mb-4">📄 Rechnung hochladen</h3>
            <label className="block border-2 border-dashed border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-cyan-500 transition">
              <p className="text-3xl mb-2">📁</p>
              <p className="text-slate-400 text-sm">PDF oder XML Datei auswählen</p>
              <p className="text-xs text-slate-500 mt-1">XRechnung, ZUGFeRD, PDF</p>
              <input type="file" accept=".pdf,.xml" className="hidden" onChange={handleUpload} />
            </label>
            <button onClick={() => setShowUpload(false)} className="mt-4 w-full py-2 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600">
              Abbrechen
            </button>
          </div>
        </div>
      )}

      <footer className="mt-12 py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm text-slate-500">
          <p>© 2026 SBS Deutschland GmbH • E-Rechnungs API v1.1.0</p>
          <p>GoBD-konform • SHA-256 Hash-Chain • 10 Jahre Aufbewahrung</p>
        </div>
      </footer>
    </div>
  );
}
