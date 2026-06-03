'use client'

import { useEffect } from 'react'
import ThemePicker   from '@/components/ThemePicker'
import ScrollToTop   from '@/components/ScrollToTop'
import Loader        from '@/components/Loader'
import GeometricBg   from '@/components/GeometricBg'
import CursorGlow    from '@/components/CursorGlow'
import Navbar        from '@/components/Navbar'
import Hero          from '@/components/Hero'
import About         from '@/components/About'
import Services      from '@/components/Services'
import Skills        from '@/components/Skills'
import Projects      from '@/components/Projects'
import Contact       from '@/components/Contact'
import Footer        from '@/components/Footer'

export default function Page() {
  // Scroll reveal — add .in class when element enters viewport
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('in'), i * 70)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <ThemePicker />
      <Loader />
      <ScrollToTop />
      <GeometricBg />
      <CursorGlow />
      <Navbar />
      <main style={{ position:'relative', zIndex:2 }}>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
