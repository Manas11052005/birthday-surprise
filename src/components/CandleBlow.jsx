import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VOLUME_THRESHOLD = 0.11
const SUSTAIN_FRAMES = 4

export default function CandleBlow({ onComplete }) {
  const [extinguished, setExtinguished] = useState(false)
  const [micState, setMicState] = useState('idle') // idle | listening | denied | unsupported
  const audioCtxRef = useRef(null)
  const rafRef = useRef(null)
  const loudFramesRef = useRef(0)
  const extinguishedRef = useRef(false)

  function extinguish() {
    if (extinguishedRef.current) return
    extinguishedRef.current = true
    setExtinguished(true)
    cleanupAudio()
    setTimeout(onComplete, 1400)
  }

  function cleanupAudio() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (audioCtxRef.current) {
      audioCtxRef.current.close?.()
      audioCtxRef.current = null
    }
  }

  async function startListening() {
    if (!navigator.mediaDevices?.getUserMedia || !window.AudioContext) {
      setMicState('unsupported')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioCtx = new AudioContext()
      audioCtxRef.current = audioCtx
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 512
      source.connect(analyser)

      const data = new Uint8Array(analyser.frequencyBinCount)
      setMicState('listening')

      const tick = () => {
        if (extinguishedRef.current) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        analyser.getByteTimeDomainData(data)
        let sumSquares = 0
        for (let i = 0; i < data.length; i++) {
          const normalized = (data[i] - 128) / 128
          sumSquares += normalized * normalized
        }
        const rms = Math.sqrt(sumSquares / data.length)

        if (rms > VOLUME_THRESHOLD) {
          loudFramesRef.current += 1
          if (loudFramesRef.current >= SUSTAIN_FRAMES) {
            stream.getTracks().forEach((t) => t.stop())
            extinguish()
            return
          }
        } else {
          loudFramesRef.current = 0
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      tick()
    } catch {
      setMicState('denied')
    }
  }

  useEffect(() => {
    startListening()
    return cleanupAudio
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-plum-800"
      >
        Blow the candle 🕯️
      </motion.h1>

      <p className="mt-2 text-sm text-plum-700/60">
        {micState === 'listening' && !extinguished && 'Blow into the mic'}
        {micState === 'denied' && "Mic's not available — just tap instead"}
        {micState === 'unsupported' && 'Tap to blow it out'}
        {extinguished && 'Yay! 🎉'}
      </p>

      <div className="mt-10 relative">
        <Cake extinguished={extinguished} />

        <AnimatePresence>
          {extinguished && (
            <motion.div
              initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -60, scale: 1.6 }}
              transition={{ duration: 1.2 }}
              className="absolute left-1/2 -translate-x-1/2 top-3 text-4xl"
            >
              💨
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!extinguished && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.96 }}
          onClick={extinguish}
          className="mt-10 rounded-full bg-blush-500 text-white font-display font-semibold text-base px-8 py-3 shadow-soft"
        >
          Tap to blow 🕯️
        </motion.button>
      )}
    </div>
  )
}

function Cake({ extinguished }) {
  return (
    <svg width="180" height="170" viewBox="0 0 180 170">
      <rect x="20" y="100" width="140" height="60" rx="14" fill="#FFB0C7" />
      <rect x="20" y="100" width="140" height="16" rx="8" fill="#FF87A8" />
      <rect x="34" y="60" width="112" height="46" rx="14" fill="#FFF6F8" stroke="#F1B7CE" strokeWidth="2" />
      <circle cx="60" cy="70" r="4" fill="#CBA6F5" />
      <circle cx="90" cy="76" r="4" fill="#FF5D8B" />
      <circle cx="120" cy="70" r="4" fill="#CBA6F5" />
      <rect x="86" y="30" width="8" height="30" rx="4" fill="#FFD3E0" />
      <AnimatePresence>
        {!extinguished && (
          <motion.ellipse
            cx="90"
            cy="24"
            rx="6"
            ry="11"
            fill="#FFC24B"
            animate={{ scaleY: [1, 1.2, 0.85, 1], opacity: [1, 0.8, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        )}
      </AnimatePresence>
    </svg>
  )
}
