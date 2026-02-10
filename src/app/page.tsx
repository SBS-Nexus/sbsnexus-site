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
      <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏢</span>
            <span className="text-xl font-bold text-white">SBS Nexus</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-slate-300 hover:text-white transition">Produkte</a>
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition">Preise</a>
            <a href="https://sbsdeutschland.com" className="text-slate-300 hover:text-white transition">Kontakt</a>
          </nav>
          <div className="flex gap-3">
            {isLoggedIn ? (
              <Link href="/dashboard" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition">
                Dashboard →
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-slate-300 px-4 py-2 hover:text-white hidden md:block">Anmelden</Link>
                <Link href="/register" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition">
                  Kostenlos starten
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <span className="text-cyan-400 text-sm font-medium">🚀 Neu: Video-Diagnose mit Gemini 2.5 Pro</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              KI-Automatisierung<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                für deutsche Unternehmen
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Rechnungsverarbeitung, Vertragsanalyse und technische Dokumentation – 
              alles DSGVO-konform auf Servern in Frankfurt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition shadow-lg shadow-cyan-500/25">
                Kostenlos testen →
              </Link>
              <a href="https://calendly.com/sbsdeutschland" className="border border-slate-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition flex items-center justify-center gap-2">
                <span>📅</span> Demo vereinbaren
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">134+</p>
              <p className="text-slate-400 mt-1">Rechnungen verarbeitet</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">98.5%</p>
              <p className="text-slate-400 mt-1">KI-Genauigkeit</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">&lt;3s</p>
              <p className="text-slate-400 mt-1">Verarbeitungszeit</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white">100%</p>
              <p className="text-slate-400 mt-1">DSGVO-konform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Unsere Produkte</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Modulare KI-Lösungen für Ihre Geschäftsprozesse</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center text-2xl mb-6">📄</div>
              <h3 className="text-xl font-semibold text-white mb-3">Rechnungsverarbeitung</h3>
              <p className="text-slate-400 text-sm mb-4">OCR + KI-Extraktion mit automatischem DATEV-Export. XRechnung & ZUGFeRD Support.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Auto-Kontierung</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> DATEV-Export</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> E-Invoice Ready</li>
              </ul>
            </div>
            
            <div className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl mb-6">📝</div>
              <h3 className="text-xl font-semibold text-white mb-3">Vertragsanalyse</h3>
              <p className="text-slate-400 text-sm mb-4">KI-gestützte Analyse von Verträgen, Klauseln und Risiken mit Fristentracking.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Risiko-Erkennung</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Fristen-Alerts</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Vertrags-Register</li>
              </ul>
            </div>
            
            <div className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-orange-500/50 hover:bg-slate-800 transition-all duration-300 relative">
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEU</div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl mb-6">🔧</div>
              <h3 className="text-xl font-semibold text-white mb-3">HydraulikDoc AI</h3>
              <p className="text-slate-400 text-sm mb-4">Video-Diagnose mit Gemini 2.5 Pro + technische Dokumentationssuche.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><span className="text-orange-400">✓</span> Video-Analyse</li>
                <li className="flex items-center gap-2"><span className="text-orange-400">✓</span> RAG Search</li>
                <li className="flex items-center gap-2"><span className="text-orange-400">✓</span> Multi-Modal AI</li>
              </ul>
            </div>
            
            <div className="group bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-6">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-3">Finance Copilot</h3>
              <p className="text-slate-400 text-sm mb-4">Chat mit Ihren Finanzdaten. Analysen und Reports auf natürliche Weise.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Natural Language</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Smart Analytics</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Auto-Reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Enterprise Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Alles was Sie für professionelle KI-Automatisierung brauchen</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2">DSGVO-Konform</h3>
              <p className="text-slate-400 text-sm">Alle Daten auf deutschen Servern in Frankfurt. Google Cloud mit DPA.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Hybrid AI</h3>
              <p className="text-slate-400 text-sm">GPT-4, Claude 3.5 & Gemini 2.5 Pro – automatisch die beste KI für jeden Task.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔗</div>
              <h3 className="text-lg font-semibold text-white mb-2">Integrationen</h3>
              <p className="text-slate-400 text-sm">DATEV, SAP, Microsoft 365, Slack, Teams und mehr via n8n Workflows.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">👥</div>
              <h3 className="text-lg font-semibold text-white mb-2">Multi-User</h3>
              <p className="text-slate-400 text-sm">Team-Management mit Rollen, Berechtigungen und Audit-Logs.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">📊</div>
              <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
              <p className="text-slate-400 text-sm">Echtzeit-Dashboards und Reports für alle Ihre Prozesse.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🎧</div>
              <h3 className="text-lg font-semibold text-white mb-2">Enterprise Support</h3>
              <p className="text-slate-400 text-sm">Persönlicher Ansprechpartner, Mo-Fr 9-18 Uhr, SLA garantiert.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparente Preise</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Keine versteckten Kosten. Monatlich kündbar.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-slate-400 mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">€99</span>
                <span className="text-slate-400">/Monat</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 100 Rechnungen/Monat</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 50 Verträge/Monat</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> DATEV-Export</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> E-Mail Support</li>
              </ul>
              <Link href="/register" className="block text-center w-full py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-700 transition">
                Starten
              </Link>
            </div>
            
            <div className="bg-gradient-to-b from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/50 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                BELIEBT
              </div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">€299</span>
                <span className="text-slate-400">/Monat</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 500 Rechnungen/Monat</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Unbegrenzt Verträge</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> HydraulikDoc AI</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Finance Copilot</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 5 Team-Mitglieder</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Priority Support</li>
              </ul>
              <Link href="/register" className="block text-center w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition font-medium">
                Jetzt starten
              </Link>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-slate-400 mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Unbegrenzte Nutzung</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Alle Produkte</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Unbegrenzt Team</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> SSO / SAML</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Dedicated Support</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Custom Integrations</li>
              </ul>
              <a href="https://sbsdeutschland.com/kontakt" className="block text-center w-full py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-700 transition">
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-2xl">🇩🇪</span>
              <span>Made in Germany</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-2xl">🔒</span>
              <span>DSGVO-konform</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-2xl">☁️</span>
              <span>Server in Frankfurt</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-2xl">✅</span>
              <span>Google Cloud DPA</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bereit für KI-Automatisierung?</h2>
              <p className="text-blue-100 mb-8 text-lg">Starten Sie kostenlos – keine Kreditkarte erforderlich.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition">
                  Kostenlos starten →
                </Link>
                <a href="https://calendly.com/sbsdeutschland" className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition">
                  Demo buchen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4">Produkte</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Rechnungsverarbeitung</a></li>
                <li><a href="#" className="hover:text-white transition">Vertragsanalyse</a></li>
                <li><a href="#" className="hover:text-white transition">HydraulikDoc AI</a></li>
                <li><a href="#" className="hover:text-white transition">Finance Copilot</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://sbsdeutschland.com" className="hover:text-white transition">Über uns</a></li>
                <li><a href="https://sbsdeutschland.com/kontakt" className="hover:text-white transition">Kontakt</a></li>
                <li><a href="https://sbsdeutschland.com/karriere" className="hover:text-white transition">Karriere</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://sbsdeutschland.com/datenschutz" className="hover:text-white transition">Datenschutz</a></li>
                <li><a href="https://sbsdeutschland.com/impressum" className="hover:text-white transition">Impressum</a></li>
                <li><a href="https://sbsdeutschland.com/agb" className="hover:text-white transition">AGB</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="mailto:support@sbsdeutschland.com" className="hover:text-white transition">support@sbsdeutschland.com</a></li>
                <li className="text-slate-500">Mo-Fr 9-18 Uhr</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2026 SBS Deutschland GmbH · Weinheim, Deutschland</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏢</span>
              <span className="text-white font-medium">SBS Nexus</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
