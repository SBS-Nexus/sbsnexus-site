'use client';

import Link from 'next/link';

export default function DatenschutzPage() {
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

      {/* Content */}
      <main className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-12">Datenschutzerklärung</h1>

          <div className="space-y-10 text-slate-300">
            
            {/* 1. Überblick */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-lg font-medium text-white mt-6 mb-3">Allgemeine Hinweise</h3>
              <p className="leading-relaxed mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen 
                Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz 
                entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Datenerfassung auf dieser Website</h3>
              <p className="leading-relaxed mb-4">
                <strong className="text-white">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>
              <p className="leading-relaxed mb-4">
                <strong className="text-white">Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
                z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch 
                oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind 
                vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>
              <p className="leading-relaxed mb-4">
                <strong className="text-white">Wofür nutzen wir Ihre Daten?</strong><br />
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
                Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung 
                oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt 
                haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das 
                Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten 
                zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </section>

            {/* 2. Hosting */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Hosting</h2>
              
              <h3 className="text-lg font-medium text-white mt-6 mb-3">Vercel</h3>
              <p className="leading-relaxed mb-4">
                Diese Website wird bei Vercel Inc. gehostet. Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, 
                Walnut, CA 91789, USA. Wenn Sie unsere Website besuchen, werden Ihre personenbezogenen Daten auf 
                den Servern von Vercel verarbeitet. Hierbei können auch personenbezogene Daten an die Server von 
                Vercel in den USA übermittelt werden.
              </p>
              <p className="leading-relaxed">
                Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein 
                berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine 
                entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage 
                von Art. 6 Abs. 1 lit. a DSGVO.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Hetzner</h3>
              <p className="leading-relaxed">
                Die SBS Nexus Plattform (App) wird auf Servern der Hetzner Online GmbH in Deutschland gehostet. 
                Anbieter ist die Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland. 
                Ihre Daten werden ausschließlich auf Servern in Deutschland verarbeitet.
              </p>
            </section>

            {/* 3. Verantwortliche Stelle */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Hinweis zur verantwortlichen Stelle</h2>
              <p className="leading-relaxed mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="leading-relaxed mb-4">
                SBS Deutschland GmbH & Co. KG<br />
                Luis Schenk<br />
                In der Dell 19<br />
                69469 Weinheim<br />
                Deutschland
              </p>
              <p className="leading-relaxed">
                Telefon: +49 (0) 6201 24469<br />
                E-Mail: <a href="mailto:info@sbsdeutschland.com" className="text-orange-400 hover:underline">info@sbsdeutschland.com</a>
              </p>
            </section>

            {/* 4. Datenerfassung */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Datenerfassung auf dieser Website</h2>
              
              <h3 className="text-lg font-medium text-white mt-6 mb-3">Server-Log-Dateien</h3>
              <p className="leading-relaxed mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
                Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="leading-relaxed">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung 
                dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Kontaktformular & E-Mail</h3>
              <p className="leading-relaxed mb-4">
                Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus dem 
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage 
                und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre 
                Einwilligung weiter.
              </p>
              <p className="leading-relaxed">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre 
                Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher 
                Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten 
                Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Calendly</h3>
              <p className="leading-relaxed">
                Für die Terminbuchung nutzen wir den Dienst Calendly. Anbieter ist die Calendly LLC, 3423 Piedmont Rd NE, 
                Atlanta, GA 30305, USA. Wenn Sie einen Termin buchen, werden die von Ihnen eingegebenen Daten an 
                Calendly übermittelt. Details entnehmen Sie der Datenschutzerklärung von Calendly: {' '}
                <a 
                  href="https://calendly.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:underline"
                >
                  https://calendly.com/privacy
                </a>
              </p>
            </section>

            {/* 5. SBS Nexus Plattform */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Datenverarbeitung in der SBS Nexus Plattform</h2>
              
              <h3 className="text-lg font-medium text-white mt-6 mb-3">Verarbeitete Daten</h3>
              <p className="leading-relaxed mb-4">
                Wenn Sie die SBS Nexus Plattform nutzen, verarbeiten wir folgende Daten:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Anmeldedaten (E-Mail, Passwort-Hash)</li>
                <li>Hochgeladene Dokumente (Rechnungen, Verträge, technische Datenblätter)</li>
                <li>Extrahierte Daten aus Dokumenten</li>
                <li>Nutzungsdaten und Audit-Logs</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">KI-Verarbeitung</h3>
              <p className="leading-relaxed mb-4">
                Für die KI-gestützte Dokumentenanalyse nutzen wir Dienste von OpenAI (OpenAI LLC, San Francisco, USA) 
                und Anthropic (Anthropic PBC, San Francisco, USA). Bei der Verarbeitung werden Dokumenteninhalte 
                an diese Dienste übermittelt. Die Anbieter haben sich zur DSGVO-konformen Verarbeitung verpflichtet.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Wichtig:</strong> Personenbezogene Daten werden vor der Übermittlung 
                an KI-Dienste nach Möglichkeit anonymisiert. Die KI-Anbieter speichern keine Daten dauerhaft und 
                nutzen diese nicht für Trainingszwecke.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Speicherort</h3>
              <p className="leading-relaxed">
                Alle Kundendaten werden auf Servern in Deutschland (Hetzner, Frankfurt) gespeichert. 
                Eine dauerhafte Speicherung außerhalb der EU findet nicht statt.
              </p>
            </section>

            {/* 6. Ihre Rechte */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Ihre Rechte</h2>
              <p className="leading-relaxed mb-4">
                Sie haben folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong className="text-white">Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre verarbeiteten Daten verlangen.</li>
                <li><strong className="text-white">Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
                <li><strong className="text-white">Löschungsrecht (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer Daten verlangen.</li>
                <li><strong className="text-white">Einschränkung (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung verlangen.</li>
                <li><strong className="text-white">Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können Ihre Daten in einem gängigen Format erhalten.</li>
                <li><strong className="text-white">Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung widersprechen.</li>
              </ul>
              <p className="leading-relaxed">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: {' '}
                <a href="mailto:datenschutz@sbsdeutschland.com" className="text-orange-400 hover:underline">
                  datenschutz@sbsdeutschland.com
                </a>
              </p>
            </section>

            {/* 7. Beschwerderecht */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Beschwerderecht bei der Aufsichtsbehörde</h2>
              <p className="leading-relaxed">
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über unsere Verarbeitung 
                personenbezogener Daten zu beschweren. Die für uns zuständige Aufsichtsbehörde ist:
              </p>
              <p className="leading-relaxed mt-4">
                Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
                Lautenschlagerstraße 20<br />
                70173 Stuttgart<br />
                <a 
                  href="https://www.baden-wuerttemberg.datenschutz.de" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:underline"
                >
                  www.baden-wuerttemberg.datenschutz.de
                </a>
              </p>
            </section>

            {/* 8. SSL/TLS */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="leading-relaxed">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte 
                eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die 
                Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in 
                Ihrer Browserzeile.
              </p>
            </section>

            {/* 9. Änderungen */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Änderungen dieser Datenschutzerklärung</h2>
              <p className="leading-relaxed">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen 
                rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen. 
                Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
              </p>
            </section>

          </div>

          {/* Last Updated */}
          <p className="text-slate-500 text-sm mt-12">
            Stand: Februar 2026
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 SBS Deutschland GmbH & Co. KG · Weinheim
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="text-slate-500 hover:text-white text-sm">Impressum</Link>
            <Link href="/datenschutz" className="text-white text-sm">Datenschutz</Link>
            <Link href="/security" className="text-slate-500 hover:text-white text-sm">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
