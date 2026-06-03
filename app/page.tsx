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
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type':    'Person',
            name:       'Cheikh Hassana Diop',
            url:        'https://www.hashpro.tech',
            jobTitle:   'Développeur MERN Fullstack',
            sameAs: [
              'https://github.com/',
              'https://linkedin.com/in/',
            ],
            address: {
              '@type':         'PostalAddress',
              addressLocality: 'Dakar',
              addressCountry:  'SN',
            },
            knowsAbout: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript'],
          },
          {
            '@context':   'https://schema.org',
            '@type':      'WebSite',
            name:         'CHD Dev',
            url:          'https://www.hashpro.tech',
            description:  'Portfolio de Cheikh Hassana Diop, développeur MERN Fullstack basé à Dakar.',
            inLanguage:   ['fr', 'en'],
            author: {
              '@type': 'Person',
              name:    'Cheikh Hassana Diop',
            },
          },
        ]) }}
      />

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
