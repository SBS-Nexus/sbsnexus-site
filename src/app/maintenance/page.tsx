"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MaintenanceRequest {
  request_id: string;
  part_name: string;
  location: string;
  urgency: string;
  status: string;
  timestamp: string;
  recommendation: string;
  manufacturer?: string;
  technician_notes?: string;
}

interface MaintenanceStats {
  total_requests: number;
  this_month: number;
  by_status: Record<string, number>;
  by_urgency: Record<string, number>;
}

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [stats, setStats] = useState<MaintenanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("sbs_user");
    if (!stored) { router.push("/login"); return; }

    const API_KEY = "sbs_nexus_secret_2026";
    
    fetch("https://app.sbsdeutschland.com/api/nexus/maintenance/stats", {
      headers: { "Authorization": API_KEY }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});

    fetch("https://app.sbsdeutschland.com/api/nexus/maintenance/requests?limit=50", {
      headers: { "Authorization": API_KEY }
    })
      .then(res => res.json())
      .then(data => setRequests(data.requests || []))
      .catch(() => {});

    setLoading(false);
  }, [router]);

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "normal": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/50";
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending": return "bg-yellow-500/20 text-yellow-400";
      case "completed": return "bg-emerald-500/20 text-emerald-400";
      default: return "bg-slate-500/20 text-slate-400";
    }
  };

  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(r => r.urgency === filter || r.status === filter);

  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-white">Laden...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-slate-400 hover:text-white">← Dashboard</Link>
            <span className="text-slate-600">|</span>
            <span className="text-2xl">🔧</span>
            <span className="text-xl font-bold text-white">Smart Maintenance Alert</span>
          </div>
          <Link href="/maintenance/new" className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-600">
            + Neuer Alert
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-400 text-sm">Gesamt Alerts</p>
            <p className="text-3xl font-bold text-amber-400 mt-1">{stats?.total_requests || 0}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-400 text-sm">Diesen Monat</p>
            <p className="text-3xl font-bold text-cyan-400 mt-1">{stats?.this_month || 0}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-400 text-sm">Kritisch</p>
            <p className="text-3xl font-bold text-red-400 mt-1">{stats?.by_urgency?.critical || 0}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-400 text-sm">Offen</p>
            <p className="text-3xl font-bold text-yellow-400 mt-1">{stats?.by_status?.pending || 0}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "critical", "high", "normal", "pending", "completed"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === f ? "bg-amber-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
              {f === "all" ? "Alle" : f === "critical" ? "🔴 Kritisch" : f === "high" ? "🟠 Hoch" : f === "normal" ? "🔵 Normal" : f === "pending" ? "⏳ Offen" : "✅ Erledigt"}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
              <span className="text-6xl">🔧</span>
              <p className="text-slate-400 mt-4">Keine Wartungsanfragen gefunden</p>
            </div>
          ) : (
            filteredRequests.map((req) => (
              <Link href={`/maintenance/detail?id=${req.request_id}`} key={req.request_id} className="block bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-amber-500/50 hover:bg-slate-800/80 transition-all cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(req.urgency)}`}>
                        {req.urgency === "critical" ? "🔴 KRITISCH" : req.urgency === "high" ? "🟠 HOCH" : "🔵 NORMAL"}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(req.status)}`}>
                        {req.status === "pending" ? "⏳ Offen" : "✅ Erledigt"}
                      </span>
                      <span className="text-slate-500 text-xs">{req.request_id}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{req.part_name || "Unbekanntes Teil"}</h3>
                    <p className="text-slate-400 text-sm mt-1">📍 {req.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-sm">{new Date(req.timestamp).toLocaleDateString('de-DE')}</p>
                    <p className="text-amber-400 text-sm mt-1">{req.recommendation === "reorder" ? "📦 Nachbestellen" : "🔍 Neuer Lieferant"}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
