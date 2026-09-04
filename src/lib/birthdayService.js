// ─────────────────────────────────────────────────────────────────────────
// Data layer for birthday surprises.
//
// The surprise's data (name + message) is encoded directly into the
// shareable URL so it works on any device without a backend.
// ─────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "birthday-surprises-v1";

function slugify(name) {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "friend"
  );
}

// Encode arbitrary unicode text safely into a base64url string.
function encodePayload(obj) {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);

  let binary = "";

  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function decodePayload(code) {
  const base64 = code.replace(/-/g, "+").replace(/_/g, "/");

  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

  const binary = atob(padded);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const json = new TextDecoder().decode(bytes);

  return JSON.parse(json);
}

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function writeCache(cache) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage may be unavailable.
    // The URL data still works without it.
  }
}

/**
 * Create a new birthday surprise.
 */
export function createSurprise({ name, message }) {
  const trimmedName = name.trim();
  const trimmedMessage = message.trim();

  const slug = slugify(trimmedName);

  const code = encodePayload({
    n: trimmedName,
    m: trimmedMessage,
  });

  const id = `${slug}--${code}`;

  const cache = readCache();

  cache[id] = {
    name: trimmedName,
    message: trimmedMessage,
    createdAt: Date.now(),
  };

  writeCache(cache);

  return id;
}

/**
 * Look up a surprise by its id.
 */
export function getSurprise(id) {
  if (!id) return null;

  // Prefer local cache.
  const cache = readCache();

  if (cache[id]) {
    return cache[id];
  }

  const separatorIndex = id.lastIndexOf("--");

  if (separatorIndex === -1) {
    return null;
  }

  const code = id.slice(separatorIndex + 2);

  try {
    const payload = decodePayload(code);

    if (!payload || typeof payload.n !== "string") {
      return null;
    }

    return {
      name: payload.n,
      message: payload.m || "",
    };
  } catch {
    return null;
  }
}

export function buildShareUrl(id) {
  const { origin } = window.location;

  return `${origin}/birthday/${id}`;
}
