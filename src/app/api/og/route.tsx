// This file shows how to create dynamic OG images with Vercel
// Save as: src/app/api/og/route.tsx
// Then your OG images will be at: /api/og?title=Your%20Title

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'SBS Nexus';
  const subtitle = searchParams.get('subtitle') || 'Das operative OS für den fertigenden Mittelstand';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
        }}
      >
        {/* Orange accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            backgroundColor: '#f97316',
          }}
        />
        
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#f97316',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
            }}
          >
            <span style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>SBS</span>
          </div>
          <span style={{ color: 'white', fontSize: '48px', fontWeight: '600' }}>Nexus</span>
        </div>
        
        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 60px',
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '64px',
              fontWeight: 'bold',
              lineHeight: 1.2,
              marginBottom: '20px',
              maxWidth: '1000px',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: '#94a3b8',
              fontSize: '32px',
              maxWidth: '800px',
            }}
          >
            {subtitle}
          </p>
        </div>
        
        {/* Bottom badges */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '20px',
          }}
        >
          {['SAP-kompatibel', 'DATEV-ready', '100% DSGVO'].map((badge) => (
            <div
              key={badge}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                color: '#94a3b8',
                fontSize: '20px',
              }}
            >
              {badge}
            </div>
          ))}
        </div>
        
        {/* Weinheim location */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            color: '#64748b',
            fontSize: '18px',
          }}
        >
          🇩🇪 Weinheim, Germany
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
