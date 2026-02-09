"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Stats {
  invoices: { total: number; this_month: number };
  contracts: { total: number; this_month: number };
  video_diagnoses: { total: number; this_month: number };
  success_rate: number;
}

interface Activity {
  type: string;
  text: string;
  time: string;
  amount?: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<{id: number; name: string; email: string; is_admin: boolean} | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("sbs_user");
    if (!stored) { router.push("/login"); return; }
    
    const userData = JSON.parse(stored);
    setUser(userData);
    
    // Fetch stats
    fetch(`https://app.sbsdeutschland.com/api/nexus/stats/${userData.id}`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
    
    // Fetch activities
    fetch(`https://app.sbsdeutschland.com/api/nexus/activity/${userData.id}`)
      .then(res => res.json())
      .then(data => setActivities(data.activities || []))
      .catch(() => {});
    
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("sbs_token");
    localStorage.removeItem("sbs_user");
    router.push("/login");
  };

  if (loading || !user) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-white">Laden...</p></div>;
  }

  const invoiceTotal = stats?.invoices?.total ?? 0;
  const contractTotal = stats?.contracts?.total ?? 0;
  const videoTotal = stats?.video_diagnoses?.total ?? 0;
  const invoiceMonth = stats?.invoices?.this_month ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏢</span>
            <span className="text-xl font-bold text-white">SBS Nexus</span>
          </div>
          <div className="flex items-center gap-3">
            {user.is_admin && (
              <Link href="/admin" className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">Admin</Link>
            )}
            <span className="text-slate-300">{user.name}</span>
            <button onClick={handleLogout} className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Willkommen, {user.name.split(' ')[0]}!</h1>
          <p className="text-slate-400 mt-1">Ihre KI-Plattform auf einen Blick</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <a href="https://app.sbsdeutschland.com/upload" className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-4 rounded-xl text-white hover:scale-105 transition-transform">
            <span className="text-2xl">📄</span>
            <p className="font-semibold mt-2">Rechnung hochladen</p>
          </a>
          <a href="https://contract.sbsdeutschland.com/" className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white hover:scale-105 transition-transform">
            <span className="text-2xl">📑</span>
            <p className="font-semibold mt-2">Vertrag analysieren</p>
          </a>
          <a href="https://hydraulik.sbsdeutschland.com/" className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl text-white hover:scale-105 transition-transform">
            <span className="text-2xl">🔧</span>
            <p className="font-semibold mt-2">Video-Diagnose</p>
          </a>
          <a href="https://app.sbsdeutschland.com/copilot" className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-xl text-white hover:scale-105 transition-transform">
            <span className="text-2xl">🤖</span>
            <p className="font-semibold mt-2">Finance Copilot</p>
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Stats + Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">Rechnungen</p>
                <p className="text-3xl font-bold text-cyan-400 mt-1">{invoiceTotal}</p>
                <p className="text-xs text-slate-500 mt-1">+{invoiceMonth} diesen Monat</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">Verträge</p>
                <p className="text-3xl font-bold text-purple-400 mt-1">{contractTotal}</p>
                <p className="text-xs text-slate-500 mt-1">Analysiert</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">Video-Diagnosen</p>
                <p className="text-3xl font-bold text-orange-400 mt-1">{videoTotal}</p>
                <p className="text-xs text-slate-500 mt-1">Durchgeführt</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <p className="text-slate-400 text-sm">Erfolgsrate</p>
                <p className="text-3xl font-bold text-emerald-400 mt-1">{stats?.success_rate ?? 98}%</p>
                <p className="text-xs text-slate-500 mt-1">KI-Genauigkeit</p>
              </div>
            </div>

            {/* Usage Progress */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-semibold">Monatsverbrauch</h3>
                <span className="text-sm text-slate-400">{invoiceMonth} / ∞ Rechnungen</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all" style={{width: `${Math.min((invoiceMonth / 100) * 100, 100)}%`}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Enterprise Plan • Unbegrenzt</p>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Invoice Product */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 border-t-4 border-t-cyan-500">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">📄 KI-Rechnungsverarbeitung</h3>
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Enterprise</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">DATEV-Export, OCR, Auto-Kontierung</p>
                <div className="flex gap-2">
                  <a href="https://app.sbsdeutschland.com/history" className="text-sm bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">📋 Historie</a>
                  <a href="https://app.sbsdeutschland.com/analytics" className="text-sm bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">📊 Analytics</a>
                </div>
              </div>

              {/* Contract Product */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 border-t-4 border-t-purple-500">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-white font-semibold flex items-center gap-2">📑 KI-Vertragsanalyse</h3>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Enterprise</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">Risiko-Erkennung, Fristen, Register</p>
                <div className="flex gap-2">
                  <a href="https://contract.sbsdeutschland.com/history" className="text-sm bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">📋 Register</a>
                  <a href="https://contract.sbsdeutschland.com/analytics" className="text-sm bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg">📊 Analytics</a>
                </div>
              </div>
            </div>

            {/* HydraulikDoc Banner */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs bg-white/20 text-white px-2 py-1 rounded mb-2 inline-block">NEU</span>
                  <h3 className="text-xl font-bold text-white">🔧 HydraulikDoc AI v4.2</h3>
                  <p className="text-orange-100 mt-1">Video-Diagnose mit Gemini 2.5 Pro</p>
                </div>
                <a href="https://hydraulik.sbsdeutschland.com/" className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50">Starten →</a>
              </div>
            </div>
          </div>

          {/* Right: Activity Feed */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-3">🟢 System Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Invoice API</span>
                  <span className="text-emerald-400">Online</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Contract API</span>
                  <span className="text-emerald-400">Online</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">HydraulikDoc</span>
                  <span className="text-emerald-400">Online</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">AI Services</span>
                  <span className="text-emerald-400">GPT-4 + Claude</span>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-4">📋 Letzte Aktivitäten</h3>
              <div className="space-y-3">
                {activities.length === 0 ? (
                  <p className="text-slate-500 text-sm">Keine Aktivitäten</p>
                ) : (
                  activities.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-700 last:border-0">
                      <span className="text-lg">{activity.type === 'login' ? '🔐' : '📄'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{activity.text}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                      {activity.amount && (
                        <span className="text-sm font-medium text-emerald-400">{activity.amount.toFixed(2)}€</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2">💬 Support</h3>
              <p className="text-slate-400 text-sm mb-3">Enterprise Support Mo-Fr 9-18 Uhr</p>
              <a href="mailto:support@sbsdeutschland.com" className="text-sm text-cyan-400 hover:underline">support@sbsdeutschland.com</a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm text-slate-500">
          <p>© 2026 SBS Deutschland GmbH</p>
          <div className="flex gap-4">
            <a href="https://sbsdeutschland.com/sbshomepage/impressum.html" className="hover:text-slate-300">Impressum</a>
            <a href="https://sbsdeutschland.com/sbshomepage/datenschutz.html" className="hover:text-slate-300">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
