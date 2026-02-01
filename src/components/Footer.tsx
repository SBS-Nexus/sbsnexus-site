'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produkt</h3>
            <ul className="space-y-2">
              <li><Link href="/#modules" className="text-slate-400 hover:text-white text-sm transition">Module</Link></li>
              <li><Link href="/pricing" className="text-slate-400 hover:text-white text-sm transition">Pricing</Link></li>
              <li><Link href="/integrations" className="text-slate-400 hover:text-white text-sm transition">Integrationen</Link></li>
              <li><Link href="/security" className="text-slate-400 hover:text-white text-sm transition">Security</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ressourcen</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-slate-400 hover:text-white text-sm transition">Blog</Link></li>
              <li><Link href="https://calendly.com/ki-sbsdeutschland/sbs-nexus-30-minuten-discovery-call" className="text-slate-400 hover:text-white text-sm transition">Demo buchen</Link></li>
              <li><Link href="mailto:info@sbsdeutschland.com" className="text-slate-400 hover:text-white text-sm transition">Support</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Unternehmen</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-slate-400 hover:text-white text-sm transition">Über uns</Link></li>
              <li><Link href="/impressum" className="text-slate-400 hover:text-white text-sm transition">Impressum</Link></li>
              <li><Link href="/datenschutz" className="text-slate-400 hover:text-white text-sm transition">Datenschutz</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>SBS Deutschland GmbH & Co. KG</li>
              <li>In der Dell 19</li>
              <li>69469 Weinheim</li>
              <li className="pt-2">
                <a href="tel:+4962012469" className="hover:text-white transition">+49 (0) 6201 24469</a>
              </li>
              <li>
                <a href="mailto:info@sbsdeutschland.com" className="hover:text-white transition">info@sbsdeutschland.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">SBS</span>
            </div>
            <span className="text-slate-500 text-sm">
              © {currentYear} SBS Deutschland GmbH & Co. KG · Weinheim
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Trust Badges */}
            <span className="text-xs text-slate-600 bg-slate-800/50 px-2 py-1 rounded">🇩🇪 Made in Germany</span>
            <span className="text-xs text-slate-600 bg-slate-800/50 px-2 py-1 rounded">DSGVO-konform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
