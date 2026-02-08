"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats] = useState({
    invoicesTotal: 127,
    contractsTotal: 45,
    videoDiagnoses: 12,
    successRate: 98.5
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Willkommen zurück, Luis! 👋</h1>
              <p className="text-slate-300 mt-1">Ihre SBS Produkte auf einen Blick.</p>
            </div>
            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
              ● Alle Systeme online
            </span>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Rechnungen</p>
            <p className="text-3xl font-bold text-cyan-600">{stats.invoicesTotal}</p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Verträge</p>
            <p className="text-3xl font-bold text-purple-600">{stats.contractsTotal}</p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Video-Diagnosen</p>
            <p className="text-3xl font-bold text-orange-600">{stats.videoDiagnoses}</p>
          </div>
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">Erfolgsrate</p>
            <p className="text-3xl font-bold text-green-600">{stats.successRate}%</p>
          </div>
        </div>

        {/* Products */}
        <h2 className="text-lg font-semibold mb-4">🚀 Ihre Produkte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <a href="https://app.sbsdeutschland.com" className="bg-white rounded-xl border p-6 hover:shadow-lg hover:border-cyan-300 transition-all">
            <span className="text-3xl">📄</span>
            <h3 className="font-semibold mt-2">Rechnungsverarbeitung</h3>
            <p className="text-sm text-gray-500">DATEV-Export</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-cyan-500 rounded-full" style={{width: "64%"}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">127 / 200</p>
          </a>
          
          <a href="https://contract.sbsdeutschland.com" className="bg-white rounded-xl border p-6 hover:shadow-lg hover:border-purple-300 transition-all">
            <span className="text-3xl">📝</span>
            <h3 className="font-semibold mt-2">Vertragsanalyse</h3>
            <p className="text-sm text-gray-500">KI-Analyse</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-purple-500 rounded-full" style={{width: "45%"}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">45 / 100</p>
          </a>
          
          <a href="https://knowledge-sbsdeutschland.streamlit.app" className="bg-white rounded-xl border p-6 hover:shadow-lg hover:border-orange-300 transition-all">
            <span className="text-3xl">🔧</span>
            <h3 className="font-semibold mt-2">HydraulikDoc AI</h3>
            <p className="text-sm text-gray-500">+ Video-Diagnose</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full">
              <div className="h-full bg-orange-500 rounded-full" style={{width: "24%"}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">12 / 50</p>
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

        {/* Banner */}
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
