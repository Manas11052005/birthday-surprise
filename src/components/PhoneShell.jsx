// Wraps every screen so the experience always reads as a phone-sized
// birthday card — full-bleed on an actual phone, centered as a tall card
// on desktop/tablet.
export default function PhoneShell({ children }) {
  return (
    <div className="min-h-[100dvh] w-full bg-blush-gradient flex items-center justify-center sm:py-8">
      <div className="relative w-full sm:max-w-[420px] sm:rounded-[2.5rem] sm:shadow-card sm:border sm:border-white/60 min-h-[100dvh] sm:min-h-[820px] sm:max-h-[880px] overflow-hidden bg-blush-gradient flex flex-col">
        {children}
      </div>
    </div>
  )
}
