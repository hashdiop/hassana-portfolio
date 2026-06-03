'use client'

import { Search, Code2, Rocket } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useReveal } from '@/hooks/useReveal'
import { PROCESS, ProcessStep } from '@/lib/data'
import { TKey } from '@/lib/i18n'

const ICONS  = { Search, Code2, Rocket }
const ACCENT = '#007a5e'
const DIM_BG = 'rgba(0,122,94,.06)'
const LINE_C = 'rgba(0,122,94,.18)'

function StepCard({ p, t, isLast }: { p: ProcessStep; t: (k: TKey) => string; isLast: boolean }) {
  const ref  = useReveal<HTMLDivElement>()
  const Icon = ICONS[p.icon]

  return (
    <div className="proc-step-wrap">
      <div className="reveal proc-card" ref={ref} style={{ transitionDelay: `${(p.step - 1) * 120}ms` }}>
        <div className="proc-number" style={{ color: `${ACCENT}44` }}>0{p.step}</div>
        <div className="proc-icon-wrap" style={{ background: DIM_BG, border: `1px solid ${ACCENT}28` }}>
          <Icon size={20} color={ACCENT} strokeWidth={1.8} />
        </div>
        <h3 className="proc-title">{t(p.titleKey as TKey)}</h3>
        <p className="proc-desc">{t(p.descKey as TKey)}</p>
      </div>
      {!isLast && (
        <div className="proc-connector" aria-hidden>
          <div className="proc-line" style={{ background: LINE_C }} />
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M1 1l6 5-6 5" stroke={ACCENT} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          </svg>
        </div>
      )}
    </div>
  )
}

export default function Process() {
  const { t } = useLang()
  const hRef  = useReveal<HTMLDivElement>()

  return (
    <section id="process" className="section">
      <div ref={hRef} className="scene-reveal mb-16">
        <p className="sec-label">// {t('s_process')}</p>
        <h2 className="sec-title">{t('t_process')}</h2>
        <p className="sec-sub">{t('process_sub')}</p>
      </div>
      <div className="proc-row">
        {PROCESS.map((p, i) => (
          <StepCard key={p.step} p={p} t={t} isLast={i === PROCESS.length - 1} />
        ))}
      </div>
    </section>
  )
}
