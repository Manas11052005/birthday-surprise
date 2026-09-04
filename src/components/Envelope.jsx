import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Envelope({ onOpened }) {
  const [opening, setOpening] = useState(false)

  function handleTap() {
    if (opening) return
    setOpening(true)
    setTimeout(onOpened, 950)
  }

  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-plum-800"
      >
        A Message From My Heart ❤️
      </motion.h1>

      <motion.button
        onClick={handleTap}
        whileTap={{ scale: 0.96 }}
        className="mt-10 relative"
        aria-label="Tap the envelope to open it"
      >
        <svg width="220" height="160" viewBox="0 0 220 160">
          <rect x="10" y="20" width="200" height="130" rx="10" fill="#FFE9EF" stroke="#F1B7CE" strokeWidth="2" />
          <motion.path
            d="M10 30 L110 100 L210 30"
            fill="none"
            stroke="#F1B7CE"
            strokeWidth="2"
            animate={opening ? { d: 'M10 20 L110 -30 L210 20' } : {}}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d="M10 30 L110 100 L210 30 L210 150 L10 150 Z"
            fill="#FFF6F8"
            stroke="#F1B7CE"
            strokeWidth="2"
            animate={opening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
          <motion.g
            animate={opening ? { y: -70, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <rect x="45" y="45" width="130" height="90" rx="6" fill="#fff" stroke="#F1B7CE" strokeWidth="1.5" />
            <line x1="60" y1="65" x2="160" y2="65" stroke="#FFD3E0" strokeWidth="3" />
            <line x1="60" y1="80" x2="160" y2="80" stroke="#FFD3E0" strokeWidth="3" />
            <line x1="60" y1="95" x2="130" y2="95" stroke="#FFD3E0" strokeWidth="3" />
            <text x="110" y="120" textAnchor="middle" fontSize="18">
              ❤️
            </text>
          </motion.g>
        </svg>
      </motion.button>

      {!opening && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm text-plum-700/60 animate-shimmer"
        >
          Tap the envelope
        </motion.p>
      )}
    </div>
  )
}
