import { useMemo } from 'react'

const COLORS = ['#FF87A8', '#FFB0C7', '#CBA6F5', '#FF5D8B']

/**
 * Subtle looping hearts drifting upward in the background.
 * Pure CSS animation (see tailwind.config.js `floatUp` keyframe) so it
 * stays smooth even on low-end phones.
 */
export default function FloatingHearts({ count = 10 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 80,
        color: COLORS[i % COLORS.length],
        opacity: 0.35 + Math.random() * 0.35,
      })),
    [count]
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 animate-floatUp"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            color: h.color,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            '--drift': `${h.drift}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 21s-6.716-4.35-9.428-8.09C.63 10.02 1.2 6.5 4.2 5.06c2.28-1.1 4.7-.24 6.3 1.66l1.5 1.78 1.5-1.78c1.6-1.9 4.02-2.76 6.3-1.66 3 1.44 3.57 4.96 1.63 7.85C18.716 16.65 12 21 12 21z" />
          </svg>
        </span>
      ))}
    </div>
  )
}
