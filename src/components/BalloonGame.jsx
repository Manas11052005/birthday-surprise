import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BALLOON_COLORS = ['#FF87A8', '#CBA6F5', '#FFC24B', '#FF5D8B']

export default function BalloonGame({ onComplete }) {
  const [popped, setPopped] = useState([false, false, false, false])
  const poppedCount = popped.filter(Boolean).length

  useEffect(() => {
    if (poppedCount === 4) {
      const timer = setTimeout(onComplete, 700)
      return () => clearTimeout(timer)
    }
  }, [poppedCount, onComplete])

  function popBalloon(index) {
    if (popped[index]) return
    setPopped((prev) => {
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-plum-800"
      >
        Pop all 4 balloons 🎈
      </motion.h1>

      <p className="mt-2 text-sm text-plum-700/60">{poppedCount}/4 popped</p>

      <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-8 place-items-center">
        {BALLOON_COLORS.map((color, i) => (
          <AnimatePresence key={i} mode="wait">
            {!popped[i] ? (
              <motion.button
                key="balloon"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 2.4 + i * 0.3, ease: 'easeInOut' },
                  scale: { duration: 0.3 },
                }}
                whileTap={{ scale: 1.1 }}
                onClick={() => popBalloon(i)}
                className="relative"
                aria-label={`Pop balloon ${i + 1}`}
              >
                <Balloon color={color} />
              </motion.button>
            ) : (
              <motion.div
                key="pop"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-16 h-20 flex items-center justify-center text-3xl"
              >
                💥
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  )
}

function Balloon({ color }) {
  return (
    <svg width="72" height="96" viewBox="0 0 72 96">
      <ellipse cx="36" cy="38" rx="30" ry="36" fill={color} />
      <ellipse cx="26" cy="24" rx="8" ry="12" fill="white" opacity="0.35" />
      <path d="M36 74 L30 82 L42 82 Z" fill={color} />
      <line x1="36" y1="82" x2="36" y2="96" stroke="#D9A8BB" strokeWidth="1.5" />
    </svg>
  )
}
