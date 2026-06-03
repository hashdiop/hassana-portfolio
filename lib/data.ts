export interface Skill {
  name: string
  level: number
  category: string
}

export interface Project {
  id: number
  title: string
  descFr: string
  descEn: string
  tags: string[]
  color: string
  github: string
  live: string
}

export interface Certification {
  id: number
  titleFr: string
  titleEn: string
  issuer: string
  icon: 'Shield' | 'Terminal'
  color: string
}

export interface Service {
  id: number
  icon: 'Monitor' | 'Server' | 'ShoppingCart' | 'LayoutDashboard'
  color: string
  titleKey: string
  descKey: string
  tags: string[]
}

export interface ProcessStep {
  step: number
  icon: 'Search' | 'Code2' | 'Rocket'
  titleKey: string
  descKey: string
}

export const SKILLS: Skill[] = [
  { name: 'JavaScript',    level: 88, category: 'Langage'   },
  { name: 'React',         level: 85, category: 'Frontend'  },
  { name: 'Node.js',       level: 84, category: 'Backend'   },
  { name: 'Express.js',    level: 83, category: 'Backend'   },
  { name: 'MongoDB',       level: 82, category: 'Backend'   },
  { name: 'REST APIs',     level: 86, category: 'Backend'   },
  { name: 'Git / GitHub',  level: 80, category: 'Outils'    },
  { name: 'TailwindCSS',   level: 78, category: 'Frontend'  },
  { name: 'TypeScript',    level: 65, category: 'Langage'   },
  { name: 'Cybersécurité', level: 68, category: 'Sécurité'  },
  { name: 'Docker',        level: 55, category: 'Outils'    },
]

export const SERVICES: Service[] = [
  {
    id: 1,
    icon: 'Monitor',
    color: '#00d4aa',
    titleKey: 'srv1_title',
    descKey: 'srv1_desc',
    tags: ['React', 'Next.js', 'TailwindCSS'],
  },
  {
    id: 2,
    icon: 'Server',
    color: '#4f8ef7',
    titleKey: 'srv2_title',
    descKey: 'srv2_desc',
    tags: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 3,
    icon: 'ShoppingCart',
    color: '#f5a623',
    titleKey: 'srv3_title',
    descKey: 'srv3_desc',
    tags: ['Stripe', 'Auth JWT', 'Admin'],
  },
  {
    id: 4,
    icon: 'LayoutDashboard',
    color: '#ff6b6b',
    titleKey: 'srv4_title',
    descKey: 'srv4_desc',
    tags: ['Charts', 'WebSockets', 'CRUD'],
  },
]

export const PROCESS: ProcessStep[] = [
  { step: 1, icon: 'Search',       titleKey: 'proc1_title', descKey: 'proc1_desc' },
  { step: 2, icon: 'Code2',        titleKey: 'proc2_title', descKey: 'proc2_desc' },
  { step: 3, icon: 'Rocket',       titleKey: 'proc3_title', descKey: 'proc3_desc' },
]

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    descFr: 'Application complète avec panier, paiement Stripe et tableau de bord admin.',
    descEn: 'Full application with cart, Stripe payment and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    color: '#00d4aa',
    github: '#',
    live: '#',
  },
  {
    id: 2,
    title: 'Locges',
    descFr: 'Application de gestion locative — architecture MERN complète, interface moderne et expérience utilisateur soignée.',
    descEn: 'Property rental management application — complete MERN architecture, modern interface and polished user experience.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    color: '#4f8ef7',
    github: '#',
    live: 'https://locges-v1.vercel.app/',
  },
  {
    id: 3,
    title: 'Task Manager App',
    descFr: 'Application de gestion de tâches collaborative avec drag & drop en temps réel.',
    descEn: 'Collaborative task management app with real-time drag & drop.',
    tags: ['React', 'Redux', 'MongoDB'],
    color: '#ff6b6b',
    github: '#',
    live: '#',
  },
]


export const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    titleFr: 'Introduction à la Cybersécurité',
    titleEn: 'Introduction to Cybersecurity',
    issuer: 'CISCO Networking Academy',
    icon: 'Shield',
    color: '#00d4aa',
  },
  {
    id: 2,
    titleFr: 'Bootcamp Développement Logiciel & IA',
    titleEn: 'Software Development & AI Bootcamp',
    issuer: 'GOMYCODE — 2025',
    icon: 'Terminal',
    color: '#f5a623',
  },
]
