import { motion } from 'framer-motion'
import FloatingHearts from './FloatingHearts.jsx'

export default function RoseBouquet({ name, onContinue }) {
  const notes = [
    'Forever yours ❤️',
    'You make my world beautiful',
    'You are my sunshine ☀️',
    `Happy Birthday ${name} ❤️`,
  ]

  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <FloatingHearts count={10} />

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-2xl font-semibold text-plum-800"
      >
        Your Rose Bouquet 🌹
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 90 }}
        className="relative my-6 w-full max-w-[240px]"
      >
        <Bouquet />
      </motion.div>

      <div className="relative grid grid-cols-2 gap-3 max-w-[300px] mb-8">
        {notes.map((note, i) => (
          <motion.div
            key={note}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
            className="rounded-2xl bg-white/80 backdrop-blur px-3 py-2.5 text-xs text-plum-700 shadow-soft"
          >
            {note}
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileTap={{ scale: 0.96 }}
        onClick={onContinue}
        className="relative rounded-full bg-blush-500 text-white font-display font-semibold text-lg px-10 py-3.5 shadow-soft"
      >
        Continue ❤️
      </motion.button>
    </div>
  )
}

function Bouquet() {
  const roseColors = ['#FF5D8B', '#FF87A8', '#CBA6F5', '#FF5D8B', '#FFB0C7']
  const positions = [
    { x: 90, y: 50 },
    { x: 55, y: 75 },
    { x: 125, y: 75 },
    { x: 90, y: 100 },
    { x: 40, y: 105 },
  ]

  return (
    <svg viewBox="0 0 180 220" className="w-full h-auto">
      <path d="M90 130 L70 210 M90 130 L90 214 M90 130 L110 210" stroke="#8FAE6B" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M78 150 Q60 155 55 170" stroke="#8FAE6B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M102 150 Q120 155 125 170" stroke="#8FAE6B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="90" cy="150" rx="46" ry="14" fill="#FFE9EF" />

      {positions.map((p, i) => (
        <Rose key={i} x={p.x} y={p.y} color={roseColors[i]} />
      ))}
    </svg>
  )
}

function Rose({ x, y, color }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r="18" fill={color} opacity="0.25" />
      <circle r="13" fill={color} />
      <circle r="8" fill="#fff" opacity="0.25" />
      <circle r="4" fill={color} opacity="0.9" />
    </g>
  )
}
