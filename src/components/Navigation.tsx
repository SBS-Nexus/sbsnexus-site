'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/#modules', label: 'Module' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/integrations', label: 'Integrationen' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'Über uns' },
  ];

  return (
    <header className="border-b border-slate-800/50 sticky top-0 z-50 bg-slate-950/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SBS</span>
          </div>
          <span className="text-white font-semibold">SBS Nexus</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-white text-sm transition"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://calendly.com/ki-sbsdeutschland/sbs-nexus-30-minuten-discovery-call"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Demo buchen
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/50 bg-slate-950">
          <nav className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-slate-400 hover:text-white text-sm transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://calendly.com/ki-sbsdeutschland/sbs-nexus-30-minuten-discovery-call"
              className="block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium text-center transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Demo buchen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
