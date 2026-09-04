const STAGES = ['intro', 'excitement', 'balloons', 'candle', 'bouquet', 'envelope', 'letter']

export default function ProgressIndicator({ stage }) {
  const currentIndex = STAGES.indexOf(stage)

  return (
    <div className="relative z-10 flex items-center justify-center gap-1.5 pt-[calc(env(safe-area-inset-top)+16px)] pb-2">
      {STAGES.map((s, i) => (
        <span
          key={s}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i <= currentIndex ? 'w-6 bg-blush-500' : 'w-1.5 bg-white/70'
          }`}
        />
      ))}
    </div>
  )
}
