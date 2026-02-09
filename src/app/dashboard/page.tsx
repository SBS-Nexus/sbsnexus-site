"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);
  const [stats, setStats] = useState({ invoicesTotal: 0, invoicesMonth: 0, contractsTotal: 0, videoDiagnoses: 0, successRate: 0 });
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState("checking");
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("sbs_user");
    if (!savedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(savedUser));
    
    async function fetchStats() {
      try {
        const res = await fetch("https://app.sbsdeutschland.com/api/nexus/stats");
        const data = await res.json();
        setStats({
          invoicesTotal: data.invoices?.total || 0,
          invoicesMonth: data.invoices?.this_month || 0,
          contractsTotal: data.contracts?.total || 0,
          videoDiagnoses: data.video_diagnoses?.total || 0,
          successRate: data.success_rate || 0
        });
        setApiStatus("online");
      } catch {
        setApiStatus("offline");
      }
      setLoading(false);
    }
    fetchStats();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("sbs_token");
    localStorage.removeItem("sbs_user");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Willkommen zurück, {user.name}! 👋</h1>
              <p className="text-slate-300 mt-1">Ihre SBS Produkte auf einen Blick.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm ${apiStatus === "online" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                ● {apiStatus === "online" ? "Systeme online" : "Offline"}
              </span>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.role === "admin" ? "Administrator" : "User"}</p>
                </div>
                <button onClick={handleLogout} className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-sm">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Rechnungen</p>
            <p className="text-3xl font-bold text-cyan-600">{loading ? "..." : stats.invoicesTotal}</p>
            <p className="text-xs text-gray-400 mt-1">Diesen Monat: {stats.invoicesMonth}</p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Verträge</p>
            <p className="text-3xl font-bold text-purple-600">{loading ? "..." : stats.contractsTotal}</p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Video-Diagnosen</p>
            <p className="text-3xl font-bold text-orange-600">{loading ? "..." : stats.videoDiagnoses}</p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Erfolgsrate</p>
            <p className="text-3xl font-bold text-green-600">{loading ? "..." : stats.successRate}%</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">🚀 Ihre Produkte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <a href="https://app.sbsdeutschland.com" className="bg-white rounded-xl border p-6 hover:shadow-lg hover:border-cyan-300 transition-all">
            <span className="text-3xl">📄</span>
            <h3 className="font-semibold mt-2">Rechnungsverarbeitung</h3>
            <p className="text-sm text-gray-500">DATEV-Export</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-cyan-500 rounded-full" style={{width: `${Math.min((stats.invoicesTotal/200)*100, 100)}%`}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{stats.invoicesTotal} / 200</p>
          </a>
          <a href="https://contract.sbsdeutschland.com" className="bg-white rounded-xl border p-6 hover:shadow-lg hover:border-purple-300 transition-all">
            <span className="text-3xl">📝</span>
            <h3 className="font-semibold mt-2">Vertragsanalyse</h3>
            <p className="text-sm text-gray-500">KI-Analyse</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-purple-500 rounded-full" style={{width: `${Math.min((stats.contractsTotal/100)*100, 100)}%`}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{stats.contractsTotal} / 100</p>
          </a>
          <a href="https://knowledge-sbsdeutschland.streamlit.app" className="bg-white rounded-xl border p-6 hover:shadow-lg hover:border-orange-300 transition-all">
            <span className="text-3xl">🔧</span>
            <h3 className="font-semibold mt-2">HydraulikDoc AI</h3>
            <p className="text-sm text-gray-500">+ Video-Diagnose</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-orange-500 rounded-full" style={{width: `${Math.min((stats.videoDiagnoses/50)*100, 100)}%`}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{stats.videoDiagnoses} / 50</p>
          </a>
          <a href="https://automation.sbsdeutschland.com" className="bg-white rounded-xl border p-6 hover:shadow-lg hover:border-slate-300 transition-all">
            <span className="text-3xl">⚡</span>
            <h3 className="font-semibold mt-2">Workflows</h3>
            <p className="text-sm text-gray-500">n8n Automation</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-slate-500 rounded-full" style={{width: "18%"}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">89 / 500</p>
          </a>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">🆕 Neu: Video-Diagnose</h3>
          <p className="text-orange-100 mt-1">Maschinengeräusche mit KI analysieren. Powered by Gemini 2.5 Pro.</p>
          <a href="https://knowledge-sbsdeutschland.streamlit.app" className="inline-block mt-4 bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50">
            Jetzt testen →
          </a>
        </div>
      </main>
      
      <footer className="border-t mt-12 py-6 text-center text-sm text-gray-500">
        © 2026 SBS Deutschland GmbH · Weinheim
      </footer>
    </div>
  );
}
