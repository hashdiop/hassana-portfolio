'use client'

import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LangContext'
import { SKILLS } from '@/lib/data'
import StackScroll from '@/components/StackScroll'

const CATS = {
  fr: [
    { title: '◆ Frontend',      tags: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'] },
    { title: '◇ Backend',       tags: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'] },
    { title: '○ Outils',        tags: ['Git / GitHub', 'Docker', 'Cybersécurité'] },
  ],
  en: [
    { title: '◆ Frontend',      tags: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'] },
    { title: '◇ Backend',       tags: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'] },
    { title: '○ Tools',         tags: ['Git / GitHub', 'Docker', 'Cybersécurité'] },
  ],
}

const BARS = [
  { name: 'JavaScript / TS', pct: 88 },
  { name: 'React / Next.js',  pct: 85 },
  { name: 'Node.js / Express',pct: 84 },
  { name: 'MongoDB',          pct: 82 },
  { name: 'REST APIs',        pct: 86 },
  { name: 'Git / GitHub',     pct: 80 },
]

function BarRow({ name, pct }: { name: string; pct: number }) {
  const fillRef = useRef<HTMLDivElement>(null)
  const rowRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && fillRef.current) {
        fillRef.current.style.width = pct + '%'
        obs.disconnect()
      }
    }, { threshold: .3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [pct])

  return (
    <div className="bar-row reveal" ref={rowRef}>
      <div className="bar-head">
        <span className="bar-name">{name}</span>
        <span className="bar-pct">{pct}%</span>
      </div>
      <div className="prog-track">
        <div className="prog-fill" ref={fillRef} />
      </div>
    </div>
  )
}

export default function Skills() {
  const { lang } = useLang()
  const cats = CATS[lang]

  return (
    <section id="skills">
      <div className="wrap">
        <p className="s-label reveal">03 / {lang === 'fr' ? 'Compétences' : 'Skills'}</p>
        <h2 className="s-title reveal">
          {lang === 'fr' ? 'Mon ' : 'My '}<span className="acc">stack</span>
        </h2>
        <div className="acc-bar reveal" />

        <div className="skills-grid">
          {/* Categories + tags */}
          <div>
            {cats.map(c => (
              <div key={c.title} className="skill-cat-card reveal">
                <div className="skill-cat-title">
                  <span className="ic">{c.title.split(' ')[0]}</span>
                  {c.title.split(' ').slice(1).join(' ')}
                </div>
                <div className="tag-row">
                  {c.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div>
            {BARS.map(b => <BarRow key={b.name} {...b} />)}
          </div>
        </div>

        {/* Stack scroll — deux lignes de cards défilantes */}
        <div className="reveal" style={{ marginTop: 56 }}>
          <p className="s-label" style={{ marginBottom: 20 }}>
            {lang === 'fr' ? '// Technologies' : '// Technologies'}
          </p>
          <StackScroll />
        </div>
      </div>
    </section>
  )
}
