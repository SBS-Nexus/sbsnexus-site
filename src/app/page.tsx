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
            <a href="#dashboard" className="hover:text-slate-50">
              Plattform
            </a>
            <a href="#architecture" className="hover:text-slate-50">
              Architektur
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

          {/* Hero Panel – kompakte Workflow-Story */}
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
                HydraulikDoc findet in Sekunden das richtige Datenblatt.
              </li>
              <li>
                <span className="font-semibold text-cyan-300">2.</span>{" "}
                Contract Intelligence prüft Service- und Garantiebedingungen.
              </li>
              <li>
                <span className="font-semibold text-cyan-300">3.</span>{" "}
                Finance Intelligence bereitet Bestellung, Kontierung und
                DATEV-Export vor.
              </li>
              <li>
                <span className="font-semibold text-cyan-300">4.</span>{" "}
                n8n-Workflows orchestrieren Freigaben, SAP-Bestellung und
                Rückmeldung an das Team.
              </li>
            </ol>
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
            Maschinenbau, Zulieferer und Industrie im Rhein-Neckar-Odenwald-Raum.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {/* Finance */}
            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Finance Intelligence
              </div>
              <h3 className="mt-2 text-sm font-semibold">
                KI-Rechnungsverarbeitung mit DATEV-Export
              </h3>
              <p className="mt-3 text-xs text-slate-300">
                Automatische Extraktion, Duplicate-Check, Kontierungsvorschläge
                und DATEV-Export – für Finance-Teams mit 200–10.000 Belegen
                pro Monat.
              </p>
            </div>
            {/* Contract */}
            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-300">
                Contract Intelligence
              </div>
              <h3 className="mt-2 text-sm font-semibold">
                Verträge, Fristen und Risiken im Griff
              </h3>
              <p className="mt-3 text-xs text-slate-300">
                Risiko-Scoring, Fristenkalender und Vertragsregister für
                Lieferanten-, Wartungs- und SaaS-Verträge – inklusive Copilot.
              </p>
            </div>
            {/* Technical */}
            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Technical Intelligence
              </div>
              <h3 className="mt-2 text-sm font-semibold">
                HydraulikDoc für Service & Konstruktion
              </h3>
              <p className="mt-3 text-xs text-slate-300">
                Technische Dokumenten-KI, die 80-seitige Datenblätter in einen
                dialogfähigen Assistenten für Instandhaltung und Engineering
                verwandelt.
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Preview – Hybrid mit App-Design */}
        <section
          id="dashboard"
          className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 md:mt-20 md:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                SBS Plattform · Dashboard
              </p>
              <h2 className="mt-1 text-sm font-semibold md:text-base">
                Alle SBS Produkte in einem App-Shell
              </h2>
              <p className="mt-2 max-w-xl text-xs text-slate-300">
                Design angelehnt an deine bestehende SBS-App: klare Karten,
                Kennzahlen und Quick Actions – nur ohne echte Daten, optimiert
                als Vorschau für Entscheider.
              </p>
            </div>
            <div className="flex gap-2 text-[11px] text-slate-300">
              <span className="rounded-full border border-slate-700 px-3 py-1">
                Rechnungen
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1">
                Verträge
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1">
                Kennzahlen
              </span>
            </div>
          </div>

          {/* Cards-Grid im Stil deines Dashboards, aber mit Tailwind */}
          <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* Product cards */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Invoice card */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 shadow-md">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-xs font-semibold text-slate-50">
                    🧾 KI-Rechnungsverarbeitung
                  </h3>
                  <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    Enterprise
                  </span>
                </div>
                <p className="mb-3 text-[11px] text-slate-300">
                  Automatische Extraktion, DATEV-Export & Finance Copilot.
                </p>
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Verbrauch diesen Monat</span>
                    <span>133 / ∞</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-md bg-cyan-500/10 px-2 py-1 text-cyan-200">
                    📤 Rechnungen hochladen
                  </span>
                  <span className="rounded-md bg-slate-800 px-2 py-1 text-slate-200">
                    🤖 Finance Copilot
                  </span>
                </div>
              </div>

              {/* Contract card */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 shadow-md">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-xs font-semibold text-slate-50">
                    📋 KI-Vertragsanalyse
                  </h3>
                  <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">
                    Enterprise
                  </span>
                </div>
                <p className="mb-3 text-[11px] text-slate-300">
                  Risiko-Erkennung, Fristen-Management & Vertragsregister.
                </p>
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Verbrauch diesen Monat</span>
                    <span>0 / ∞</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[4%] rounded-full bg-gradient-to-r from-violet-400 to-violet-500" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-md bg-violet-500/10 px-2 py-1 text-violet-200">
                    📤 Vertrag analysieren
                  </span>
                  <span className="rounded-md bg-slate-800 px-2 py-1 text-slate-200">
                    📁 Vertragsregister
                  </span>
                </div>
              </div>
            </div>

            {/* Stats + Aktivitäten Preview */}
            <div className="space-y-4">
              {/* Stats */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="mb-3 text-[11px] font-semibold text-slate-200">
                  📈 Kennzahlen (Beispiel)
                </p>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg bg-slate-900/80 p-3">
                    <div className="text-lg font-bold text-cyan-300">133</div>
                    <div className="text-[11px] text-slate-400">
                      Rechnungen verarbeitet
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-3">
                    <div className="text-lg font-bold text-violet-300">0</div>
                    <div className="text-[11px] text-slate-400">
                      Verträge analysiert
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-3">
                    <div className="text-lg font-bold text-emerald-300">
                      399h
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Zeitersparnis (Schätzung)
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-900/80 p-3">
                    <div className="text-lg font-bold text-slate-100">
                      €332
                    </div>
                    <div className="text-[11px] text-slate-400">
                      direkte Kosteneinsparung
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="mb-3 text-[11px] font-semibold text-slate-200">
                  🕐 Letzte Aktivitäten (Beispieldaten)
                </p>
                <ul className="space-y-2.5 text-[11px] text-slate-200">
                  <li className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/10">
                      🧾
                    </span>
                    <div className="flex-1">
                      <div>Rechnung INV-1544498 · Lieblingsgarn GmbH</div>
                      <div className="text-[10px] text-slate-400">
                        2026-01-28 · 11:24
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/10">
                      🧾
                    </span>
                    <div className="flex-1">
                      <div>VRG25-261966 · FILATI eCommerce GmbH</div>
                      <div className="text-[10px] text-slate-400">
                        2026-01-28 · 11:24
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-500/10">
                      🧾
                    </span>
                    <div className="flex-1">
                      <div>RE-000095 · Total</div>
                      <div className="text-[10px] text-slate-400">
                        2026-01-27 · 11:30
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
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
        </section>

        {/* Region */}
        <section className="mt-16 md:mt-20">
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
                href="https://calendly.com/ki-sbsdeutschland/sbs-nexus-30-minuten-discovery-call"
                target="_blank"
                className="underline underline-offset-2"
              >
                30-Minuten-Discovery-Call
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

