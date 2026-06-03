import type { Metadata } from 'next'
import { Space_Mono, Syne } from 'next/font/google'
import './globals.css'
import { LangProvider }   from '@/context/LangContext'
import { AccentProvider } from '@/context/AccentContext'
import Analytics           from '@/components/Analytics'

const spaceMono = Space_Mono({ weight: ['400','700'], variable: '--font-space-mono', subsets: ['latin'], display: 'swap' })
const syne      = Syne({ weight: ['400','700','800'], variable: '--font-syne', subsets: ['latin'], display: 'swap' })

const SITE_URL = 'https://www.hashpro.tech'

export const metadata: Metadata = {
  /* ── Basics ── */
  title: {
    default:  'CHD Dev — Développeur MERN Fullstack · Dakar',
    template: '%s · CHD Dev',
  },
  description:
    'Cheikh Hassana Diop, développeur MERN Fullstack basé à Dakar. Je conçois et livre des applications web React, Node.js, MongoDB — du prototype à la production.',
  keywords: [
    'développeur MERN', 'fullstack developer', 'React', 'Node.js', 'MongoDB',
    'freelance Dakar', 'développeur web Sénégal', 'Cheikh Hassana Diop', 'CHD Dev',
  ],
  authors: [{ name: 'Cheikh Hassana Diop', url: SITE_URL }],
  creator: 'Cheikh Hassana Diop',

  /* ── Canonical & alternates (hreflang FR/EN) ── */
  alternates: {
    canonical: SITE_URL,
    languages: {
      'fr': SITE_URL,
      'en': SITE_URL,
    },
  },

  /* ── Open Graph ── */
  openGraph: {
    type:        'website',
    url:          SITE_URL,
    siteName:    'CHD Dev',
    title:       'CHD Dev — Développeur MERN Fullstack · Dakar',
    description:
      'Cheikh Hassana Diop, développeur MERN Fullstack. Applications web React, Node.js, MongoDB — du prototype à la production.',
    images: [
      {
        url:    `${SITE_URL}/og-image.png`,
        width:   1200,
        height:  630,
        alt:    'CHD Dev — Développeur MERN Fullstack',
      },
    ],
    locale: 'fr_FR',
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card:        'summary_large_image',
    title:       'CHD Dev — Développeur MERN Fullstack · Dakar',
    description:
      'Cheikh Hassana Diop, développeur MERN Fullstack. Applications web React, Node.js, MongoDB.',
    images:      [`${SITE_URL}/og-image.png`],
  },

  /* ── Robots ── */
  robots: {
    index:           true,
    follow:          true,
    googleBot: {
      index:          true,
      follow:         true,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  /* ── Favicon ── */
  icons: {
    icon:       '/icon.svg',
    shortcut:   '/icon.svg',
    apple:      '/icon.svg',
  },

  /* ── Verification Search Console (remplace par ton code) ── */
  verification: { google: 'VOTRE_CODE_ICI' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceMono.variable} ${syne.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Analytics />
        <AccentProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </AccentProvider>
      </body>
    </html>
  )
}
