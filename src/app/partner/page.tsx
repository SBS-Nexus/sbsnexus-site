'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/* ────────────────────────────────────────────────────────────
   SBS Nexus – Steuerberater Partner-Programm Landing Page
   Enterprise-Grade • Conversion-Optimized • DACH Market
   ──────────────────────────────────────────────────────────── */

// ── Animated Counter ─────────────────────────────────────────
function AnimatedNumber({ target, suffix = '', prefix = '', duration = 2000 }: {
  target: number; suffix?: string; prefix?: string; duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{prefix}{current.toLocaleString('de-DE')}{suffix}</span>;
}

// ── ROI Calculator ───────────────────────────────────────────
function ROICalculator() {
  const [clients, setClients] = useState(10);
  const [tier, setTier] = useState<'referral' | 'certified' | 'strategic'>('certified');

  const tierConfig = {
    referral:  { share: 0.15, bonus: 250, label: 'Referral Partner', color: '#6B7280' },
    certified: { share: 0.20, bonus: 500, label: 'Certified Partner', color: '#FFB900' },
    strategic: { share: 0.25, bonus: 750, label: 'Strategic Partner', color: '#003856' },
  };

  const config = tierConfig[tier];
  const monthlyPerClient = 499;
  const annualSBSRevenue = clients * monthlyPerClient * 12;
  const annualPartnerShare = annualSBSRevenue * config.share;
  const onboardingBonus = clients * config.bonus;
  const totalYear1 = annualPartnerShare + onboardingBonus;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
      borderRadius: '20px',
      padding: '48px',
      border: '1px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative corner accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '200px', height: '200px',
        background: 'radial-gradient(circle at top right, rgba(255,185,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #003856, #005a8c)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#FFB900', fontSize: '20px', fontWeight: 700,
        }}>€</div>
        <div>
          <h3 style={{ margin: 0, fontSize: '22px', color: '#003856', fontWeight: 700, letterSpacing: '-0.02em' }}>
            ROI-Rechner
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
            Berechnen Sie Ihren jährlichen Partnerumsatz
          </p>
        </div>
      </div>

      {/* Tier Selection */}
      <div style={{ marginBottom: '28px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '10px', display: 'block' }}>
          Partnerstufe
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(Object.keys(tierConfig) as Array<keyof typeof tierConfig>).map((key) => (
            <button
              key={key}
              onClick={() => setTier(key)}
              style={{
                flex: 1, padding: '12px 16px', borderRadius: '10px',
                border: tier === key ? `2px solid ${tierConfig[key].color}` : '2px solid #e2e8f0',
                background: tier === key ? (key === 'strategic' ? '#003856' : key === 'certified' ? '#FFF8E1' : '#f8fafc') : '#fff',
                color: tier === key ? (key === 'strategic' ? '#fff' : '#003856') : '#64748b',
                cursor: 'pointer', fontSize: '14px', fontWeight: tier === key ? 700 : 500,
                transition: 'all 0.2s ease',
              }}
            >
              <div>{tierConfig[key].label}</div>
              <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>
                {(tierConfig[key].share * 100).toFixed(0)}% Revenue Share
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Client Slider */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
            Anzahl vermittelter Mandanten
          </label>
          <span style={{
            fontSize: '28px', fontWeight: 800, color: '#003856',
            fontVariantNumeric: 'tabular-nums',
          }}>{clients}</span>
        </div>
        <input
          type="range" min="1" max="50" value={clients}
          onChange={(e) => setClients(parseInt(e.target.value))}
          style={{
            width: '100%', height: '6px', borderRadius: '3px',
            background: `linear-gradient(to right, #003856 ${(clients / 50) * 100}%, #e2e8f0 ${(clients / 50) * 100}%)`,
            appearance: 'none' as const, cursor: 'pointer',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
          <span>1 Mandant</span>
          <span>50 Mandanten</span>
        </div>
      </div>

      {/* Results */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
        marginBottom: '24px',
      }}>
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '20px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>
            Ihr Revenue Share / Jahr
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#003856', fontVariantNumeric: 'tabular-nums' }}>
            €{annualPartnerShare.toLocaleString('de-DE')}
          </div>
        </div>
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '20px',
          border: '1px solid #e2e8f0',
        }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>
            Onboarding-Boni (einmalig)
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#003856', fontVariantNumeric: 'tabular-nums' }}>
            €{onboardingBonus.toLocaleString('de-DE')}
          </div>
        </div>
      </div>

      {/* Total */}
      <div style={{
        background: 'linear-gradient(135deg, #003856, #005a8c)',
        borderRadius: '14px', padding: '24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginBottom: '2px' }}>
            Gesamtumsatz Jahr 1
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
            Revenue Share + Onboarding-Boni
          </div>
        </div>
        <div style={{
          fontSize: '36px', fontWeight: 800, color: '#FFB900',
          fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
        }}>
          €{totalYear1.toLocaleString('de-DE')}
        </div>
      </div>

      <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center' as const, marginTop: '16px', marginBottom: 0 }}>
        Basierend auf €499/Monat pro Mandant · Berechnung unverbindlich
      </p>
    </div>
  );
}


// ── Main Page Component ──────────────────────────────────────
export default function PartnerPage() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setIsVisible(true); }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ═══ HERO SECTION ═══ */}
      <section style={{
        background: 'linear-gradient(165deg, #001e30 0%, #003856 40%, #004d7a 100%)',
        position: 'relative', overflow: 'hidden',
        padding: '140px 32px 100px',
      }}>
        {/* Background grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,185,0,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,185,0,0.15)', border: '1px solid rgba(255,185,0,0.3)',
            borderRadius: '100px', padding: '8px 20px', marginBottom: '28px',
          }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#FFB900', display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span style={{ color: '#FFB900', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
              Partner-Programm 2026
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 800, color: '#fff', lineHeight: 1.08,
            letterSpacing: '-0.03em', margin: '0 0 24px',
            maxWidth: '800px',
          }}>
            Werden Sie{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFB900, #ffcc4d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              SBS Nexus Partner
            </span>
            <br />für Steuerberater.
          </h1>

          <p style={{
            fontSize: '20px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6,
            maxWidth: '640px', margin: '0 0 40px',
          }}>
            Empfehlen Sie Ihren Mandanten KI-gestützte Rechnungsverarbeitung mit DATEV-Integration — und verdienen Sie bis zu 25% Revenue Share. Dauerhaft.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const }}>
            <a href="#kontakt" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#FFB900', color: '#003856', padding: '16px 32px',
              borderRadius: '12px', fontSize: '16px', fontWeight: 700,
              textDecoration: 'none', transition: 'all 0.2s ease',
              boxShadow: '0 4px 20px rgba(255,185,0,0.3)',
            }}>
              Jetzt Partner werden
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#rechner" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              padding: '16px 32px', borderRadius: '12px',
              fontSize: '16px', fontWeight: 600, textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.2s ease',
            }}>
              ROI berechnen
            </a>
          </div>

          {/* Trust stats */}
          <div style={{
            display: 'flex', gap: '48px', marginTop: '64px',
            paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)',
            flexWrap: 'wrap' as const,
          }}>
            {[
              { value: '25%', label: 'Revenue Share' },
              { value: '€499', label: 'pro Mandant/Monat' },
              { value: '14 Tage', label: 'Partner-Onboarding' },
              { value: '100%', label: 'DATEV-kompatibel' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFB900', letterSpacing: '-0.02em' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ PROBLEM / OPPORTUNITY ═══ */}
      <section style={{ padding: '100px 32px', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '64px' }}>
            <div style={{
              fontSize: '13px', fontWeight: 700, color: '#FFB900',
              textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '16px',
            }}>
              Die Chance
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800,
              color: '#003856', letterSpacing: '-0.02em', lineHeight: 1.15,
              margin: '0 0 20px',
            }}>
              89.000 Steuerberater. Eine Pflicht.<br />
              Ihre Empfehlung.
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Die E-Rechnungspflicht 2025 betrifft jeden Mandanten. Kanzleien suchen Lösungen — Sie liefern die Antwort.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              {
                icon: '📊',
                stat: '73,6%',
                title: 'Fachkräftemangel',
                desc: 'der Kanzleien sind vom Fachkräftemangel betroffen. SBS Nexus automatisiert repetitive Aufgaben und schafft Kapazität.',
              },
              {
                icon: '📄',
                stat: '2%',
                title: 'Digitalisierungsgrad',
                desc: 'der Unternehmen nutzen digitale Buchführung mit DATEV. 98% warten auf eine einfache Lösung — wie SBS Nexus.',
              },
              {
                icon: '⏱️',
                stat: '70%',
                title: 'Zeitersparnis',
                desc: 'weniger manuelle Bearbeitungszeit pro Rechnung. Das sind durchschnittlich 3,5 Stunden pro Mandant pro Monat.',
              },
            ].map((card, i) => (
              <div key={i} style={{
                background: '#f8fafc', borderRadius: '20px', padding: '36px',
                border: '1px solid #e2e8f0', transition: 'all 0.3s ease',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: '-30px', right: '-30px',
                  fontSize: '120px', opacity: 0.04, lineHeight: 1,
                }}>
                  {card.icon}
                </div>
                <div style={{ fontSize: '14px', marginBottom: '16px' }}>{card.icon}</div>
                <div style={{ fontSize: '42px', fontWeight: 800, color: '#003856', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                  {card.stat}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#003856', marginBottom: '8px' }}>
                  {card.title}
                </div>
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ 3-TIER PARTNER PROGRAM ═══ */}
      <section style={{
        padding: '100px 32px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '64px' }}>
            <div style={{
              fontSize: '13px', fontWeight: 700, color: '#FFB900',
              textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '16px',
            }}>
              Partner-Stufen
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800,
              color: '#003856', letterSpacing: '-0.02em', lineHeight: 1.15,
              margin: '0 0 20px',
            }}>
              Drei Stufen. Ein Ziel:<br />
              Gemeinsam wachsen.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Tier 1: Referral */}
            <div style={{
              background: '#fff', borderRadius: '20px', padding: '40px',
              border: '1px solid #e2e8f0', position: 'relative',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '20px',
              }}>🤝</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#003856', marginBottom: '4px' }}>
                Referral Partner
              </h3>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                Einstieg · Keine Verpflichtung
              </div>
              <div style={{
                fontSize: '48px', fontWeight: 800, color: '#003856',
                letterSpacing: '-0.03em', marginBottom: '4px',
              }}>15%</div>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '28px' }}>
                Revenue Share · 12 Monate
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', fontSize: '15px', color: '#475569' }}>
                {[
                  '€250 Onboarding-Bonus pro Mandant',
                  'Persönlicher Partner-Manager',
                  'Marketing-Materialien',
                  'Monatliches Reporting',
                  'Co-Branded Landing Page',
                ].map((item, j) => (
                  <li key={j} style={{ padding: '8px 0', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#22c55e', fontSize: '16px', lineHeight: '22px' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt" style={{
                display: 'block', textAlign: 'center' as const,
                padding: '14px', borderRadius: '12px',
                border: '2px solid #003856', color: '#003856',
                fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}>
                Kostenlos starten
              </a>
            </div>

            {/* Tier 2: Certified – HIGHLIGHTED */}
            <div style={{
              background: 'linear-gradient(165deg, #003856, #005a8c)',
              borderRadius: '20px', padding: '40px',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,56,86,0.25)',
              transform: 'scale(1.03)',
            }}>
              {/* Popular badge */}
              <div style={{
                position: 'absolute', top: '20px', right: '20px',
                background: '#FFB900', color: '#003856',
                padding: '6px 14px', borderRadius: '100px',
                fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
              }}>
                Empfohlen
              </div>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '250px', height: '250px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,185,0,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(255,185,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '20px',
              }}>🏆</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                Certified Partner
              </h3>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
                Ab 5 Mandanten · Zertifizierung
              </div>
              <div style={{
                fontSize: '48px', fontWeight: 800, color: '#FFB900',
                letterSpacing: '-0.03em', marginBottom: '4px',
              }}>20%</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '28px' }}>
                Revenue Share · 24 Monate
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>
                {[
                  '€500 Onboarding-Bonus pro Mandant',
                  'Alles aus Referral, plus:',
                  'SBS Nexus Zertifizierung',
                  'Bevorzugter Support (4h SLA)',
                  'Gemeinsame Webinare & Events',
                  'Quartals-Review mit Geschäftsführung',
                ].map((item, j) => (
                  <li key={j} style={{ padding: '8px 0', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#FFB900', fontSize: '16px', lineHeight: '22px' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt" style={{
                display: 'block', textAlign: 'center' as const,
                padding: '14px', borderRadius: '12px',
                background: '#FFB900', color: '#003856',
                fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(255,185,0,0.3)',
                transition: 'all 0.2s ease',
              }}>
                Certified Partner werden
              </a>
            </div>

            {/* Tier 3: Strategic */}
            <div style={{
              background: '#fff', borderRadius: '20px', padding: '40px',
              border: '1px solid #e2e8f0', position: 'relative',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', marginBottom: '20px',
              }}>💎</div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#003856', marginBottom: '4px' }}>
                Strategic Partner
              </h3>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                Ab 20 Mandanten · Exklusivität
              </div>
              <div style={{
                fontSize: '48px', fontWeight: 800, color: '#003856',
                letterSpacing: '-0.03em', marginBottom: '4px',
              }}>25%</div>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '28px' }}>
                Revenue Share · Lifetime
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', fontSize: '15px', color: '#475569' }}>
                {[
                  '€750 Onboarding-Bonus pro Mandant',
                  'Alles aus Certified, plus:',
                  'White-Label Option verfügbar',
                  'Dediziertes Integrations-Team',
                  'Regionale Exklusivität möglich',
                  'Board-Level Strategic Reviews',
                ].map((item, j) => (
                  <li key={j} style={{ padding: '8px 0', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#22c55e', fontSize: '16px', lineHeight: '22px' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt" style={{
                display: 'block', textAlign: 'center' as const,
                padding: '14px', borderRadius: '12px',
                border: '2px solid #003856', color: '#003856',
                fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}>
                Gespräch vereinbaren
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ ROI CALCULATOR ═══ */}
      <section id="rechner" style={{ padding: '100px 32px', background: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '48px' }}>
            <div style={{
              fontSize: '13px', fontWeight: 700, color: '#FFB900',
              textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '16px',
            }}>
              ROI-Rechner
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800,
              color: '#003856', letterSpacing: '-0.02em', lineHeight: 1.15,
              margin: '0 0 16px',
            }}>
              Was verdienen Sie als Partner?
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
              Berechnen Sie Ihren individuellen Partnerumsatz — basierend auf Ihrem Mandantenstamm.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>


      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{
        padding: '100px 32px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '64px' }}>
            <div style={{
              fontSize: '13px', fontWeight: 700, color: '#FFB900',
              textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '16px',
            }}>
              So funktioniert's
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800,
              color: '#003856', letterSpacing: '-0.02em', lineHeight: 1.15,
              margin: 0,
            }}>
              In 14 Tagen zum aktiven Partner
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0px' }}>
            {[
              { day: 'Tag 1', title: 'Partnervertrag & Portal-Zugang', desc: 'Digitaler Vertrag, sofortiger Zugang zum Partner-Portal mit Dashboard und Marketing-Materialien.' },
              { day: 'Tag 2–3', title: 'Produkt-Training & Zertifizierung', desc: '90-minütige Schulung: SBS Nexus Funktionen, DATEV-Integration, Mandanten-Onboarding-Prozess.' },
              { day: 'Tag 3–5', title: 'DATEV-Integration einrichten', desc: 'Technische Einrichtung der DATEV Unternehmen Online Schnittstelle. Test-Export mit Beispieldaten.' },
              { day: 'Tag 5–7', title: 'Erste Pilot-Mandanten identifizieren', desc: 'Gemeinsam 3–5 ideale Mandanten auswählen. SBS-Team übernimmt das Mandanten-Onboarding.' },
              { day: 'Tag 14', title: 'Pilot-Review & Rollout-Entscheidung', desc: 'Auswertung der Pilot-Ergebnisse. Entscheidung über Rollout auf den gesamten Mandantenstamm.' },
            ].map((step, i) => (
              <div key={i} style={{
                display: 'flex', gap: '32px', alignItems: 'flex-start',
                padding: '28px 0',
                borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none',
              }}>
                <div style={{
                  minWidth: '72px', height: '72px', borderRadius: '16px',
                  background: i === 4 ? 'linear-gradient(135deg, #003856, #005a8c)' : '#f1f5f9',
                  display: 'flex', flexDirection: 'column' as const,
                  alignItems: 'center', justifyContent: 'center',
                  color: i === 4 ? '#FFB900' : '#003856',
                  fontWeight: 800, fontSize: '14px', lineHeight: 1.2,
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, opacity: 0.6, textTransform: 'uppercase' as const }}>
                    {step.day.split(' ')[0]}
                  </span>
                  <span style={{ fontSize: '18px' }}>{step.day.split(' ')[1]}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#003856', margin: '0 0 6px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ DATEV INTEGRATION HIGHLIGHT ═══ */}
      <section style={{
        padding: '80px 32px',
        background: 'linear-gradient(135deg, #003856, #005a8c)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
        <div style={{
          maxWidth: '900px', margin: '0 auto', position: 'relative',
          display: 'flex', alignItems: 'center', gap: '48px',
          flexWrap: 'wrap' as const,
        }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{
              fontSize: '13px', fontWeight: 700, color: '#FFB900',
              textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '16px',
            }}>
              Nahtlose Integration
            </div>
            <h2 style={{
              fontSize: '32px', fontWeight: 800, color: '#fff',
              letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 16px',
            }}>
              DATEV-Export auf Knopfdruck
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: '0 0 28px' }}>
              SBS Nexus erstellt direkt DATEV-konforme Buchungssätze. Kein manuelles Abtippen, keine Fehler, keine Zeitverschwendung. Mandanten verarbeiten Rechnungen — Ihre Kanzlei bekommt saubere Daten.
            </p>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' as const }}>
              {['DATEV Unternehmen Online', 'ASCII-Export', 'XRechnung/ZUGFeRD'].map((tag, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500,
                }}>
                  <span style={{ color: '#FFB900' }}>✓</span> {tag}
                </div>
              ))}
            </div>
          </div>
          <div style={{
            flex: '0 0 auto',
            background: 'rgba(255,255,255,0.06)', borderRadius: '20px',
            padding: '32px', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', flexDirection: 'column' as const, gap: '16px',
            minWidth: '280px',
          }}>
            {[
              { label: 'Erkennungsquote', value: '99,2%' },
              { label: 'Verarbeitungszeit', value: '< 8 Sek.' },
              { label: 'DATEV-Kompatibilität', value: '100%' },
              { label: 'Hosting', value: 'Frankfurt 🇩🇪' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{item.label}</span>
                <span style={{ color: '#FFB900', fontWeight: 700, fontSize: '16px' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ SOCIAL PROOF ═══ */}
      <section style={{ padding: '100px 32px', background: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' as const }}>
          <div style={{
            fontSize: '13px', fontWeight: 700, color: '#FFB900',
            textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '16px',
          }}>
            Warum SBS Nexus
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800,
            color: '#003856', letterSpacing: '-0.02em', lineHeight: 1.15,
            margin: '0 0 48px',
          }}>
            Was uns unterscheidet
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', textAlign: 'left' as const }}>
            {[
              { icon: '🇩🇪', title: 'Made in Germany', desc: 'Server in Frankfurt. DSGVO-konform. Keine US-Cloud-Abhängigkeit.' },
              { icon: '🤖', title: 'Echte KI-Verarbeitung', desc: 'Keine Template-Erkennung. Multimodale KI analysiert jede Rechnung individuell.' },
              { icon: '🔗', title: 'DATEV-nativ', desc: 'Direkte Anbindung an DATEV Unternehmen Online. Kein Medienbruch.' },
              { icon: '🏢', title: 'Enterprise-Grade', desc: 'RBAC, Team-Management, Audit-Logs. Bereit für Kanzleien jeder Größe.' },
              { icon: '💰', title: 'Fairer Revenue Share', desc: 'Bis zu 25% — dauerhaft. Nicht einmalig, nicht gedeckelt.' },
              { icon: '📈', title: 'Wachstum gemeinsam', desc: 'Co-Marketing, Webinare, Events. Wir investieren in Ihren Erfolg.' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '28px', borderRadius: '16px',
                background: '#f8fafc', border: '1px solid #e2e8f0',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#003856', marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ CTA / CONTACT FORM ═══ */}
      <section id="kontakt" style={{
        padding: '100px 32px',
        background: 'linear-gradient(165deg, #001e30 0%, #003856 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,185,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '700px', margin: '0 auto', textAlign: 'center' as const,
          position: 'relative', zIndex: 1,
        }}>
          <div style={{
            fontSize: '13px', fontWeight: 700, color: '#FFB900',
            textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '16px',
          }}>
            Jetzt starten
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15,
            margin: '0 0 16px',
          }}>
            Bereit für die Partnerschaft?
          </h2>
          <p style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6,
            maxWidth: '520px', margin: '0 auto 40px',
          }}>
            Vereinbaren Sie ein unverbindliches 20-Minuten-Gespräch. Wir zeigen Ihnen das Partner-Portal, die DATEV-Integration und Ihr individuelles Revenue-Modell.
          </p>

          {/* Contact Options */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' as const, marginBottom: '48px' }}>
            <a href="mailto:partner@sbsdeutschland.com?subject=Partnerschaft%20Anfrage" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#FFB900', color: '#003856',
              padding: '18px 36px', borderRadius: '12px',
              fontSize: '17px', fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(255,185,0,0.3)',
              transition: 'all 0.2s ease',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 4l8 5 8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <rect x="1" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              partner@sbsdeutschland.com
            </a>
            <a href="tel:+49620124469" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              padding: '18px 36px', borderRadius: '12px',
              fontSize: '17px', fontWeight: 600, textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.2s ease',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 3a1 1 0 011-1h4l2 5-2.5 1.5A11 11 0 0011.5 13.5L13 11l5 2v4a1 1 0 01-1 1A15 15 0 012 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              +49 6201 24469
            </a>
          </div>

          {/* Trust footer */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' as const,
            paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            {['Unverbindlich', 'Kein Risiko', 'Sofortiger Start', 'DSGVO-konform'].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: 'rgba(255,255,255,0.5)', fontSize: '14px',
              }}>
                <span style={{ color: '#FFB900', fontSize: '12px' }}>●</span> {item}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ FOOTER NOTE ═══ */}
      <section style={{ padding: '32px', background: '#f8fafc', textAlign: 'center' as const }}>
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
          © 2026 SBS Deutschland GmbH & Co. KG · Weinheim, Deutschland ·{' '}
          <Link href="/datenschutz" style={{ color: '#64748b', textDecoration: 'underline' }}>Datenschutz</Link>
          {' · '}
          <Link href="/impressum" style={{ color: '#64748b', textDecoration: 'underline' }}>Impressum</Link>
        </p>
      </section>


      {/* ═══ CSS KEYFRAMES ═══ */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #003856;
          cursor: pointer;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,56,86,0.3);
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #003856;
          cursor: pointer;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,56,86,0.3);
        }
        a:hover { opacity: 0.9; }
        @media (max-width: 768px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
          div[style*="scale(1.03)"] { transform: scale(1) !important; }
        }
      `}</style>
    </div>
  );
}
