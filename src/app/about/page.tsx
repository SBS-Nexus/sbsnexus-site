'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const timeline = [
    {
      year: '2020',
      title: 'Gründung SBS Deutschland GmbH',
      description: 'Start als IT-Consulting für den Mittelstand in Weinheim.',
    },
    {
      year: '2023',
      title: 'Erste KI-Projekte',
      description: 'Entwicklung von Prototypen für Dokumentenautomatisierung.',
    },
    {
      year: '2024',
      title: 'HydraulikDoc entsteht',
      description: 'Technical Intelligence für Industriehydraulik wird zum Differenziator.',
    },
    {
      year: '2025',
      title: 'SBS Nexus Platform',
      description: 'Vereinigung von Finance, Contract und Technical Intelligence.',
    },
    {
      year: '2026',
      title: 'Enterprise Launch',
      description: 'Go-to-Market mit Fokus auf fertigenden Mittelstand im DACH-Raum.',
    },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Fokus statt Feature-Bloat',
      description: 'Wir lösen spezifische Probleme des fertigenden Mittelstands – nicht alles für alle.',
    },
    {
      icon: '🇩🇪',
      title: 'Datensouveränität',
      description: '100% deutsche Rechenzentren. DSGVO ist keine Checkbox, sondern Überzeugung.',
    },
    {
      icon: '🤝',
      title: 'Partnerschaft, nicht Lizenz',
      description: 'Wir verstehen uns als verlängerte IT-Abteilung, nicht als anonymer SaaS-Vendor.',
    },
    {
      icon: '⚡',
      title: 'Pragmatismus',
      description: 'Lieber heute eine 80%-Lösung live als in 6 Monaten die perfekte PowerPoint.',
    },
  ];

  const stats = [
    { value: '2020', label: 'Gegründet' },
    { value: 'Weinheim', label: 'Standort' },
    { value: '3', label: 'KI-Module' },
    { value: '100%', label: 'Deutsche Server' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SBS</span>
            </div>
            <span className="text-white font-semibold">SBS Nexus</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/#modules" className="text-slate-400 hover:text-white text-sm">Module</Link>
            <Link href="/pricing" className="text-slate-400 hover:text-white text-sm">Pricing</Link>
            <Link href="/security" className="text-slate-400 hover:text-white text-sm">Security</Link>
            <Link href="/about" className="text-white text-sm font-medium">Über uns</Link>
            <Link 
              href="https://calendly.com/ki-sbsdeutschland/sbs-nexus-30-minuten-discovery-call"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Demo buchen
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Wir sind SBS Deutschland
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            Ein Team aus Weinheim, das KI-Automatisierung für den deutschen Mittelstand baut – 
            nicht aus dem Silicon Valley, sondern aus dem Herzen der Metropolregion Rhein-Neckar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-800/50 px-6 py-4 rounded-xl">
                <p className="text-2xl font-bold text-orange-500">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Unsere Geschichte</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-slate-300 mb-6">
              <strong className="text-white">SBS Deutschland GmbH</strong> wurde 2020 in Weinheim gegründet – 
              mit der Mission, mittelständischen Unternehmen dabei zu helfen, ihre Prozesse zu digitalisieren, 
              ohne dabei auf amerikanische Cloud-Giganten angewiesen zu sein.
            </p>
            <p className="text-lg text-slate-300 mb-6">
              Was als klassisches IT-Consulting begann, entwickelte sich schnell weiter: Wir erkannten, 
              dass unsere Kunden nicht noch ein Tool brauchen, sondern eine <strong className="text-white">Plattform, 
              die ihre bestehenden Systeme verbindet</strong> – SAP, DATEV, technische Dokumentationen.
            </p>
            <p className="text-lg text-slate-300">
              Heute ist <strong className="text-orange-400">SBS Nexus</strong> unser Flaggschiff-Produkt: 
              Eine Automatisierungsplattform, die Finance, Legal und Technik in einem System vereint – 
              gebaut für die Realität des deutschen Mittelstands.
            </p>
          </div>
        </div>
      </section>

      {/* Weinheim Location */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Verwurzelt in Weinheim
              </h2>
              <p className="text-slate-300 mb-6">
                Unser Standort ist kein Zufall. Weinheim liegt im Herzen der <strong className="text-white">Metropolregion 
                Rhein-Neckar</strong> – einer der industriestärksten Regionen Deutschlands.
              </p>
              <ul className="space-y-4">
                {[
                  { distance: '20 km', company: 'SAP (Walldorf)', note: 'Europas größter Softwarekonzern' },
                  { distance: '0 km', company: 'Freudenberg (Weinheim)', note: 'Weltmarktführer Dichtungstechnik' },
                  { distance: '30 km', company: 'BASF (Ludwigshafen)', note: 'Größter Chemiekonzern weltweit' },
                  { distance: '25 km', company: 'Röchling (Mannheim)', note: 'Hidden Champion Kunststoff' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                      {item.distance}
                    </span>
                    <div>
                      <p className="text-white font-medium">{item.company}</p>
                      <p className="text-slate-400 text-sm">{item.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
              <div className="aspect-video bg-slate-700/50 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <span className="text-6xl">🏭</span>
                  <p className="text-slate-400 mt-4">Rhein-Neckar Metropolregion</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-2">SBS Deutschland GmbH</p>
                <p className="text-slate-400 text-sm">
                  In der Dell 19<br />
                  69469 Weinheim<br />
                  Deutschland
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meilensteine</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700 hidden md:block" />
            
            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 z-10">
                    {item.year}
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 flex-1 border border-slate-700/50">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Unsere Werte</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SBS Nexus Product */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">SBS Nexus</h2>
          <p className="text-xl text-slate-400 mb-8">
            Unser Flaggschiff-Produkt: Eine Automatisierungsplattform, die drei KI-Module 
            in einem System vereint.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: '💰', name: 'Finance Intelligence', desc: 'Rechnungen → DATEV' },
              { icon: '📋', name: 'Contract Intelligence', desc: 'Verträge & Fristen' },
              { icon: '🔧', name: 'Technical Intelligence', desc: 'HydraulikDoc AI' },
            ].map((module, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-xl p-6">
                <span className="text-3xl mb-3 block">{module.icon}</span>
                <h3 className="text-white font-semibold mb-1">{module.name}</h3>
                <p className="text-slate-400 text-sm">{module.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/#modules"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium"
          >
            Mehr über die Module erfahren
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Lassen Sie uns sprechen
          </h2>
          <p className="text-slate-400 mb-8">
            30 Minuten, keine Slides – wir zeigen Ihnen live, wie SBS Nexus in Ihrem Unternehmen funktionieren könnte.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://calendly.com/ki-sbsdeutschland/sbs-nexus-30-minuten-discovery-call"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Discovery Call buchen
            </Link>
            <Link
              href="mailto:info@sbsdeutschland.com"
              className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              E-Mail schreiben
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-white font-semibold">SBS Deutschland GmbH</p>
            <p className="text-slate-500 text-sm">
              In der Dell 19 · 69469 Weinheim · Deutschland
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/security" className="text-slate-500 hover:text-white text-sm">Security</Link>
            <Link href="/about" className="text-white text-sm">Über uns</Link>
            <Link href="/impressum" className="text-slate-500 hover:text-white text-sm">Impressum</Link>
            <Link href="/datenschutz" className="text-slate-500 hover:text-white text-sm">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
