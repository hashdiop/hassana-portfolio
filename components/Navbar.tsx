'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Paintbrush } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useAccent } from '@/context/AccentContext'

const LINKS = [
  { label: { fr: 'À propos',    en: 'About'    }, href: '#about'    },
  { label: { fr: 'Services',    en: 'Services' }, href: '#services' },
  { label: { fr: 'Compétences', en: 'Skills'   }, href: '#skills'   },
  { label: { fr: 'Projets',     en: 'Projects' }, href: '#projects' },
]

function ChdMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 90 90" fill="none">
      <polyline points="50,18 18,18 18,72 50,72" stroke="var(--accent)" strokeWidth="8" strokeLinecap="butt" strokeLinejoin="miter"/>
      <line x1="56" y1="18" x2="56" y2="72" stroke="var(--accent)" strokeWidth="8" strokeLinecap="butt"/>
      <path d="M63 18 Q81 18 81 45 Q81 72 63 72" stroke="var(--accent)" strokeWidth="8" fill="none" strokeLinecap="butt"/>
      <line x1="56" y1="45" x2="70" y2="45" stroke="var(--accent)" strokeWidth="7" strokeLinecap="butt"/>
      <rect x="69" y="61" width="12" height="10" fill="var(--accent)"/>
    </svg>
  )
}

function LangToggle({ lang, setLang }: { lang: 'fr'|'en'; setLang: (l: 'fr'|'en') => void }) {
  return (
    <div style={{ display:'flex', overflow:'hidden', border:'1px solid var(--border)', flexShrink:0 }}>
      {(['fr','en'] as const).map(l => (
        <button key={l} onClick={() => setLang(l)}
          style={{
            fontFamily:'var(--font-space-mono),monospace', fontSize:9, letterSpacing:1,
            padding:'5px 9px', border:'none', cursor:'pointer',
            background: lang === l ? 'var(--accent)' : 'transparent',
            color: lang === l ? '#000' : 'var(--text-2)',
            fontWeight: lang === l ? 700 : 400,
          }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function PaletteBtn({ openPicker }: { openPicker: () => void }) {
  return (
    <button
      onClick={openPicker}
      title="Changer le thème"
      style={{
        position: 'relative',
        width: 34, height: 34,
        background: 'none', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'border-color .2s, background .2s',
        padding: 0, flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.background  = 'var(--accent-bg)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.background  = 'none'
      }}
    >
      <Paintbrush size={14} color="var(--accent)" strokeWidth={1.8} />
      {/* Petit indicateur de couleur active */}
      <div style={{
        position: 'absolute', bottom: 5, right: 5,
        width: 5, height: 5, borderRadius: '50%',
        background: 'var(--accent)',
        boxShadow: '0 0 4px var(--accent)',
      }} />
    </button>
  )
}

export default function Navbar() {
  const router              = useRouter()
  const { lang, setLang }   = useLang()
  const { needsPick, openPicker } = useAccent()
  const [menu, setMenu]       = useState(false)
  const [closing, setClosing] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => {
    setClosing(true)
    setTimeout(() => { setMenu(false); setClosing(false) }, 280)
  }

  const navigate = (href: string) => {
    closeMenu()
    setTimeout(() => {
      const el = document.querySelector(href)
      el ? el.scrollIntoView({ behavior:'smooth' }) : router.push('/' + href)
    }, 200)
  }

  if (needsPick) return null

  return (
    <>
      <nav className="chd-nav"
        style={{ borderBottomColor: scrolled ? 'var(--border)' : 'transparent' }}>

        {/* Logo */}
        <button className="nav-logo"
          onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}>
          <div className="nav-logo-box"><ChdMark /></div>
          CHD
        </button>

        {/* ── Desktop : liens + lang + palette ── */}
        <ul className="nav-links">
          {LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => { e.preventDefault(); navigate(l.href) }}>
                {lang === 'fr' ? l.label.fr : l.label.en}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta"
              onClick={e => { e.preventDefault(); navigate('#contact') }}>
              Contact
            </a>
          </li>
          <li><LangToggle lang={lang} setLang={setLang} /></li>
          <li><PaletteBtn openPicker={openPicker} /></li>
        </ul>

        {/* ── Mobile : lang + palette toujours visibles + hamburger ── */}
        <div className="nav-mobile-controls">
          <LangToggle lang={lang} setLang={setLang} />
          <PaletteBtn openPicker={openPicker} />
          <button
            className={`nav-hamburger ${menu ? 'open' : ''}`}
            onClick={() => menu ? closeMenu() : setMenu(true)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Menu mobile : sections uniquement, animé ── */}
      {menu && (
        <nav className="nav-mobile"
          style={{ animation: closing ? 'menu-out .28s cubic-bezier(.4,0,1,1) forwards' : undefined }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href}
              onClick={e => { e.preventDefault(); navigate(l.href) }}>
              {lang === 'fr' ? l.label.fr : l.label.en}
            </a>
          ))}
          <a href="#contact"
            onClick={e => { e.preventDefault(); navigate('#contact') }}>
            Contact
          </a>
        </nav>
      )}
    </>
  )
}
