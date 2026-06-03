'use client'

import { useEffect, useState, useCallback } from 'react'
import { THEMES, ThemeName, useAccent, apply } from '@/context/AccentContext'

const STYLES = `
@keyframes ld-c-in  { from{transform:translateX(-90px) scale(1.4);opacity:0} to{transform:none;opacity:1} }
@keyframes ld-h-in  { from{transform:translateY(-90px) scale(1.4);opacity:0} to{transform:none;opacity:1} }
@keyframes ld-hb-in { from{transform:scaleX(0);opacity:0} to{transform:scaleX(1);opacity:1} }
@keyframes ld-d-in  { from{transform:translateX(90px) scale(1.4);opacity:0} to{transform:none;opacity:1} }
@keyframes ld-cur   { to{opacity:1} }
@keyframes ld-blink { 50%{opacity:0} }
@keyframes ld-bar   { from{width:0} to{width:100%} }
@keyframes ld-fadein{ from{opacity:0} to{opacity:1} }
@keyframes ld-slideup{ from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

.ld-g-c   { transform-box:fill-box; transform-origin:center; animation:ld-c-in  .72s cubic-bezier(.16,1,.3,1) forwards; }
.ld-g-h   { transform-box:fill-box; transform-origin:center; animation:ld-h-in  .72s cubic-bezier(.16,1,.3,1) .14s forwards; opacity:0; }
.ld-g-hb  { transform-box:fill-box; transform-origin:left center; animation:ld-hb-in .45s cubic-bezier(.16,1,.3,1) .32s forwards; opacity:0; }
.ld-g-d   { transform-box:fill-box; transform-origin:center; animation:ld-d-in  .72s cubic-bezier(.16,1,.3,1) .07s forwards; }
.ld-g-cur { opacity:0; animation:ld-cur .2s ease .96s forwards; }
.ld-cursor-blink { animation:ld-blink .8s step-end infinite; }
`

function ChdSvg({ accent, size = 90 }: { accent: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" fill="none" overflow="visible">
      <g className="ld-g-c">
        <polyline points="50,18 18,18 18,72 50,72"
          stroke={accent} strokeWidth="7" strokeLinecap="butt" strokeLinejoin="miter"/>
      </g>
      <g className="ld-g-h">
        <line x1="56" y1="18" x2="56" y2="72" stroke={accent} strokeWidth="7" strokeLinecap="butt"/>
      </g>
      <g className="ld-g-hb">
        <line x1="50" y1="45" x2="68" y2="45" stroke={accent} strokeWidth="6" strokeLinecap="butt"/>
      </g>
      <g className="ld-g-d">
        <path d="M63 18 Q81 18 81 45 Q81 72 63 72"
          stroke={accent} strokeWidth="7" fill="none" strokeLinecap="butt"/>
      </g>
      <g className="ld-g-cur">
        <rect x="69" y="61" width="12" height="10" fill={accent} className="ld-cursor-blink"/>
      </g>
    </svg>
  )
}

function ColorSwatch({ name, t, isActive, onEnter, onLeave, onSelect }: {
  name: ThemeName
  t: typeof THEMES[ThemeName]
  isActive: boolean
  onEnter: () => void
  onLeave: () => void
  onSelect: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => { setHov(true);  onEnter() }}
      onMouseLeave={() => { setHov(false); onLeave() }}
      style={{
        display:'flex', flexDirection:'column', alignItems:'center', gap:10,
        background:'none', border:'none', cursor:'pointer', padding:'8px 12px',
      }}
    >
      <div style={{
        width:48, height:48, borderRadius:'50%',
        background:`radial-gradient(circle at 35% 35%, ${t.hover}, ${t.accent})`,
        boxShadow: isActive
          ? `0 0 0 3px #050505, 0 0 0 5px ${t.accent}, 0 0 22px rgba(${t.rgb},.6)`
          : hov
            ? `0 0 18px rgba(${t.rgb},.5)`
            : `0 0 6px rgba(${t.rgb},.25)`,
        transform: isActive ? 'scale(1.15)' : hov ? 'scale(1.07)' : 'scale(1)',
        transition: 'all .2s',
      }}/>
      <span style={{
        fontFamily:'monospace', fontSize:9, letterSpacing:2, textTransform:'uppercase',
        color: isActive ? t.accent : hov ? '#fff' : 'rgba(255,255,255,.4)',
        transition:'color .2s',
      }}>{t.label}</span>
    </button>
  )
}

type Phase = 'anim' | 'pick' | 'out' | 'done'

