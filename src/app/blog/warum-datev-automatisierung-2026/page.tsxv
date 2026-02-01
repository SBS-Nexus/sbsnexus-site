'use client';

import Link from 'next/link';

export default function BlogPostDATEV() {
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
            <Link href="/blog" className="text-white text-sm font-medium">Blog</Link>
            <Link href="/about" className="text-slate-400 hover:text-white text-sm">Über uns</Link>
            <Link 
              href="https://calendly.com/ki-sbsdeutschland/sbs-nexus-30-minuten-discovery-call"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Demo buchen
            </Link>
          </nav>
        </div>
      </header>

      {/* Article */}
      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span>/</span>
            <span className="text-slate-500">Finance Intelligence</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full">
                Finance Intelligence
              </span>
              <span className="text-slate-500 text-sm">8 Min Lesezeit</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Warum DATEV-Automatisierung 2026 kein Luxus mehr ist
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Der deutsche Mittelstand verarbeitet Millionen Rechnungen pro Jahr manuell. 
              Mit KI-gestützter Automatisierung lässt sich die Buchhaltungszeit um 70% reduzieren.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-400 pb-8 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  LS
                </div>
                <div>
                  <p className="text-white font-medium">Luis Schenk</p>
                  <p className="text-slate-500 text-xs">Geschäftsführer, SBS Deutschland</p>
                </div>
              </div>
              <span className="text-slate-600">•</span>
              <span>28. Januar 2026</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Das Problem: 4,2 Minuten pro Rechnung</h2>
            <p className="text-slate-300 mb-6">
              In einer Befragung von 50 mittelständischen Unternehmen haben wir gemessen: 
              <strong className="text-white"> Die durchschnittliche Verarbeitungszeit pro Eingangsrechnung beträgt 4,2 Minuten</strong>. 
              Das klingt wenig – bis man rechnet.
            </p>
            <p className="text-slate-300 mb-6">
              Ein Unternehmen mit 500 Rechnungen pro Monat investiert also:
            </p>
            <ul className="list-disc list-inside text-slate-300 mb-6 space-y-2">
              <li>500 × 4,2 Min = <strong className="text-white">35 Stunden pro Monat</strong></li>
              <li>420 Stunden pro Jahr</li>
              <li>Bei 50€/Stunde Vollkosten: <strong className="text-orange-400">21.000€ pro Jahr</strong></li>
            </ul>
            <p className="text-slate-300 mb-6">
              Und das nur für die Erfassung – ohne Freigabeprozesse, Rückfragen beim Lieferanten oder Korrekturen.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Warum Excel und PDF-Konverter nicht reichen</h2>
            <p className="text-slate-300 mb-6">
              Viele Unternehmen haben bereits Teilautomatisierung versucht: OCR-Tools, die Text aus PDFs extrahieren, 
              oder Excel-Makros, die Daten umformatieren. Das Problem:
            </p>
            <div className="bg-slate-800/50 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-white mb-4">Die 3 Grenzen klassischer OCR</h3>
              <ol className="list-decimal list-inside text-slate-300 space-y-3">
                <li><strong className="text-white">Keine Kontextverständnis:</strong> OCR erkennt "1.250,00 €", weiß aber nicht, ob das Netto, Brutto oder MwSt ist.</li>
                <li><strong className="text-white">Keine DATEV-Logik:</strong> Die Zuordnung zum richtigen Sachkonto erfordert Steuer-Know-how.</li>
                <li><strong className="text-white">Keine Fehlerkorrektur:</strong> Wenn der Scanner "I" statt "1" erkennt, wird die Rechnung falsch gebucht.</li>
              </ol>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Der KI-Unterschied: Von 4,2 auf 0,2 Minuten</h2>
            <p className="text-slate-300 mb-6">
              Moderne KI-Systeme wie SBS Nexus Finance Intelligence kombinieren mehrere Technologien:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-8">
              {[
                { title: 'Vision AI', desc: 'Erkennt Rechnungslayout, Tabellen, Logos' },
                { title: 'NLP', desc: 'Versteht Kontext: "Zahlbar bis" = Fälligkeit' },
                { title: 'Steuerlogik', desc: 'Deutsche MwSt-Sätze, Reverse Charge, §13b' },
                { title: 'Lernfähigkeit', desc: 'Merkt sich Ihre Kontierungsmuster' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-300 mb-6">
              Das Ergebnis: <strong className="text-white">92% der Rechnungen werden vollautomatisch korrekt kontiert</strong>. 
              Die restlichen 8% erhalten einen Vorschlag, der manuell bestätigt wird.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">ROI-Rechnung: Wann lohnt sich die Investition?</h2>
            <p className="text-slate-300 mb-6">
              Rechnen wir mit konservativen Zahlen:
            </p>
            <div className="bg-slate-800/50 rounded-xl p-6 my-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 pb-3">Metrik</th>
                    <th className="text-right text-slate-400 pb-3">Vorher</th>
                    <th className="text-right text-slate-400 pb-3">Nachher</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-3">Zeit pro Rechnung</td>
                    <td className="text-right">4,2 Min</td>
                    <td className="text-right text-green-400">0,2 Min</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3">Monatliche Stunden (500 Rechnungen)</td>
                    <td className="text-right">35 h</td>
                    <td className="text-right text-green-400">1,7 h</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3">Jährliche Kosten (50€/h)</td>
                    <td className="text-right">21.000€</td>
                    <td className="text-right text-green-400">1.020€</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-white">Ersparnis pro Jahr</td>
                    <td className="text-right"></td>
                    <td className="text-right text-orange-400 font-bold">19.980€</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-300 mb-6">
              Bei SBS Nexus Finance Intelligence (ab 899€/Monat) amortisiert sich die Investition 
              <strong className="text-white"> in weniger als 6 Monaten</strong>.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Der DATEV-Export: Warum "native" wichtig ist</h2>
            <p className="text-slate-300 mb-6">
              Viele Tools werben mit "DATEV-kompatibel". Das bedeutet oft nur: Sie exportieren eine CSV-Datei. 
              Der Unterschied zu einer <strong className="text-white">nativen DATEV-Integration</strong>:
            </p>
            <ul className="list-disc list-inside text-slate-300 mb-6 space-y-2">
              <li><strong className="text-white">Sachkontenrahmen:</strong> SKR03, SKR04, Branchenrahmen automatisch erkannt</li>
              <li><strong className="text-white">Steuercode-Mapping:</strong> Korrekte USt-Kennzeichen für jeden Beleg</li>
              <li><strong className="text-white">Belegbild-Verknüpfung:</strong> PDF wird mit Buchungssatz archiviert</li>
              <li><strong className="text-white">Keine Steuerberater-Rückfragen:</strong> Export ist sofort verarbeitbar</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Fazit: 2026 ist das Jahr der Automatisierung</h2>
            <p className="text-slate-300 mb-6">
              Die Technologie ist reif. Die Kosten sind gesunken. Und der Fachkräftemangel in der Buchhaltung 
              macht Automatisierung zur strategischen Notwendigkeit.
            </p>
            <p className="text-slate-300 mb-6">
              Unternehmen, die 2026 noch manuell Rechnungen erfassen, werden es schwer haben, 
              mit automatisierten Wettbewerbern Schritt zu halten – nicht nur bei den Kosten, 
              sondern auch bei der Geschwindigkeit von Finanzentscheidungen.
            </p>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-orange-500/20 to-slate-800/50 rounded-xl p-8 my-12 border border-orange-500/30">
              <h3 className="text-xl font-bold text-white mb-4">
                Testen Sie SBS Nexus Finance Intelligence
              </h3>
              <p className="text-slate-300 mb-6">
                30-Minuten Demo mit Ihren echten Rechnungen. Sehen Sie live, wie die Automatisierung funktioniert.
              </p>
              <Link
                href="https://calendly.com/ki-sbsdeutschland/sbs-nexus-30-minuten-discovery-call"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Demo buchen
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Author Box */}
          <div className="border-t border-slate-800 pt-8 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                LS
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Luis Schenk</h3>
                <p className="text-slate-400 text-sm mb-2">Geschäftsführer, SBS Deutschland GmbH</p>
                <p className="text-slate-500 text-sm">
                  Luis baut KI-Automatisierung für den deutschen Mittelstand – aus Weinheim, 
                  20km von SAP entfernt.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="border-t border-slate-800 pt-12 mt-12">
            <h2 className="text-xl font-bold text-white mb-6">Weiterlesen</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'n8n vs. Zapier: Welche Automatisierung passt zum Mittelstand?', category: 'Automation' },
                { title: 'Benchmark: Wie schnell verarbeitet Ihre Buchhaltung Rechnungen?', category: 'Finance Intelligence' },
              ].map((post, idx) => (
                <Link key={idx} href="/blog" className="bg-slate-800/30 rounded-lg p-5 border border-slate-700/50 hover:border-slate-600 transition">
                  <span className="text-xs text-orange-400 mb-2 block">{post.category}</span>
                  <h3 className="text-white font-medium">{post.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 SBS Deutschland GmbH · Weinheim · Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/blog" className="text-white text-sm">Blog</Link>
            <Link href="/security" className="text-slate-500 hover:text-white text-sm">Security</Link>
            <Link href="/about" className="text-slate-500 hover:text-white text-sm">Über uns</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
