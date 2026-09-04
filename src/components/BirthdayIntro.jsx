import { motion } from 'framer-motion'

export default function BirthdayIntro({ name, onContinue }) {
  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold text-plum-800 leading-snug">
          Happy Birthday,
          <br />
          <span className="text-blush-500 text-4xl">{name}</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 120 }}
        className="my-8 w-full max-w-[280px]"
      >
        <CelebrationIllustration />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        whileTap={{ scale: 0.96 }}
        onClick={onContinue}
        className="rounded-full bg-blush-500 text-white font-display font-semibold text-lg px-10 py-3.5 shadow-soft"
      >
        Continue ❤️
      </motion.button>
    </div>
  )
}

function CelebrationIllustration() {
  return (
    <svg viewBox="0 0 320 260" className="w-full h-auto" role="img" aria-label="Two cute animals celebrating with a birthday cake">
      {/* ground shadow */}
      <ellipse cx="160" cy="238" rx="120" ry="12" fill="#F3D6E4" opacity="0.6" />

      {/* left character - bunny */}
      <g transform="translate(30,90)">
        <ellipse cx="40" cy="110" rx="34" ry="14" fill="#F3D6E4" opacity="0.5" />
        <path d="M18 45C18 20 55 20 62 45C68 68 60 100 40 100C20 100 12 68 18 45Z" fill="#FFFFFF" stroke="#F1B7CE" strokeWidth="2" />
        <path d="M22 20C18 4 30 -6 32 12C34 -6 46 4 40 20" fill="#FFFFFF" stroke="#F1B7CE" strokeWidth="2" />
        <ellipse cx="28" cy="8" rx="4" ry="9" fill="#FFD3E0" />
        <ellipse cx="38" cy="8" rx="4" ry="9" fill="#FFD3E0" />
        <circle cx="30" cy="52" r="3" fill="#4A2545" />
        <circle cx="46" cy="52" r="3" fill="#4A2545" />
        <path d="M32 62 Q38 68 44 62" stroke="#4A2545" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="22" cy="60" r="4" fill="#FFB0C7" opacity="0.7" />
        <circle cx="54" cy="60" r="4" fill="#FFB0C7" opacity="0.7" />
        <path d="M10 80 Q0 65 12 55" stroke="#F1B7CE" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>

      {/* cake, center */}
      <g transform="translate(120,120)">
        <rect x="0" y="46" width="80" height="40" rx="8" fill="#FFB0C7" />
        <rect x="0" y="46" width="80" height="12" rx="6" fill="#FF87A8" />
        <rect x="6" y="22" width="68" height="28" rx="8" fill="#FFF6F8" stroke="#F1B7CE" strokeWidth="2" />
        <circle cx="20" cy="30" r="3" fill="#CBA6F5" />
        <circle cx="40" cy="34" r="3" fill="#FF5D8B" />
        <circle cx="60" cy="30" r="3" fill="#CBA6F5" />
        <rect x="37" y="2" width="6" height="18" rx="3" fill="#FFD3E0" />
        <motion.ellipse
          cx="40"
          cy="0"
          rx="4"
          ry="7"
          fill="#FFC24B"
          animate={{ scaleY: [1, 1.15, 0.9, 1], opacity: [1, 0.85, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
      </g>

      {/* right character - cat */}
      <g transform="translate(220,88)">
        <ellipse cx="30" cy="112" rx="34" ry="14" fill="#F3D6E4" opacity="0.5" />
        <path d="M6 44C2 18 40 16 50 40C58 62 52 100 30 100C10 100 8 66 6 44Z" fill="#FFE9EF" stroke="#F1B7CE" strokeWidth="2" />
        <path d="M6 30L0 8L20 22Z" fill="#FFE9EF" stroke="#F1B7CE" strokeWidth="2" strokeLinejoin="round" />
        <path d="M52 28L60 6L40 20Z" fill="#FFE9EF" stroke="#F1B7CE" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="20" cy="54" r="3" fill="#4A2545" />
        <circle cx="38" cy="54" r="3" fill="#4A2545" />
        <path d="M22 64 Q29 70 36 64" stroke="#4A2545" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M4 60 H16 M4 66 H15 M42 60 H54 M43 66 H54" stroke="#F1B7CE" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M60 80 Q76 70 66 50" stroke="#F1B7CE" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>

      {/* confetti */}
      <g>
        <circle cx="60" cy="40" r="4" fill="#CBA6F5" />
        <circle cx="270" cy="50" r="4" fill="#FF87A8" />
        <rect x="95" y="20" width="6" height="6" fill="#FFC24B" transform="rotate(20 95 20)" />
        <rect x="230" y="30" width="6" height="6" fill="#8F5FD1" transform="rotate(-15 230 30)" />
        <circle cx="160" cy="15" r="3" fill="#FF5D8B" />
      </g>
    </svg>
  )
}
