'use client'

import { useEffect } from 'react'

export default function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = document.getElementById('cursor-dot')
    const glow = document.getElementById('cursor-glow')
    const bar  = document.getElementById('scroll-bar')
    if (!dot || !glow) return

    let visible = false

    const onMove = (e: MouseEvent) => {
      // Afficher le curseur au premier mouvement
      if (!visible) {
        visible = true
        dot.style.transition = 'transform .15s ease, width .2s ease, height .2s ease, box-shadow .2s ease'
      }

      dot.style.left  = e.clientX + 'px'
      dot.style.top   = e.clientY + 'px'
      glow.style.left = e.clientX + 'px'
      glow.style.top  = e.clientY + 'px'

      // Détecter si on survole un élément interactif
      const target = e.target as Element
      const isInteractive = !!(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea')
      )
      dot.classList.toggle('hovered', isInteractive)
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      glow.style.opacity = '0'
    }

    const onEnter = () => {
      dot.style.opacity = '1'
      glow.style.opacity = '1'
    }

    const onScroll = () => {
      if (!bar) return
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      bar.style.height = pct + '%'
    }

    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll',    onScroll, { passive: true })

    return () => {
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-glow" />
      <div id="scroll-bar" />
    </>
  )
}