export default function Loader() {
  const { needsPick, setTheme, theme } = useAccent()

  const [phase,   setPhase]   = useState<Phase>('anim')
  const [typed,   setTyped]   = useState('')
  const [preview, setPreview] = useState<ThemeName | null>(null)

  // ★ Couleur active = preview (survol) OU theme du contexte
  // Dérivée directement depuis THEMES — pas de lecture CSS
  const activeKey = preview ?? theme
  const curAccent = THEMES[activeKey]?.accent ?? THEMES.jade.accent

  // Frappe "CHD."
  useEffect(() => {
    const text = 'CHD.'; let i = 0
    const iv = setInterval(() => {
      if (i < text.length) setTyped(text.slice(0, ++i))
      else clearInterval(iv)
    }, 110)
    return () => clearInterval(iv)
  }, [])

  // Synchronisation avec le chargement réel
  useEffect(() => {
    const ANIM_END = 3800   // durée minimale du loader
    const PAUSE    = 900    // pause après animation avant fade-out
    const start = Date.now()

    const proceed = () => {
      const wait = Math.max(0, ANIM_END - (Date.now() - start)) + PAUSE
      setTimeout(() => {
        if (needsPick) {
          setPhase('pick')
        } else {
          // Déclencher les animations Hero pendant le fade-out du loader
          document.body.classList.add('hero-ready')
          setPhase('out')
          setTimeout(() => setPhase('done'), 900)
        }
      }, wait)
    }

    if (document.readyState === 'complete') proceed()
    else window.addEventListener('load', proceed, { once: true })
    return () => window.removeEventListener('load', proceed)
  }, [needsPick])

  // Prévisualisation au survol
  const onEnter = useCallback((name: ThemeName) => {
    setPreview(name)
    apply(name) // met à jour les CSS vars pour le reste de la page
  }, [])

  const onLeave = useCallback(() => {
    setPreview(null)
    apply(theme) // restaure la couleur du thème courant
  }, [theme])

  const handlePick = useCallback((name: ThemeName) => {
    setPreview(null)
    setTheme(name)
    document.body.classList.add('hero-ready')
    setPhase('out')
    setTimeout(() => setPhase('done'), 900)
  }, [setTheme])

  if (phase === 'done') return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div style={{
        position:'fixed', inset:0, zIndex:10000,
        background:'#050505',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        gap: phase === 'pick' ? 28 : 24,
        opacity: phase === 'out' ? 0 : 1,
        transition: phase === 'out' ? 'opacity .8s ease' : 'none',
        animation:'ld-fadein .25s ease',
      }}>

        {/* SVG — couleur réactive via curAccent */}
        <ChdSvg accent={curAccent} size={92} />

        {/* Nom tapé */}
        <div style={{
          fontFamily:'var(--font-syne),sans-serif',
          fontSize:'clamp(24px,4vw,40px)', fontWeight:800, letterSpacing:'-.02em',
          color:'#fff', display:'flex', alignItems:'center', gap:4, minHeight:'1.2em',
        }}>
          <span style={{ color: curAccent }}>{typed}</span>
          {typed.length < 4 && (
            <span style={{ display:'inline-block', width:2, height:'1em', background: curAccent, animation:'ld-blink .8s step-end infinite', marginLeft:2 }}/>
          )}
        </div>

        {/* Barre de progression */}
        {phase === 'anim' && (
          <div style={{ width:110, height:2, background:'rgba(255,255,255,.08)', overflow:'hidden' }}>
            <div style={{ height:'100%', background: curAccent, animation:'ld-bar 3.8s cubic-bezier(.4,0,.2,1) forwards', width:0 }}/>
          </div>
        )}

        {/* Phase choix de couleur */}
        {phase === 'pick' && (
          <div style={{ animation:'ld-slideup .5s cubic-bezier(.16,1,.3,1)', textAlign:'center' }}>
            <p style={{ fontFamily:'monospace', fontSize:10, letterSpacing:4, textTransform:'uppercase', color:'rgba(255,255,255,.3)', marginBottom:22 }}>
              // choisir votre couleur d&apos;accent
            </p>
            <div style={{ display:'flex', gap:4, justifyContent:'center', flexWrap:'wrap' }}>
              {(Object.entries(THEMES) as [ThemeName, typeof THEMES[ThemeName]][]).map(([key, t]) => (
                <ColorSwatch
                  key={key} name={key} t={t}
                  isActive={activeKey === key}
                  onEnter={() => onEnter(key)}
                  onLeave={onLeave}
                  onSelect={() => handlePick(key)}
                />
              ))}
            </div>
            <p style={{ fontFamily:'monospace', fontSize:9, color:'rgba(255,255,255,.18)', marginTop:18, letterSpacing:1 }}>
              Survolez pour prévisualiser · Cliquez pour confirmer
            </p>
          </div>
        )}

        {/* Label */}
        {phase === 'anim' && (
          <p style={{ fontFamily:'monospace', fontSize:9, letterSpacing:3, textTransform:'uppercase', color: curAccent + '55' }}>
            // initialisation
          </p>
        )}
      </div>
    </>
  )
}
