"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function MaintenanceDetailContent() {
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id");

  useEffect(() => {
    const stored = localStorage.getItem("sbs_user");
    if (!stored) { router.push("/login"); return; }
    if (!requestId) { setError("Keine Request-ID"); setLoading(false); return; }

    const API_KEY = "sbs_nexus_secret_2026";
    fetch(`https://app.sbsdeutschland.com/api/nexus/maintenance/requests/${requestId}`, {
      headers: { "Authorization": API_KEY }
    })
      .then(res => {
        if (!res.ok) throw new Error("Request nicht gefunden");
        return res.json();
      })
      .then(data => { setRequest(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [requestId, router]);

  const getUrgencyStyle = (urgency: string) => {
    switch(urgency) {
      case "critical": return { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/50", label: "🔴 Kritisch" };
      case "high": return { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/50", label: "🟠 Hoch" };
      case "normal": return { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/50", label: "🔵 Normal" };
      default: return { bg: "bg-slate-500/20", text: "text-slate-400", border: "border-slate-500/50", label: "⚪ Niedrig" };
    }
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return "text-emerald-400";
    if (conf >= 0.5) return "text-amber-400";
    return "text-red-400";
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-amber-400 text-xl animate-pulse">Lade Analyse...</div>
    </div>
  );

  if (error || !request) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
      <p className="text-red-400 text-lg">{error || "Request nicht gefunden"}</p>
      <Link href="/maintenance" className="text-amber-400 hover:underline">← Zurück zum Dashboard</Link>
    </div>
  );

  const part = request.part_info || {};
  const rec = request.recommendation || {};
  const urgency = getUrgencyStyle(request.urgency);
  const confidence = part.confidence || 0;
  const specs = part.specifications || {};

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/maintenance" className="text-slate-400 hover:text-white transition-colors">← Dashboard</Link>
          <div className="text-center">
            <h1 className="font-bold text-lg text-amber-400">Wartungsanalyse</h1>
            <p className="text-slate-500 text-sm">{request.request_id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${urgency.bg} ${urgency.text} ${urgency.border}`}>
            {urgency.label}
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Header Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{part.part_name || "Unbekanntes Teil"}</h2>
              {part.manufacturer && <p className="text-slate-400 mt-1">{part.manufacturer}</p>}
              {part.part_number && <p className="text-amber-400 font-mono text-sm mt-1">{part.part_number}</p>}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className={`text-3xl font-bold ${getConfidenceColor(confidence)}`}>{Math.round(confidence * 100)}%</p>
                <p className="text-slate-500 text-xs">Confidence</p>
              </div>
              {part.model_used && (
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-300">{part.model_used}</p>
                  <p className="text-slate-500 text-xs">KI-Modell</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Standort & Kontext */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Standort & Kontext</h3>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-slate-400">Standort</span><span>{request.location || "—"}</span></div>
              {request.machine_id && <div className="flex justify-between"><span className="text-slate-400">Maschine</span><span className="font-mono">{request.machine_id}</span></div>}
              <div className="flex justify-between"><span className="text-slate-400">Zeitpunkt</span><span>{new Date(request.timestamp).toLocaleString("de-DE")}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Status</span><span className="text-emerald-400">{request.status}</span></div>
            </div>
            {request.technician_notes && (
              <div className="mt-3 pt-3 border-t border-slate-800">
                <p className="text-slate-400 text-sm mb-1">Techniker-Notizen</p>
                <p className="text-slate-200">{request.technician_notes}</p>
              </div>
            )}
          </div>

          {/* Teil-Erkennung */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider">KI-Erkennung</h3>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-slate-400">Kategorie</span><span>{part.category || "—"}{part.subcategory ? ` → ${part.subcategory}` : ""}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Zustand</span>
                <span className={part.condition === "defekt" ? "text-red-400" : part.condition === "verschlissen" ? "text-orange-400" : "text-slate-300"}>
                  {part.condition || "—"}
                </span>
              </div>
              {part.description && <div className="flex justify-between"><span className="text-slate-400">Beschreibung</span><span className="text-right max-w-[60%]">{part.description}</span></div>}
            </div>
            {part.condition_details && (
              <div className="mt-3 pt-3 border-t border-slate-800">
                <p className="text-slate-400 text-sm mb-1">Zustandsdetails</p>
                <p className="text-slate-200 text-sm">{part.condition_details}</p>
              </div>
            )}
          </div>

          {/* Spezifikationen */}
          {(specs.dimensions || specs.pressure_rating || specs.connection_type) && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Technische Daten</h3>
              <div className="space-y-2">
                {specs.dimensions && specs.dimensions !== "Unbekannt" && <div className="flex justify-between"><span className="text-slate-400">Abmessungen</span><span className="text-right max-w-[60%]">{specs.dimensions}</span></div>}
                {specs.pressure_rating && specs.pressure_rating !== "Unbekannt" && <div className="flex justify-between"><span className="text-slate-400">Nenndruckbereich</span><span>{specs.pressure_rating}</span></div>}
                {specs.connection_type && specs.connection_type !== "N/A" && specs.connection_type !== "Unbekannt" && <div className="flex justify-between"><span className="text-slate-400">Anschlussart</span><span>{specs.connection_type}</span></div>}
              </div>
            </div>
          )}

          {/* Handlungsempfehlung */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Handlungsempfehlung</h3>
            <div className={`rounded-lg p-3 ${rec.action === "reorder" ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-orange-500/10 border border-orange-500/30"}`}>
              <p className={`font-semibold ${rec.action === "reorder" ? "text-emerald-400" : "text-orange-400"}`}>
                {rec.action === "reorder" ? "📦 Nachbestellung beim bekannten Lieferanten" : "🔍 Neuer Lieferant benötigt"}
              </p>
            </div>
            {rec.steps && rec.steps.map((step: string, i: number) => (
              <p key={i} className="text-slate-300 text-sm py-1 border-b border-slate-800/50 last:border-0">{step}</p>
            ))}
            {rec.summary && (
              <div className="mt-3 pt-3 border-t border-slate-800">
                <p className="text-amber-300 text-sm font-medium">{rec.summary}</p>
              </div>
            )}
          </div>
        </div>

        {/* Suchbegriffe */}
        {part.search_terms && part.search_terms.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Suchbegriffe für Beschaffung</h3>
            <div className="flex flex-wrap gap-2">
              {[...new Set(part.search_terms)].map((term: string, i: number) => (
                <span key={i} className="bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm">{term}</span>
              ))}
            </div>
          </div>
        )}

        {/* Garantie & Verträge */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Garantie-Status</h3>
            {request.warranty_status ? (
              <div>
                <p className={request.warranty_status.has_warranty ? "text-emerald-400" : "text-slate-400"}>
                  {request.warranty_status.has_warranty ? "✅ Garantie aktiv" : "⚠️ Keine Garantie gefunden"}
                </p>
                <p className="text-slate-500 text-sm mt-1">{request.warranty_status.recommendation}</p>
              </div>
            ) : <p className="text-slate-500">Keine Daten</p>}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Bestellhistorie</h3>
            {request.invoice_history && request.invoice_history.length > 0 ? (
              request.invoice_history.map((inv: any, i: number) => (
                <p key={i} className="text-slate-300 text-sm">{inv.supplier} – {inv.amount}€ ({inv.date})</p>
              ))
            ) : <p className="text-slate-500">Keine bisherigen Bestellungen gefunden</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-2">
          <Link href="/maintenance/new" className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-semibold text-center transition-all">
            + Neuer Alert
          </Link>
          <Link href="/maintenance" className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-semibold text-center transition-all">
            ← Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function MaintenanceDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-amber-400 text-xl animate-pulse">Lade...</div>
      </div>
    }>
      <MaintenanceDetailContent />
    </Suspense>
  );
}
