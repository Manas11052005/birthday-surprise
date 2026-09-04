import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function BirthdayLetter({ name, message }) {
  const fullText = `Dear ${name},\n\n${message}\n\nHappy Birthday once again! ❤️`
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setShown('')
    setDone(false)
    let i = 0
    const speed = fullText.length > 400 ? 12 : 22
    const interval = setInterval(() => {
      i += 1
      setShown(fullText.slice(0, i))
      if (i >= fullText.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [fullText])

  return (
    <div className="relative z-10 flex-1 flex flex-col items-center px-6 pt-4 pb-[calc(env(safe-area-inset-bottom)+28px)] overflow-y-auto no-scrollbar">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-plum-800 text-center mb-4 shrink-0"
      >
        A letter, just for you 💌
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="w-full bg-white/90 backdrop-blur rounded-3xl shadow-card p-5 flex-1 min-h-[280px]"
      >
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-plum-800 font-body">
          {shown}
          {!done && <span className="inline-block w-[2px] h-4 bg-blush-500 ml-0.5 align-middle animate-pulse" />}
        </p>
      </motion.div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-3xl shrink-0"
        >
          🎂🎉❤️
        </motion.div>
      )}
    </div>
  )
}
