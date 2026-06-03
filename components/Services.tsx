'use client'

import { Monitor, Server, ShoppingCart, LayoutDashboard } from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { useReveal } from '@/hooks/useReveal'

const SVCS = [
  {
    Icon: Monitor,
    fr: { title: 'Interface Web React', desc: 'Interfaces rapides, accessibles et responsives. De la maquette à l\'app déployée, axée sur l\'expérience utilisateur.' },
    en: { title: 'React Web Interface', desc: 'Fast, accessible and responsive interfaces. From mockup to deployed app, focused on user experience.' },
    tags: ['React', 'Next.js', 'TailwindCSS'],
  },
  {
    Icon: Server,
    fr: { title: 'API & Backend Node.js', desc: 'Architecture REST solide, JWT, WebSockets. Une API prête pour la production et documentée.' },
    en: { title: 'Node.js API & Backend', desc: 'Solid REST architecture, JWT, WebSockets. A production-ready, documented API.' },
    tags: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    Icon: ShoppingCart,
    fr: { title: 'E-Commerce complet', desc: 'Boutique en ligne avec panier, paiement Stripe, gestion des commandes et dashboard admin.' },
    en: { title: 'Full E-Commerce', desc: 'Online store with cart, Stripe payment, order management and admin dashboard.' },
    tags: ['Stripe', 'Auth JWT', 'Admin'],
  },
  {
    Icon: LayoutDashboard,
    fr: { title: 'Dashboard & Admin', desc: 'Tableaux de bord sur mesure avec graphiques temps réel, gestion CRUD et contrôle des accès.' },
    en: { title: 'Dashboard & Admin', desc: 'Custom dashboards with real-time charts, CRUD management and access control.' },
    tags: ['Charts', 'WebSockets', 'CRUD'],
  },
]

export default function Services() {
  const { lang } = useLang()
  const hRef = useReveal<HTMLDivElement>()

  return (
    <section id="services">
      <div className="wrap">
        <p className="s-label reveal">02 / {lang === 'fr' ? 'Services' : 'Services'}</p>
        <h2 className="s-title reveal">
          {lang === 'fr' ? 'Ce que je ' : 'What I '}<span className="acc">{lang === 'fr' ? 'construis' : 'build'}</span>
        </h2>
        <div className="acc-bar reveal" />
        <p className="s-sub reveal">
          {lang === 'fr'
            ? 'Des solutions web sur mesure, du prototype à la production.'
            : 'Custom web solutions, from prototype to production.'}
        </p>

        <div className="svc-grid-dark">
          {SVCS.map((s, i) => {
            const { title, desc } = lang === 'fr' ? s.fr : s.en
            return (
              <div key={title} className="svc-card-dark reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="svc-icon-dark">
                  <s.Icon size={20} color="var(--accent)" strokeWidth={1.5} />
                </div>
                <h3 className="svc-title-dark">{title}</h3>
                <p className="svc-desc-dark">{desc}</p>
                <div className="tag-row">
                  {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
