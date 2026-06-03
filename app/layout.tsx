import type { Metadata } from 'next'
import { Space_Mono, Syne } from 'next/font/google'
import './globals.css'
import { LangProvider } from '@/context/LangContext'
import { AccentProvider } from '@/context/AccentContext'

const spaceMono = Space_Mono({ weight: ['400','700'], variable: '--font-space-mono', subsets: ['latin'], display: 'swap' })
const syne      = Syne({ weight: ['400','700','800'], variable: '--font-syne', subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'CHD Dev — Développeur MERN Fullstack · Dakar',
  description: 'Cheikh Hassana Diop, développeur MERN Fullstack. Applications web React, Node.js, MongoDB — du prototype à la production.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceMono.variable} ${syne.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AccentProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </AccentProvider>
      </body>
    </html>
  )
}
