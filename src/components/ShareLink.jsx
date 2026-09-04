import { useState } from 'react'

export default function ShareLink({ url, name }) {
  const [copied, setCopied] = useState(false)
  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers without clipboard API access
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  async function handleShare() {
    try {
      await navigator.share({
        title: `A birthday surprise for ${name}`,
        text: `I made a little birthday surprise for you 🎂`,
        url,
      })
    } catch {
      // User cancelled the share sheet — nothing to do.
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-blush-200 bg-white px-4 py-3 text-sm text-plum-800 break-all">
        {url}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 rounded-2xl bg-plum-800 text-white font-display font-semibold py-3.5 shadow-soft active:scale-[0.98] transition"
        >
          {copied ? 'Copied! ✓' : 'Copy Link'}
        </button>
        {canShare && (
          <button
            onClick={handleShare}
            className="flex-1 rounded-2xl bg-blush-500 text-white font-display font-semibold py-3.5 shadow-soft active:scale-[0.98] transition"
          >
            Share
          </button>
        )}
      </div>
    </div>
  )
}
