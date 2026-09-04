import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { createSurprise } from '../lib/birthdayService.js'
import PhoneShell from '../components/PhoneShell.jsx'
import FloatingHearts from '../components/FloatingHearts.jsx'

const MESSAGE_PLACEHOLDER = `Happy Birthday to someone truly special! 🎂
You are such a sweet soul and I'm so grateful to have you in my life.`

export default function CreatorPage() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const canSubmit = name.trim().length > 0 && message.trim().length > 0

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    const id = createSurprise({ name, message })
    navigate(`/share/${id}`)
  }

  return (
    <PhoneShell>
      <FloatingHearts count={8} />
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+32px)] overflow-y-auto no-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="text-4xl">🎂</span>
          <h1 className="mt-3 text-3xl font-semibold text-plum-800">
            Create a Birthday<br />Surprise
          </h1>
          <p className="mt-2 text-sm text-plum-700/70">
            A little animated card, made for one person, from you.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur rounded-3xl shadow-soft p-5 space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-plum-800 mb-1.5">
              Birthday person's name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Purvaa"
              maxLength={40}
              className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-base text-plum-800 placeholder:text-plum-800/30 outline-none focus:border-blush-400 focus:ring-4 focus:ring-blush-100 transition"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-plum-800 mb-1.5">
              Your birthday message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={MESSAGE_PLACEHOLDER}
              rows={5}
              maxLength={600}
              className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-base text-plum-800 placeholder:text-plum-800/30 outline-none focus:border-blush-400 focus:ring-4 focus:ring-blush-100 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-2xl bg-blush-500 disabled:bg-blush-200 disabled:cursor-not-allowed text-white font-display font-semibold text-lg py-3.5 shadow-soft active:scale-[0.98] transition"
          >
            Create Surprise
          </button>
        </motion.form>

        <p className="mt-6 text-center text-xs text-plum-700/50">
          No account needed — you'll get a link to send them right after.
        </p>
      </div>
    </PhoneShell>
  )
}
