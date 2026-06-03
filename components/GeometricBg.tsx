'use client'

import { useEffect, useRef } from 'react'
import { useAccent } from '@/context/AccentContext'
import { THEMES } from '@/context/AccentContext'

// Dev + science symbols to draw
const SYMBOLS = [
  '{ }', '</>', 'fn()', '=>', '∞', 'π', '01', '∂x',
]

// Hexagon path helper (cx, cy, r)
function hexPath(cx: number, cy: number, r: number): [number, number][] {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number]
  })
}

interface Particle {
  x: number; y: number; vx: number; vy: number
  type: 'symbol' | 'hex' | 'sine' | 'atom'
  symbol?: string
  size: number; rotation: number; rotSpeed: number; opacity: number
}

export default function GeometricBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme }  = useAccent()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let particles: Particle[] = []

    const getAccent = () => {
      const t = THEMES[theme]
      return t ? t.accent : '#4ade80'
    }

    const init = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      particles = []

      // 4 symbols
      SYMBOLS.slice(0, 4).forEach(sym => {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - .5) * .22,
          vy: (Math.random() - .5) * .22,
          type: 'symbol', symbol: sym,
          size: 16 + Math.random() * 14,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - .5) * .003,
          opacity: .025 + Math.random() * .025,
        })
      })

      // 2 hexagons
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - .5) * .18,
          vy: (Math.random() - .5) * .18,
          type: 'hex', size: 32 + Math.random() * 24,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - .5) * .002,
          opacity: .03 + Math.random() * .02,
        })
      }

      // 1 sine wave
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .15,
        vy: (Math.random() - .5) * .15,
        type: 'sine', size: 60,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: .0015,
        opacity: .03,
      })

      // 1 atom
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .14,
        vy: (Math.random() - .5) * .14,
        type: 'atom', size: 28,
        rotation: 0,
        rotSpeed: .003,
        opacity: .03,
      })
    }

    const drawParticle = (p: Particle) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.opacity
      const accent = getAccent()
      ctx.strokeStyle = accent
      ctx.fillStyle   = accent
      ctx.lineWidth   = 1.2

      if (p.type === 'symbol') {
        ctx.font = `${p.size}px 'Space Mono', monospace`
        ctx.fillText(p.symbol!, -ctx.measureText(p.symbol!).width / 2, p.size / 3)

      } else if (p.type === 'hex') {
        const pts = hexPath(0, 0, p.size)
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        pts.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
        ctx.closePath()
        ctx.stroke()

      } else if (p.type === 'sine') {
        ctx.beginPath()
        for (let x = -p.size; x <= p.size; x += 2) {
          const y = Math.sin((x / p.size) * Math.PI * 2) * (p.size * .35)
          x === -p.size ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()

      } else if (p.type === 'atom') {
        // nucleus
        ctx.beginPath()
        ctx.arc(0, 0, 4, 0, Math.PI * 2)
        ctx.fill()
        // 2 electron orbits
        for (let i = 0; i < 2; i++) {
          ctx.save()
          ctx.rotate((Math.PI / 2) * i)
          ctx.beginPath()
          ctx.ellipse(0, 0, p.size, p.size * .38, 0, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        }
      }

      ctx.restore()
    }

    let frame = 0
    const draw = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed
        if (p.x < -80) p.x = canvas.width + 80
        if (p.x > canvas.width + 80) p.x = -80
        if (p.y < -80) p.y = canvas.height + 80
        if (p.y > canvas.height + 80) p.y = -80
        drawParticle(p)
      })

      raf = requestAnimationFrame(draw)
    }

    const onResize = () => init()
    window.addEventListener('resize', onResize)
    init(); draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
