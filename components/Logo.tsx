interface LogoProps { size?: 'sm' | 'md' | 'lg' }

export default function Logo({ size = 'md' }: LogoProps) {
  const scales = { sm: 0.75, md: 1, lg: 1.3 }
  const s = scales[size]

  return (
    <svg
      width={Math.round(160 * s)} height={Math.round(40 * s)}
      viewBox="0 0 160 40" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CHD Dev Freelance"
    >
      {/* ── Monogramme CHD (viewBox 400×400 réduit à 40×40) ── */}
      <g transform="scale(0.1) translate(0, 0)">
        {/* C */}
        <polyline points="230,100 80,100 80,300 230,300"
          fill="none" stroke="#009c7a" strokeWidth="26"
          strokeLinecap="butt" strokeLinejoin="miter"/>
        {/* H — jambe droite */}
        <line x1="250" y1="100" x2="250" y2="300"
          stroke="#009c7a" strokeWidth="26" strokeLinecap="butt"/>
        {/* H — traverse */}
        <line x1="230" y1="200" x2="275" y2="200"
          stroke="#009c7a" strokeWidth="22" strokeLinecap="butt"/>
        {/* D — arc */}
        <path d="M272 100 Q370 100 370 200 Q370 300 272 300"
          fill="none" stroke="#009c7a" strokeWidth="26" strokeLinecap="butt"/>
        {/* Curseur terminal */}
        <rect x="300" y="268" width="46" height="32" fill="#009c7a"/>
      </g>

      {/* ── Texte ── */}
      {/* CHD */}
      <text x="48" y="24"
        fontFamily="Georgia, serif" fontSize="17" fontWeight="700"
        fill="#0f1a14">CHD</text>
      {/* dev freelance */}
      <text x="48" y="33"
        fontFamily="monospace" fontSize="7" letterSpacing="1.5"
        fill="#009c7a">DEV FREELANCE</text>
    </svg>
  )
}
