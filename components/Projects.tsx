'use client'

import { useState, useEffect } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { PROJECTS } from '@/lib/data'

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
  </svg>
)

function Modal({ p, lang, onClose }: { p: typeof PROJECTS[0]; lang: 'fr'|'en'; onClose: () => void }) {
  const desc = lang === 'fr' ? p.descFr : p.descEn

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div
      style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,.85)', display:'flex', alignItems:'center', justifyContent:'center', padding:24, backdropFilter:'blur(8px)' }}
      onClick={onClose}
    >
      <div
        style={{ background:'var(--bg-card-s)', border:'1px solid var(--border)', borderTop:'3px solid var(--accent)', padding:32, maxWidth:520, width:'100%', maxHeight:'85vh', overflowY:'auto', position:'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position:'absolute', top:16, right:16, background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer' }}>
          <X size={18} />
        </button>
        <p className="proj-num" style={{ marginBottom:8 }}>{lang==='fr'?'Projet':'Project'}</p>
        <h2 style={{ fontFamily:'var(--font-syne),sans-serif', fontSize:24, fontWeight:700, marginBottom:16, color:'var(--text)' }}>{p.title}</h2>
        <p style={{ color:'var(--text-2)', fontSize:14, lineHeight:1.8, marginBottom:24 }}>{desc}</p>
        <div className="tag-row" style={{ marginBottom:24 }}>
          {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          <a href={p.github} target="_blank" rel="noreferrer" className="btn-o" style={{ fontSize:12, padding:'10px 20px' }}>
            <GitHubIcon /> Code
          </a>
          <a href={p.live} target="_blank" rel="noreferrer" className="btn-proj" style={{ fontSize:12, padding:'10px 20px' }}>
            <ArrowUpRight size={13} /> {lang==='fr'?'Voir le projet':'View project'}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { lang } = useLang()
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null)

  return (
    <>
      <section id="projects">
        <div className="wrap">
          <p className="s-label reveal">04 / {lang === 'fr' ? 'Réalisations' : 'Work'}</p>
          <h2 className="s-title reveal">
            {lang === 'fr' ? 'Mes ' : 'My '}<span className="acc">{lang === 'fr' ? 'projets' : 'projects'}</span>
          </h2>
          <div className="acc-bar reveal" />

          <div className="proj-list">
            {PROJECTS.map((p, i) => {
              const desc = lang === 'fr' ? p.descFr : p.descEn
              return (
                <div key={p.id} className={`proj-item reveal ${i % 2 === 1 ? 'rev' : ''}`}>
                  {/* Mock visual */}
                  <div className="proj-mock" style={{ borderColor: `${p.color}33`, borderTop:`3px solid ${p.color}` }}>
                    <span style={{ color: p.color, opacity:.15, fontSize:72, fontFamily:'var(--font-syne)',fontWeight:900 }}>
                      0{i+1}
                    </span>
                  </div>
                  {/* Info */}
                  <div className="proj-info">
                    <div className="proj-num">{lang==='fr'?'Projet':'Project'} 0{i+1}</div>
                    <div className="proj-name">{p.title}</div>
                    <blockquote className="proj-quote">{desc}</blockquote>
                    <div className="tag-row">
                      {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div className="proj-btns">
                      <button className="btn-proj" onClick={() => setSelected(p)}>
                        {lang==='fr'?'Voir les détails':'View details'} ↗
                      </button>
                      <a href={p.github} target="_blank" rel="noreferrer" className="btn-o" style={{ fontSize:12, padding:'10px 20px' }}>
                        <GitHubIcon /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {selected && <Modal p={selected} lang={lang} onClose={() => setSelected(null)} />}
    </>
  )
}
