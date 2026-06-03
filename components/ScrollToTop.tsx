'use client'

import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Retour en haut"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 500,
        width: 42,
        height: 42,
        background: 'var(--accent)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
        /* Apparition / disparition */
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity .35s cubic-bezier(.16,1,.3,1), transform .35s cubic-bezier(.16,1,.3,1)',
        /* Léger glow accent */
        boxShadow: visible ? '0 0 18px rgba(var(--accent-rgb),.4)' : 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 12V2M2 7l5-5 5 5"
          stroke="#000" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
