'use client'

import Image from 'next/image'
import { SKILLS } from '@/lib/data'

const TECH_ICONS: Record<string, string> = {
  'JavaScript':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'React':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Node.js':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express.js':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'MongoDB':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'Git / GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'TailwindCSS':  'https://cdn.simpleicons.org/tailwindcss/06B6D4',
  'TypeScript':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Docker':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
}

const FALLBACK: Record<string, string> = {
  'REST APIs':     'var(--accent)',
  'Cybersécurité': '#f87171',
}

const STYLES = `
@keyframes scrollL { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes scrollR { from{transform:translateX(-50%)} to{transform:translateX(0)} }
.ss-belt-l { display:flex; width:max-content; animation:scrollL 28s linear infinite; gap:10px; }
.ss-belt-r { display:flex; width:max-content; animation:scrollR 32s linear infinite; gap:10px; }
.ss-outer:hover .ss-belt-l,
.ss-outer:hover .ss-belt-r { animation-play-state:paused; }
`

function SkillCard({ skill }: { skill: typeof SKILLS[0] }) {
  const icon = TECH_ICONS[skill.name]
  const dot  = FALLBACK[skill.name] ?? 'var(--accent)'

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10, flexShrink: 0,
      padding: '8px 16px',
      background: 'rgba(17,24,39,.5)',
      border: '1px solid rgb(34,37,42)',
      transition: 'border-color .2s',
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgb(34,37,42)')}
    >
      {icon ? (
        <Image src={icon} alt={skill.name} width={16} height={16}
          style={{ flexShrink:0, objectFit:'contain' }} unoptimized />
      ) : (
        <div style={{
          width:8, height:8, borderRadius:'50%', flexShrink:0,
          background: dot, boxShadow: `0 0 5px ${dot}`,
        }}/>
      )}
      <span style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: 11, whiteSpace: 'nowrap',
        color: 'var(--text-2)',
        letterSpacing: '.03em',
      }}>
        {skill.name}
      </span>
    </div>
  )
}

function Belt({ items, reverse }: { items: typeof SKILLS; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={reverse ? 'ss-belt-r' : 'ss-belt-l'}>
        {doubled.map((s, i) => <SkillCard key={`${s.name}-${i}`} skill={s} />)}
      </div>
    </div>
  )
}

export default function StackScroll() {
  const mid  = Math.ceil(SKILLS.length / 2)
  const row1 = SKILLS.slice(0, mid)
  const row2 = SKILLS.slice(mid)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        className="ss-outer"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Fade left */}
        <div style={{
          position:'absolute', top:0, bottom:0, left:0, width:60, zIndex:2,
          background:'linear-gradient(to right, #050505, transparent)',
          pointerEvents:'none',
        }}/>
        {/* Fade right */}
        <div style={{
          position:'absolute', top:0, bottom:0, right:0, width:60, zIndex:2,
          background:'linear-gradient(to left, #050505, transparent)',
          pointerEvents:'none',
        }}/>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <Belt items={row1} />
          <Belt items={row2} reverse />
        </div>
      </div>
    </>
  )
}
