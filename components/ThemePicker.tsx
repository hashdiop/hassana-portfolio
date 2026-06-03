'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { THEMES, ThemeName, useAccent, apply } from '@/context/AccentContext'

function Swatch({ name, t, isActive, onHover, onSelect }: {
  name: ThemeName
  t: typeof THEMES[ThemeName]
  isActive: boolean
  onHover: (n: ThemeName | null) => void
  onSelect: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => { setHov(true);  onHover(name) }}
      onMouseLeave={() => { setHov(false); onHover(null) }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        padding: '24px 18px', border: isActive ? `2px solid ${t.accent}` : '2px solid rgba(255,255,255,.07)',
        background: isActive ? `rgba(${t.rgb},.07)` : 'rgba(255,255,255,.025)',
        cursor: 'pointer', transition: 'all .2s', minWidth: 100,
        outline: isActive ? `2px solid rgba(${t.rgb},.2)` : 'none', outlineOffset: 3,
      }}
    >
      {/* Orbe */}
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, ${t.hover}, ${t.accent})`,
        boxShadow: isActive
          ? `0 0 0 3px #050505, 0 0 0 5px ${t.accent}, 0 0 24px rgba(${t.rgb},.5)`
          : hov ? `0 0 18px rgba(${t.rgb},.5)` : `0 0 6px rgba(${t.rgb},.25)`,
        transform: isActive ? 'scale(1.12)' : hov ? 'scale(1.06)' : 'scale(1)',
        transition: 'all .2s',
      }} />

      {/* Checkmark */}
      {isActive && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginBottom:-4 }}>
          <circle cx="8" cy="8" r="8" fill={t.accent}/>
          <path d="M4.5 8l2.5 2.5L11.5 5.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}

      <span style={{
        fontFamily:'monospace', fontSize:9, letterSpacing:2, textTransform:'uppercase',
        color: isActive ? t.accent : hov ? '#fff' : 'rgba(255,255,255,.4)',
        transition: 'color .2s',
      }}>{t.label}</span>
    </button>
  )
}

export default function ThemePicker() {
  const { theme, setTheme, showPicker, closePicker } = useAccent()
  const [preview, setPreview] = useState<ThemeName | null>(null)

  useEffect(() => {
    if (!showPicker) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') { closePicker(); apply(theme) } }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [showPicker, closePicker, theme])

  const handleHover = (name: ThemeName | null) => {
    setPreview(name)
    apply(name ?? theme)
  }

  const handleClose = () => {
    apply(theme) // restaurer couleur actuelle
    setPreview(null)
    closePicker()
  }

  if (!showPicker) return null

  return (
    <div
      style={{
        position:'fixed', inset:0, zIndex:10001,
        background:'rgba(5,5,5,.88)', backdropFilter:'blur(20px)',
        display:'flex', alignItems:'center', justifyContent:'center', padding:24,
      }}
      onClick={handleClose}
    >
      <div
        style={{ maxWidth:580, width:'100%', textAlign:'center', animation:'ld-fadein .2s ease' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:16 }}>
          <button onClick={handleClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,.4)', cursor:'pointer', transition:'color .2s' }}
            onMouseEnter={e=>(e.currentTarget.style.color='#fff')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,.4)')}>
            <X size={20}/>
          </button>
        </div>

        <p style={{ fontFamily:'monospace', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginBottom:10 }}>
          // couleur d&apos;accent
        </p>
        <h2 style={{ fontFamily:'var(--font-syne),sans-serif', fontSize:'clamp(22px,4vw,36px)', fontWeight:800, letterSpacing:'-.02em', color:'#fff', marginBottom:6 }}>
          CHANGER LE THÈME
        </h2>
        <p style={{ fontFamily:'monospace', fontSize:10, color:'rgba(255,255,255,.25)', marginBottom:36 }}>
          Survolez pour prévisualiser · La page se rafraîchira
        </p>

        <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
          {(Object.entries(THEMES) as [ThemeName, typeof THEMES[ThemeName]][]).map(([key, t]) => (
            <Swatch key={key} name={key} t={t}
              isActive={(preview ?? theme) === key}
              onHover={handleHover}
              onSelect={() => { setPreview(null); setTheme(key) }}
            />
          ))}
        </div>

        <button onClick={handleClose}
          style={{ marginTop:28, fontFamily:'monospace', fontSize:9, letterSpacing:2, textTransform:'uppercase', background:'none', border:'none', color:'rgba(255,255,255,.25)', cursor:'pointer', padding:'8px 16px', transition:'color .2s' }}
          onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,.7)')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,.25)')}>
          ESC — Annuler
        </button>
      </div>
    </div>
  )
}
