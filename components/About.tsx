'use client'

import Image from 'next/image'
import { useLang } from '@/context/LangContext'
import { useReveal } from '@/hooks/useReveal'

const PHOTO_STYLES = `
  /* Vignette sombre pour fondre dans le dark theme */
  .about-photo-wrap::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 55%,
      rgba(5,5,5,.55) 100%
    );
    pointer-events: none;
    z-index: 1;
  }
  /* Overlay accent très subtil */
  .about-photo-wrap::before {
    content: '';
    position: absolute; inset: 0;
    background: rgba(var(--accent-rgb), .04);
    pointer-events: none;
    z-index: 1;
    transition: background .4s;
  }
  .about-photo-wrap:hover::before {
    background: rgba(var(--accent-rgb), .08);
  }
`

export default function About() {
  const { lang } = useLang()
  const ref = useReveal<HTMLDivElement>()

  const p1 = lang === 'fr'
    ? 'Développeur MERN Fullstack basé à Dakar, je transforme des idées en produits web performants et maintenables. Ma formation en mathématiques et informatique me donne une lecture systémique des problèmes.'
    : 'MERN Fullstack developer based in Dakar, I turn ideas into robust and maintainable web products. My background in mathematics and computer science gives me a systemic view of problems.'
  const p2 = lang === 'fr'
    ? "Je ne code pas seulement une feature — je comprends pourquoi elle doit fonctionner ainsi et comment elle s'intègre dans l'ensemble : architecture réseau, sécurité des APIs, logique algorithmique."
    : "I don't just code a feature — I understand why it should work that way and how it fits into the whole: network architecture, API security, algorithmic logic."

  return (
    <section id="about">
      <style dangerouslySetInnerHTML={{ __html: PHOTO_STYLES }} />
      <div className="wrap">
        <p className="s-label reveal">01 / {lang === 'fr' ? 'À propos' : 'About'}</p>
        <h2 className="s-title reveal">
          {lang === 'fr' ? 'Qui ' : 'Who '}<span className="acc">{lang === 'fr' ? 'suis-je' : 'am I'}</span>
        </h2>
        <div className="acc-bar reveal" />

        <div className="about-grid">
          {/* ── Photo ── */}
          <div className="reveal">
            <div
              className="about-photo-wrap"
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                outline: '1px solid var(--accent-border)',
                outlineOffset: 4,
              }}
            >
              <Image
                src="/photo.jpeg"
                alt="Cheikh Hassana Diop"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  /* Désaturation légère + contraste pour s'accorder au dark theme */
                  filter: 'grayscale(0.25) contrast(1.08) brightness(0.9)',
                  transition: 'filter .4s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0) contrast(1.05) brightness(0.95)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(0.25) contrast(1.08) brightness(0.9)')}
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />

              {/* Badge nom en bas */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '14px 18px', zIndex: 2,
                background: 'linear-gradient(transparent, rgba(5,5,5,.85))',
              }}>
                <p style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontWeight: 700, fontSize: 14, color: '#fff',
                  letterSpacing: '.02em',
                }}>
                  Cheikh Hassana Diop
                </p>
                <p style={{
                  fontFamily: 'monospace', fontSize: 9,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: 'var(--accent)', marginTop: 3,
                }}>
                  {lang === 'fr' ? 'Développeur MERN Fullstack' : 'MERN Fullstack Developer'}
                </p>
              </div>
            </div>
          </div>

          {/* ── Texte ── */}
          <div ref={ref}>
            <div className="about-card reveal">
              <p>{p1}</p>
            </div>
            <div className="about-card reveal" style={{ animationDelay: '.1s' }}>
              <p style={{ color: 'var(--text-muted)' }}>{p2}</p>
            </div>
            <div className="stats">
              {[
                { v: '3+',   l: lang === 'fr' ? "Ans d'exp." : 'Years exp.' },
                { v: '10+',  l: lang === 'fr' ? 'Projets'    : 'Projects'   },
                { v: '100%', l: lang === 'fr' ? 'Code livré' : 'Delivered'  },
              ].map(s => (
                <div key={s.v} className="stat reveal">
                  <span className="stat-v">{s.v}</span>
                  <span className="stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
