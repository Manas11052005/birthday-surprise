import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PhoneShell from '../components/PhoneShell.jsx'
import FloatingHearts from '../components/FloatingHearts.jsx'

export default function NotFoundBirthday() {
  return (
    <PhoneShell>
      <FloatingHearts count={6} />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14 }}
          className="text-6xl mb-4"
        >
          💔
        </motion.div>
        <h1 className="text-xl font-semibold text-plum-800 max-w-[260px]">
          Oops! This surprise couldn't be found
        </h1>
        <p className="mt-2 text-sm text-plum-700/60 max-w-[260px]">
          The link may be incomplete, or it might have been mistyped.
        </p>
        <Link
          to="/create"
          className="mt-8 rounded-full bg-blush-500 text-white font-display font-semibold text-base px-8 py-3.5 shadow-soft"
        >
          Create a Birthday Surprise
        </Link>
      </div>
    </PhoneShell>
  )
}
