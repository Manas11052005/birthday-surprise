// ─────────────────────────────────────────────────────────────────────────
// Data layer for birthday surprises.
//
// WHY IT WORKS WITHOUT A BACKEND:
// The surprise's data (name + message) is encoded directly into the shareable
// URL's id segment. That means opening the link on ANY device/browser works
// immediately — there's nothing to fetch from a server, so there's no 404,
// no database, and no paid service required for this first version.
//
// We ALSO cache created surprises in localStorage purely as a nicety for the
// creator's own device (so `/share/:id` can look pretty), but nothing ever
// depends on that cache to render the recipient experience.
//
// SWAPPING IN SUPABASE LATER:
// Every other file in the app only ever calls the functions exported here
// (createSurprise / getSurprise). To move to Supabase, keep the same
// function signatures and replace the bodies with `supabase.from(...)`
// calls — no UI code needs to change.
// ─────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'birthday-surprises-v1'

function slugify(name) {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'friend'
  )
}

// Encode arbitrary unicode text safely into a base64url string.
function encodePayload(obj) {
  const json = JSON.stringify(obj)
  const bytes = new TextEncoder().encode(json)
  let binary = ''
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function decodePayload(code) {
  const base64 = code.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  const json = new TextDecoder().decode(bytes)
  return JSON.parse(json)
}

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function writeCache(cache) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
  } catch {
    // localStorage may be unavailable (private browsing etc) — safe to ignore,
    // the URL-encoded data still works without it.
  }
}

/**
 * Create a new birthday surprise and return its shareable id.
 * The id is `${readableSlug}--${encodedPayload}` so the URL stays
 * human-readable while carrying the actual data with it.
 */
export function createSurprise({ name, message }) {
  const trimmedName = name.trim()
  const trimmedMessage = message.trim()
  const slug = slugify(trimmedName)
  const code = encodePayload({ n: trimmedName, m: trimmedMessage })
  const id = `${slug}--${code}`

  const cache = readCache()
  cache[id] = { name: trimmedName, message: trimmedMessage, createdAt: Date.now() }
  writeCache(cache)

  return id
}

/**
 * Look up a surprise by its id. Works even on a brand-new device/browser,
 * since the data lives inside the id itself.
 * Returns `{ name, message }` or `null` if the id can't be decoded.
 */
export function getSurprise(id) {
  if (!id) return null

  // Prefer the local cache (covers legacy/simple ids), fall back to decoding.
  const cache = readCache()
  if (cache[id]) return cache[id]

  const separatorIndex = id.lastIndexOf('--')
  if (separatorIndex === -1) return null

  const code = id.slice(separatorIndex + 2)
  try {
    const payload = decodePayload(code)
    if (!payload || typeof payload.n !== 'string') return null
    return { name: payload.n, message: payload.m || '' }
  } catch {
    return null
  }
}

export function buildShareUrl(id) {
  const { origin } = window.location
  return `${origin}/birthday/${id}`
}
