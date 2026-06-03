'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current!
    const ring = ringRef.current!
    const TRS  = 6

    const trails = Array.from({ length: TRS }, () => {
      const d = document.createElement('div')
      d.className = 'cursor-trail'
      document.body.appendChild(d)
      return d
    })

    let mPos = { x: -200, y: -200 }
    let rPos = { x: -200, y: -200 }
    const tPos = Array.from({ length: TRS }, () => ({ x: -200, y: -200 }))

    const onMove = (e: MouseEvent) => {
      mPos = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
      const el = document.elementFromPoint(e.clientX, e.clientY) as Element | null
      const hovered = !!(el && (
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        el.closest('button') ||
        el.closest('a')
      ))
      ring.classList.toggle('hovered', hovered)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    let raf: number
    const anim = () => {
      rPos.x += (mPos.x - rPos.x) * 0.1
      rPos.y += (mPos.y - rPos.y) * 0.1
      ring.style.left = rPos.x + 'px'
      ring.style.top  = rPos.y + 'px'

      for (let i = TRS - 1; i >= 0; i--) {
        const src = i === 0 ? mPos : tPos[i - 1]
        tPos[i].x += (src.x - tPos[i].x) * (0.35 - i * 0.04)
        tPos[i].y += (src.y - tPos[i].y) * (0.35 - i * 0.04)
        trails[i].style.left    = tPos[i].x + 'px'
        trails[i].style.top     = tPos[i].y + 'px'
        trails[i].style.opacity = String((1 - i / TRS) * 0.28)
        trails[i].style.transform = `translate(-50%,-50%) scale(${1 - i * 0.12})`
      }

      raf = requestAnimationFrame(anim)
    }
    raf = requestAnimationFrame(anim)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      trails.forEach(t => t.remove())
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  id="cursor-dot" />
      <div ref={ringRef} id="cursor-ring" />
    </>
  )
}
