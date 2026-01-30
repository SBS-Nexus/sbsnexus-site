import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Top Bar */}
        <header className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/90 shadow-lg shadow-cyan-500/30">
              <span className="text-xs font-black tracking-tight text-slate-950">
                SBS
              </span>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                SBS Nexus
              </div>
              <div className="text-xs text-slate-400">
                Business Process Automation · Weinheim · Rhein-Neckar-Odenwald
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <a href="#modules" className="hover:text-slate-50">
              Module
            </a>
            <a href="#architecture" className="hover:text-slate-50">
              Architektur
            </a>
            <a href="#region" className="hover:text-slate-50">
              Region
            </a>
            <a href="#contact" className="hover:text-slate-50">
              Pilot starten
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Das operative OS für den{" "}
              <span className="text-cyan-400">
                fertigenden Mittelstand
              </span>
              .
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
              SBS Nexus verbindet Rechnungsverarbeitung, Vertragsanalyse und
              technische Dokumenten-KI in einer Plattform – gebaut in Weinheim
              im Rhein-Neckar-Odenwald-Kreis, direkt neben SAP, Freudenberg
              und BASF.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="rounded-md bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300"
              >
                Pilot anfragen (3 Monate)
              </Link>
              <a
                href="#modules"
                className="text-xs font-medium text-slate-200 underline-offset-4 hover:underline"
              >
                Module ansehen
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              <span>SAP-kompatibel</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>DATEV-ready</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>100% DSGVO-konforme Datenhaltung in deutschen Rechenzentren</span>
            </div>
          </div>

          {/* Hero Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-[0_0_40px_rgba(15,23,42,0.8)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-400">
              Beispiel-Workflow · Instandhaltung
            </p>
            <h2 className="mt-2 text-sm font-semibold text-slate-50">
              Maschine steht – SBS Nexus schaltet durch
            </h2>
            <ol className="mt-4 space-y-3 text-xs text-slate-200">
              <li>
                <span className="font-semibold text-cyan-300">1.</span>{" "}
                Technical Intelligence (HydraulikDoc) findet das richtige
                Zylinder- oder Ventil-Datenblatt in Sekunden.
              </li>
              <li>
                <span className="font-semibold text-cyan-300">2.</span>{" "}
                Contract Intelligence prüft Service- und Garantiebedingungen
                in den Wartungsverträgen.
              </li>
              <li>
                <span className="font-semibold text-cyan-300">3.</span>{" "}
                Finance Intelligence erstellt Bestellung, Kontierungsvorschlag
                und DATEV-Export.
              </li>
              <li>
                <span className="font-semibold text-cyan-300">4.</span>{" "}
                n8n-Workflows orchestrieren Freigaben, SAP-Bestellung und
                Rückmeldung an das Service-Team.
              </li>
            </ol>
            <p className="mt-4 border-t border-slate-800 pt-3 text-[11px] text-slate-400">
              Ergebnis: weniger Stillstandszeit, weniger E-Mail-Pingpong, mehr
              Transparenz im kompletten Rhein-Neckar-Werkverbund.
            </p>
          </div>
        </section>

        {/* Modules */}
        <section id="modules" className="mt-16 md:mt-20">
          <h2 className="text-xl font-semibold tracking-tight">
            Drei Intelligence-Module – eine Plattform
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Finance, Legal und Technik arbeiten selten im gleichen System.
            SBS Nexus verbindet diese Welten zu durchgängigen Workflows für
            Maschinenbau, Automotiv-Zulieferer und Industrie im
            Rhein-Neckar-Odenwald-Raum.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Finance Intelligence
              </div>
              <h3 className="mt-2 text-sm font-semibold">
                Rechnungsverarbeitung, die DATEV versteht
              </h3>
              <p className="mt-3 text-xs text-slate-300">
                KI-gestützte Eingangsrechnungen mit Extraktion, Duplicate-Check,
                Kontierungsvorschlägen und DATEV-Export. Entwickelt für
                Finance-Teams mit 200–10.000 Belegen pro Monat.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-300">
                <li>• Upload aus E-Mail-Postfächern, Portalen oder Scannern</li>
                <li>• Kontierung & Kostenstellenvorschlag nach Buchungslogik</li>
                <li>• Export nach DATEV, Lexware & SAP FI</li>
              </ul>
            </div>

            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-300">
                Contract Intelligence
              </div>
              <h3 className="mt-2 text-sm font-semibold">
                Verträge, Fristen und Risiken im Griff
              </h3>
              <p className="mt-3 text-xs text-slate-300">
                Automatisierte Analyse von Lieferanten-, Wartungs- und
                SaaS-Verträgen mit Risikoscore, Fristenkalender und
                Klauselvergleich – in deutscher und englischer Sprache.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-300">
                <li>• Erkennung von Kündigungs- und Verlängerungsklauseln</li>
                <li>• Risiko-Scoring je Vertrag und Vertragspartner</li>
                <li>• Integration in Finance- und ERP-Prozesse</li>
              </ul>
            </div>

            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Technical Intelligence
              </div>
              <h3 className="mt-2 text-sm font-semibold">
                HydraulikDoc für Service & Konstruktion
              </h3>
              <p className="mt-3 text-xs text-slate-300">
                Technische Dokumenten-KI für Zylinder, Ventile und Antriebe.
                80-seitige Datenblätter werden zu einem dialogfähigen Assistenten
                für Instandhaltung und Engineering.
              </p>
              <ul className="mt-4 space-y-1.5 text-[11px] text-slate-300">
                <li>• Volltextsuche mit Kontext und Seitenangaben</li>
                <li>• Prüfung von Parametern wie Prüfdruck, Medien, Temperatur</li>
                <li>• Vorbereitung von Service-Reports und Ersatzteil-Listen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="mt-16 md:mt-20">
          <h2 className="text-xl font-semibold tracking-tight">
            Architektur für den Enterprise-Mittelstand
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Frontend auf Vercel – Kernplattform in deutschen Rechenzentren
            (z.&nbsp;B. Hetzner) mit FastAPI, PostgreSQL, S3-kompatiblem
            Storage und n8n als Workflow-Engine. Konzipiert für Audits,
            Due Diligence und IT-Security-Teams.
          </p>

          <div className="mt-6 grid gap-4 text-[11px] text-slate-300 md:grid-cols-3">
            <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
              <div className="text-xs font-semibold text-slate-100">
                Daten & Compliance
              </div>
              <ul className="mt-2 space-y-1.5">
                <li>• Speicherung in deutschen Rechenzentren</li>
                <li>• Mandantengetrennte Datenhaltung</li>
                <li>• AV-Verträge mit Infrastruktur-Providern</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
              <div className="text-xs font-semibold text-slate-100">
                Integration
              </div>
              <ul className="mt-2 space-y-1.5">
                <li>• SAP S/4HANA & ECC via OData/REST</li>
                <li>• DATEV & Buchhaltungssoftware im DACH-Raum</li>
                <li>• Messaging & Ticketing (Teams, Slack, Jira)</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
              <div className="text-xs font-semibold text-slate-100">
                Betrieb
              </div>
              <ul className="mt-2 space-y-1.5">
                <li>• Monitoring & Logging zentralisiert</li>
                <li>• API-first-Ansatz für alle Module</li>
                <li>• Staging-Umgebungen für Pilotkunden</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Region */}
        <section id="region" className="mt-16 md:mt-20">
          <h2 className="text-xl font-semibold tracking-tight">
            Verwurzelt in der Region Rhein-Neckar-Odenwald
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            SBS Deutschland GmbH sitzt in Weinheim – zwischen Odenwald und
            Rhein-Neckar-Metropolregion. Wir kennen die Realität von
            mittelständischen Produktionsstandorten, Werksverbünden und deren
            SAP- und DATEV-Landschaften.
          </p>
        </section>

        {/* Contact / Pilot */}
        <section
          id="contact"
          className="mt-16 border-t border-slate-900 pt-8 md:mt-20"
        >
          <h2 className="text-xl font-semibold tracking-tight">
            Pilotprojekt starten
          </h2>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            Drei Monate, klar definierter Scope, gemeinsame Erfolgsmessung.
            Ideal für fertigende Unternehmen ab ca. 20 Mitarbeitenden mit
            SAP- oder DATEV-Anbindung.
          </p>
          <div className="mt-5 space-y-1 text-sm text-slate-200">
            <p>
              E-Mail:{" "}
              <a
                href="mailto:info@sbsdeutschland.com"
                className="underline underline-offset-2"
              >
                info@sbsdeutschland.com
              </a>
            </p>
            <p>
              Oder direkt einen Termin buchen:{" "}
              <a
                href="https://calendly.com/DEIN-CALENDLY-LINK"
                target="_blank"
                className="underline underline-offset-2"
              >
                30-Minuten-Demo
              </a>
            </p>
          </div>
        </section>

        <footer className="mt-14 border-t border-slate-900 pt-6 text-[11px] text-slate-500">
          © {new Date().getFullYear()} SBS Deutschland GmbH · Weinheim ·
          Rhein-Neckar-Odenwald-Kreis. Alle Rechte vorbehalten.
        </footer>
      </div>
    </main>
  );
}

