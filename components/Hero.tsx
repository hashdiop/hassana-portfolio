'use client'

import { Download } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const STYLES = `
@keyframes hero-up {
  from { opacity:0; transform:translateY(36px); }
  to   { opacity:1; transform:none; }
}
/* Éléments cachés par défaut — animés seulement quand le loader a disparu */
.h-line { opacity:0; }
body.hero-ready .h-line { animation:hero-up .7s cubic-bezier(.16,1,.3,1) forwards; }
`

function Line({ children, delay, style }: {
  children: React.ReactNode
  delay: number
  style?: React.CSSProperties
}) {
  return (
    <span
      className="h-line"
      style={{ display:'block', animationDelay:`${delay}s`, ...style }}
    >
      {children}
    </span>
  )
}

export default function Hero() {
  const { lang } = useLang()

  const sub = lang === 'fr'
    ? "Je conçois et développe des applications web complètes — du backend Node.js à l'interface React, avec MongoDB au cœur."
    : "I design and build complete web applications — from Node.js backend to React interface, with MongoDB at the core."

  return (
    <section id="hero">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Decorative pulsing dots */}
      <div className="dot-pulse" style={{ top:'28%', left:'68%' }} />
      <div className="dot-pulse" style={{ top:'62%', left:'82%', animationDelay:'.7s', width:6, height:6 }} />
      <div className="dot-pulse" style={{ top:'42%', left:'92%', animationDelay:'1.3s', width:10, height:10 }} />

      {/* ── Name — apparaît en premier, ligne par ligne ── */}
      <h1 className="hero-name" style={{ marginBottom:36 }}>
        <Line delay={0.2}>Cheikh</Line>
        <Line delay={0.45} style={{ color:'var(--accent)' }}>Hassana</Line>
        <Line delay={0.65}>Diop.</Line>
      </h1>

      {/* ── Label ── */}
      <p className="hero-label h-line" style={{ animationDelay:'1.0s', marginBottom:28 }}>
        {lang === 'fr' ? 'Développeur MERN Fullstack' : 'MERN Fullstack Developer'}
      </p>

      {/* ── Tagline ── */}
      <p className="hero-tagline h-line" style={{ animationDelay:'1.35s' }}>
        {sub}
      </p>

      {/* ── CTAs ── */}
      <div className="hero-ctas h-line" style={{ animationDelay:'1.7s' }}>
        <button className="btn-p"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' })}>
          {lang === 'fr' ? 'Voir mes projets' : 'View projects'} ↗
        </button>
        <button className="btn-o"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}>
          {lang === 'fr' ? 'Me contacter' : 'Contact me'}
        </button>
        <a href="/CV_HassanaDiop.pdf" download className="btn-o" style={{ gap:8 }}>
          <Download size={13} /> CV
        </a>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll h-line" style={{ animationDelay:'2.05s' }}>
        {lang === 'fr' ? 'Défiler' : 'Scroll'} <span>* ↓ *</span>
      </div>
    </section>
  )
}
