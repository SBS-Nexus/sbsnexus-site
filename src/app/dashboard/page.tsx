"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sbs_user");
      if (stored) setUser(JSON.parse(stored));
      else setUser({ name: "User", email: "" });
    } catch {
      setUser({ name: "User", email: "" });
    }
  }, []);

  if (!user) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay:"0ms"}}/>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay:"150ms"}}/>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay:"300ms"}}/>
      </div>
    </div>
  );

  const modules = [
    { href: "/dashboard/rechnungen", icon: "\ud83d\udcc4", title: "Rechnungen", desc: "Upload & Verarbeitung", color: "from-cyan-500 to-cyan-600" },
    { href: "/dashboard/analytics", icon: "\ud83d\udcca", title: "Analytics", desc: "KPIs & Charts", color: "from-violet-500 to-purple-600" },
    { href: "/dashboard/copilot", icon: "\ud83e\udd16", title: "Finance Copilot", desc: "KI-Chat", color: "from-emerald-500 to-green-600" },
    { href: "https://contract.sbsdeutschland.com/", icon: "\ud83d\udccb", title: "Vertragsanalyse", desc: "Contract Intelligence", color: "from-orange-500 to-amber-600" },
  ];

  const quickActions = [
    { href: "/dashboard/rechnungen", label: "Rechnung hochladen", icon: "\u2b06\ufe0f" },
    { href: "/dashboard/copilot", label: "KI fragen", icon: "\ud83d\udcac" },
    { href: "/dashboard/analytics", label: "Reports ansehen", icon: "\ud83d\udcc8" },
    { href: "https://app.sbsdeutschland.com/api/erechnung/docs", label: "API Docs", icon: "\ud83d\udcd6" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Sidebar + Header */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center font-bold text-slate-900 text-xs">SN</div>
              <span className="text-lg font-bold hidden sm:block">SBS Nexus</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {modules.map((m, i) => (
              <a key={i} href={m.href} className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
                {m.icon} {m.title}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400 hidden sm:block">{user.name}</span>
            <button onClick={() => { localStorage.removeItem("sbs_token"); localStorage.removeItem("sbs_user"); window.location.href = "/login"; }}
              className="text-xs text-slate-500 hover:text-white px-2 py-1 rounded transition">Logout</button>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Willkommen, {user.name.split(" ")[0]}!</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Ihre KI-Plattform auf einen Blick</p>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {modules.map((m, i) => (
            <a key={i} href={m.href}
              className={"bg-gradient-to-br " + m.color + " p-4 sm:p-5 rounded-xl text-white hover:scale-[1.02] transition-transform"}>
              <span className="text-2xl">{m.icon}</span>
              <p className="font-semibold mt-2 text-sm sm:text-base">{m.title}</p>
              <p className="text-xs opacity-80 mt-0.5">{m.desc}</p>
            </a>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Schnellzugriff</h2>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((a, i) => (
              <a key={i} href={a.href}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-300 hover:text-white hover:border-slate-600 transition">
                <span>{a.icon}</span> {a.label}
              </a>
            ))}
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* System Status */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Systemstatus</h3>
            <div className="space-y-3">
              {[
                { label: "E-Rechnungs API", status: "live", detail: "v1.2.0" },
                { label: "KI-Kontierung", status: "live", detail: "Gemini + Claude" },
                { label: "DATEV Export", status: "live", detail: "SKR03 nativ" },
                { label: "Email Ingestion", status: "active", detail: "5 Min Intervall" },
                { label: "GoBD Compliance", status: "live", detail: "SHA-256 Chain" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{s.detail}</span>
                    <span className={"w-2 h-2 rounded-full " + (s.status === "live" ? "bg-emerald-400" : "bg-amber-400")}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Teaser */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-300">Letzte Aktivit\u00e4ten</h3>
              <a href="/dashboard/analytics" className="text-xs text-cyan-400 hover:text-cyan-300 transition">Alle ansehen \u2192</a>
            </div>
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm mb-3">Aktivit\u00e4ten werden in Analytics angezeigt</p>
              <a href="/dashboard/analytics" className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600/20 border border-violet-500/30 rounded-lg text-sm text-violet-300 hover:text-violet-200 transition">
                \ud83d\udcca Analytics \u00f6ffnen
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Nav Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 md:hidden z-50">
          <div className="flex justify-around py-2">
            {modules.slice(0, 4).map((m, i) => (
              <a key={i} href={m.href} className="flex flex-col items-center gap-0.5 px-3 py-1 text-slate-400 hover:text-white transition">
                <span className="text-lg">{m.icon}</span>
                <span className="text-[10px]">{m.title}</span>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
