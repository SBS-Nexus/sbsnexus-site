'use client';

import Link from 'next/link';

export default function IntegrationsPage() {
  const mainIntegrations = [
    {
      name: 'SAP S/4HANA',
      logo: '🔷',
      category: 'ERP',
      status: 'compatible',
      description: 'Nahtlose Integration mit SAP S/4HANA für Bestellungen, Buchungen und Stammdaten.',
      features: [
        'Purchase Order Export',
        'Vendor Master Data Sync',
        'FI/CO Buchungsbelege',
        'Material Management',
      ],
      docsUrl: '#',
    },
    {
      name: 'DATEV',
      logo: '🟢',
      category: 'Buchhaltung',
      status: 'native',
      description: 'Native DATEV-Integration für Buchungsexport mit deutscher Steuerlogik.',
      features: [
        'DATEV-Format Export (CSV/XML)',
        'Automatische Kontierung',
        'Steuercode-Mapping',
        'Belegbildübertragung',
      ],
      docsUrl: '#',
    },
    {
      name: 'n8n',
      logo: '⚡',
      category: 'Automation',
      status: 'native',
      description: 'Self-hosted Workflow-Engine für komplexe Automatisierungen.',
      features: [
        '500+ Konnektoren',
        'Self-hosted (DSGVO)',
        'Custom Workflows',
        'Webhook Triggers',
      ],
      docsUrl: '#',
    },
  ];

  const additionalIntegrations = [
    { name: 'Microsoft 365', category: 'Produktivität', status: 'available', icon: '📧' },
    { name: 'Google Workspace', category: 'Produktivität', status: 'available', icon: '📬' },
    { name: 'Slack', category: 'Kommunikation', status: 'available', icon: '💬' },
    { name: 'LexOffice', category: 'Buchhaltung', status: 'available', icon: '📊' },
    { name: 'sevDesk', category: 'Buchhaltung', status: 'available', icon: '📈' },
    { name: 'Personio', category: 'HR', status: 'planned', icon: '👥' },
    { name: 'HubSpot', category: 'CRM', status: 'available', icon: '🎯' },
    { name: 'Salesforce', category: 'CRM', status: 'planned', icon: '☁️' },
    { name: 'Jira', category: 'Projektmanagement', status: 'available', icon: '📋' },
    { name: 'Confluence', category: 'Dokumentation', status: 'available', icon: '📝' },
    { name: 'SharePoint', category: 'Dokumentation', status: 'available', icon: '📁' },
    { name: 'Dropbox', category: 'Storage', status: 'available', icon: '📦' },
  ];

  const apiFeatures = [
    {
      icon: '🔐',
      title: 'OAuth 2.0 & API Keys',
      description: 'Sichere Authentifizierung mit Bearer Tokens oder API Keys.',
    },
    {
      icon: '📡',
      title: 'REST API',
      description: 'Vollständige REST API für alle Module (Finance, Contract, Technical).',
    },
    {
      icon: '🪝',
      title: 'Webhooks',
      description: 'Real-time Benachrichtigungen bei Dokumentenverarbeitung.',
    },
    {
      icon: '📦',
      title: 'Batch Processing',
      description: 'Massenverarbeitung von Dokumenten via API.',
    },
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
            <Link href="/integrations" className="text-white text-sm font-medium">Integrationen</Link>
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

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Integrationen
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            SBS Nexus verbindet sich nahtlos mit Ihren bestehenden Systemen – 
            von SAP und DATEV bis zu modernen Cloud-Tools.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['SAP-kompatibel', 'DATEV-native', 'REST API', '500+ Konnektoren'].map((badge, idx) => (
              <span key={idx} className="bg-slate-800/50 text-slate-300 px-4 py-2 rounded-full text-sm">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Integrations */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Kern-Integrationen
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Die wichtigsten Systeme für den deutschen Mittelstand
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {mainIntegrations.map((integration, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50 hover:border-orange-500/50 transition">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl">{integration.logo}</span>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    integration.status === 'native' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {integration.status === 'native' ? 'Native' : 'Kompatibel'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{integration.name}</h3>
                <p className="text-orange-400 text-sm mb-4">{integration.category}</p>
                <p className="text-slate-400 mb-6">{integration.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {integration.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Architecture */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Wie es funktioniert
          </h2>
          
          <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
            <div className="grid md:grid-cols-5 gap-4 items-center text-center">
              {/* Source Systems */}
              <div className="space-y-3">
                <p className="text-slate-400 text-sm font-medium mb-4">Quellsysteme</p>
                {['📧 E-Mail', '📁 SharePoint', '🖨️ Scanner', '🌐 Portal'].map((src, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg py-2 px-3 text-sm text-slate-300">
                    {src}
                  </div>
                ))}
              </div>
              
              {/* Arrow */}
              <div className="hidden md:flex justify-center">
                <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              {/* SBS Nexus */}
              <div className="bg-gradient-to-b from-orange-500/20 to-orange-500/5 rounded-xl p-6 border border-orange-500/30">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">SBS</span>
                </div>
                <p className="text-white font-semibold">SBS Nexus</p>
                <p className="text-slate-400 text-xs mt-1">KI-Verarbeitung</p>
              </div>
              
              {/* Arrow */}
              <div className="hidden md:flex justify-center">
                <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              {/* Target Systems */}
              <div className="space-y-3">
                <p className="text-slate-400 text-sm font-medium mb-4">Zielsysteme</p>
                {['🔷 SAP', '🟢 DATEV', '📊 BI Tools', '💬 Slack'].map((target, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg py-2 px-3 text-sm text-slate-300">
                    {target}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Integrations Grid */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Weitere Integrationen
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Über n8n verbinden wir SBS Nexus mit 500+ weiteren Tools
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {additionalIntegrations.map((integration, idx) => (
              <div 
                key={idx} 
                className="bg-slate-800/30 rounded-xl p-4 text-center border border-slate-700/50 hover:border-slate-600 transition"
              >
                <span className="text-2xl mb-2 block">{integration.icon}</span>
                <p className="text-white text-sm font-medium">{integration.name}</p>
                <p className="text-slate-500 text-xs">{integration.category}</p>
                {integration.status === 'planned' && (
                  <span className="text-xs text-yellow-400 mt-2 inline-block">Geplant</span>
                )}
              </div>
            ))}
          </div>
          
          <p className="text-center text-slate-500 text-sm mt-8">
            Ihre Integration fehlt? <Link href="mailto:info@sbsdeutschland.com" className="text-orange-400 hover:underline">Kontaktieren Sie uns</Link>
          </p>
        </div>
      </section>

      {/* API Section */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            REST API
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Für Entwickler und Custom Integrations
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {apiFeatures.map((feature, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Code Example */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm">Beispiel: Rechnung verarbeiten</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">POST</span>
            </div>
            <pre className="text-sm text-slate-300 overflow-x-auto">
              <code>{`curl -X POST https://api.sbsnexus.de/v1/invoices \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@invoice.pdf" \\
  -F "auto_export=datev"

# Response
{
  "id": "inv_abc123",
  "status": "processed",
  "vendor": "Bosch Rexroth AG",
  "amount": 4250.00,
  "datev_export": "ready"
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* n8n Templates */}
      <section className="py-16 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Fertige Workflow-Templates
          </h2>
          <p className="text-slate-400 mb-8">
            Starten Sie mit vorgefertigten n8n-Workflows für typische Mittelstands-Prozesse
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {[
              { name: 'E-Mail Inbox Monitor', desc: 'Rechnungen aus E-Mail-Anhängen automatisch extrahieren' },
              { name: 'SharePoint → DATEV', desc: 'Dokumente aus SharePoint verarbeiten und exportieren' },
              { name: 'Vertrags-Fristenalarm', desc: 'Slack-Benachrichtigung 90 Tage vor Vertragsende' },
              { name: 'SAP Bestellvorschlag', desc: 'Aus HydraulikDoc-Anfrage automatisch SAP-PO erstellen' },
            ].map((template, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                <div className="flex items-start gap-3">
                  <span className="text-orange-400">⚡</span>
                  <div>
                    <h3 className="text-white font-medium">{template.name}</h3>
                    <p className="text-slate-400 text-sm">{template.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Integration besprechen?
          </h2>
          <p className="text-slate-400 mb-8">
            Wir zeigen Ihnen, wie SBS Nexus in Ihre bestehende Systemlandschaft passt.
          </p>
          <Link
            href="https://calendly.com/ki-sbsdeutschland/sbs-nexus-30-minuten-discovery-call"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Integration-Call buchen
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 SBS Deutschland GmbH · Weinheim · Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/security" className="text-slate-500 hover:text-white text-sm">Security</Link>
            <Link href="/integrations" className="text-white text-sm">Integrationen</Link>
            <Link href="/about" className="text-slate-500 hover:text-white text-sm">Über uns</Link>
            <Link href="/datenschutz" className="text-slate-500 hover:text-white text-sm">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
