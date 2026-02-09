"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("sbs_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">🏢 SBS Nexus</h1>
          <div className="flex gap-3">
            {isLoggedIn ? (
              <Link href="/dashboard" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700">
                Dashboard →
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-slate-300 px-4 py-2 hover:text-white">Anmelden</Link>
                <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700">
                  Kostenlos testen
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          Ihre KI-Plattform für<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Enterprise Automation
          </span>
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
          Rechnungsverarbeitung, Vertragsanalyse und technische Dokumentation – 
          alles in einer DSGVO-konformen Plattform.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition">
            Jetzt starten →
          </Link>
          <a href="https://sbsdeutschland.com" className="border border-slate-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition">
            Mehr erfahren
          </a>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-bold text-white text-center mb-12">Unsere Produkte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500 transition">
            <span className="text-4xl">📄</span>
            <h4 className="text-lg font-semibold text-white mt-4">KI-Rechnungsverarbeitung</h4>
            <p className="text-slate-400 mt-2 text-sm">Automatische Extraktion & DATEV-Export in Sekunden.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition">
            <span className="text-4xl">📝</span>
            <h4 className="text-lg font-semibold text-white mt-4">Vertragsanalyse</h4>
            <p className="text-slate-400 mt-2 text-sm">KI-gestützte Analyse von Verträgen und Klauseln.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-orange-500 transition">
            <span className="text-4xl">🔧</span>
            <h4 className="text-lg font-semibold text-white mt-4">HydraulikDoc AI</h4>
            <p className="text-slate-400 mt-2 text-sm">Technische Dokumentation + Video-Diagnose mit Gemini.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-500 transition">
            <span className="text-4xl">⚡</span>
            <h4 className="text-lg font-semibold text-white mt-4">Workflow Automation</h4>
            <p className="text-slate-400 mt-2 text-sm">n8n Enterprise Workflows für Ihre Prozesse.</p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="flex flex-wrap justify-center gap-8 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> DSGVO-konform
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Server in Frankfurt
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Google Cloud DPA
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Enterprise Support
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Bereit für KI-Automatisierung?</h3>
          <p className="text-blue-100 mb-8">Starten Sie noch heute mit SBS Nexus.</p>
          <Link href="/login" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition">
            Kostenlos testen →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 SBS Deutschland GmbH · Weinheim</p>
          <div className="flex gap-6">
            <a href="https://sbsdeutschland.com/datenschutz" className="hover:text-white">Datenschutz</a>
            <a href="https://sbsdeutschland.com/impressum" className="hover:text-white">Impressum</a>
            <a href="https://sbsdeutschland.com/security" className="hover:text-white">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
