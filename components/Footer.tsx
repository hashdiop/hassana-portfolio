'use client'

import { useLang } from '@/context/LangContext'

function FMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 90 90" fill="none">
      <polyline points="50,18 18,18 18,72 50,72" stroke="var(--accent)" strokeWidth="9" strokeLinecap="butt" strokeLinejoin="miter"/>
      <line x1="56" y1="18" x2="56" y2="72" stroke="var(--accent)" strokeWidth="9" strokeLinecap="butt"/>
      <path d="M63 18 Q81 18 81 45 Q81 72 63 72" stroke="var(--accent)" strokeWidth="9" fill="none" strokeLinecap="butt"/>
      <line x1="56" y1="45" x2="70" y2="45" stroke="var(--accent)" strokeWidth="8" strokeLinecap="butt"/>
      <rect x="69" y="61" width="12" height="10" fill="var(--accent)"/>
    </svg>
  )
}

export default function Footer() {
  const { lang } = useLang()
  return (
    <footer className="chd-footer">
      <button
        className="f-logo"
        onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
      >
        <div className="f-box"><FMark /></div>
        <span className="f-name">CHD</span>
      </button>

      <p className="f-copy">
        © 2025 Cheikh Hassana Diop — Dakar, Sénégal
      </p>

      <a href="#hero" className="f-top"
        onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }) }}>
        {lang === 'fr' ? 'Retour en haut' : 'Back to top'} ↑
      </a>
    </footer>
  )
}
