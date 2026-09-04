import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ExcitementScreen({ onContinue }) {
  const [dodge, setDodge] = useState({ x: 0, y: 0 })
  const [teases, setTeases] = useState(0)

  const teaseMessages = [
    'nice try 😏',
    "you can't catch me!",
    'come on, say yes!',
    'hehe, missed me',
  ]

  function handleNoAttempt() {
    const x = (Math.random() - 0.5) * 160
    const y = (Math.random() - 0.5) * 60
    setDodge({ x, y })
    setTeases((t) => t + 1)
  }

  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-plum-800 max-w-[280px]"
      >
        Are you excited for what's next?
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-10 flex items-center gap-5 relative h-16"
      >
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={onContinue}
          className="rounded-full bg-blush-500 text-white font-display font-semibold text-lg px-8 py-3.5 shadow-soft"
        >
          Yes ❤️
        </motion.button>

        <motion.button
          animate={{ x: dodge.x, y: dodge.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          onClick={handleNoAttempt}
          onTouchStart={handleNoAttempt}
          className="rounded-full bg-white text-plum-700 font-display font-semibold text-lg px-8 py-3.5 shadow-soft border border-blush-200"
        >
          No
        </motion.button>
      </motion.div>

      {teases > 0 && (
        <motion.p
          key={teases}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-sm text-plum-700/60"
        >
          {teaseMessages[(teases - 1) % teaseMessages.length]}
        </motion.p>
      )}
    </div>
  )
}
