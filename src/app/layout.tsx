import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sbsnexus.de'),
  title: {
    default: "SBS Nexus | KI-Automatisierung für den Mittelstand",
    template: "%s | SBS Nexus"
  },
  description: "SBS Nexus verbindet Rechnungsverarbeitung, Vertragsanalyse und technische Dokumenten-KI in einer Plattform. DSGVO-konform, SAP-kompatibel, aus Weinheim.",
  keywords: [
    "KI Rechnungsverarbeitung",
    "DATEV Automatisierung", 
    "SAP Integration",
    "Mittelstand Digitalisierung",
    "Dokumenten KI",
    "Vertragsmanagement",
    "HydraulikDoc",
    "Business Process Automation",
    "Weinheim",
    "Rhein-Neckar"
  ],
  authors: [{ name: "SBS Deutschland GmbH & Co. KG" }],
  creator: "SBS Deutschland GmbH & Co. KG",
  publisher: "SBS Deutschland GmbH & Co. KG",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.sbsnexus.de",
    siteName: "SBS Nexus",
    title: "SBS Nexus | Das operative OS für den fertigenden Mittelstand",
    description: "Rechnungen, Verträge, technische Handbücher – vereint in intelligenten Workflows. DSGVO-konform, SAP-kompatibel.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SBS Nexus - KI-Automatisierung für den Mittelstand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SBS Nexus | KI-Automatisierung für den Mittelstand",
    description: "Rechnungen, Verträge, technische Handbücher – vereint in intelligenten Workflows.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you set up Google Search Console & Bing Webmaster Tools
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        {/* Plausible Analytics - DSGVO-konform, cookie-free */}
        <script 
          defer 
          data-domain="sbsnexus.de" 
          src="https://plausible.io/js/script.js"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.sbsnexus.de" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SBS Deutschland GmbH & Co. KG",
              "alternateName": "SBS Nexus",
              "url": "https://www.sbsnexus.de",
              "logo": "https://www.sbsnexus.de/logo.png",
              "description": "KI-Automatisierung für den deutschen Mittelstand",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "In der Dell 19",
                "addressLocality": "Weinheim",
                "postalCode": "69469",
                "addressCountry": "DE"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+49-6201-24469",
                "contactType": "sales",
                "availableLanguage": ["German", "English"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/sbs-deutschland",
                "https://github.com/SBS-Nexus"
              ]
            })
          }}
        />
        
        {/* Structured Data - SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SBS Nexus",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "KI-Plattform für Rechnungsverarbeitung, Vertragsanalyse und technische Dokumentation",
              "offers": {
                "@type": "Offer",
                "price": "1990",
                "priceCurrency": "EUR",
                "priceValidUntil": "2026-12-31"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "12"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
