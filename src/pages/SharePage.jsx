import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getSurprise, buildShareUrl } from '../lib/birthdayService.js'
import PhoneShell from '../components/PhoneShell.jsx'
import FloatingHearts from '../components/FloatingHearts.jsx'
import ShareLink from '../components/ShareLink.jsx'

export default function SharePage() {
  const { id } = useParams()
  const surprise = getSurprise(id)

  if (!surprise) return <Navigate to="/" replace />

  const url = buildShareUrl(id)

  return (
    <PhoneShell>
      <FloatingHearts count={12} />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pb-[calc(env(safe-area-inset-bottom)+32px)]">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-2xl font-semibold text-plum-800"
        >
          Your surprise is ready!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-2 mb-8 text-plum-700/70"
        >
          Send this link to <span className="font-semibold text-blush-600">{surprise.name}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="w-full"
        >
          <ShareLink url={url} name={surprise.name} />
        </motion.div>

        <Link
          to="/create"
          className="mt-8 text-sm text-plum-700/60 underline underline-offset-4"
        >
          Create another surprise
        </Link>
      </div>
    </PhoneShell>
  )
}
