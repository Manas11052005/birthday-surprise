# 🎂 Birthday Surprise

An interactive, mobile-first birthday-card experience with shareable links —
built with React, Vite, Tailwind CSS, and Framer Motion.

## How the shareable link works (no backend, no paid services)

There are two experiences:

- **Creator** (`/` or `/create`) — enter a name + message, get a link.
- **Recipient** (`/birthday/:id`) — opens the animated surprise directly.

For the recipient's link to work on **any device**, without a database, the
surprise's name and message are encoded directly into the `:id` segment of
the URL itself (e.g. `/birthday/purvaa--eyJuIjoiUHVydmFhIiwibS...`). Opening
that link on a completely different phone or browser decodes the data
client-side — nothing is fetched from a server, so there's nothing to 404,
and no backend is required for this first version.

The creator's own device also caches a copy in `localStorage` purely as a
convenience for a nicer-looking `/share/:id` page — the recipient experience
never depends on that cache.

All of this lives in one file: `src/lib/birthdayService.js`. It exports just
two functions — `createSurprise()` and `getSurprise()` — and every page only
calls those. **To move to Supabase later**, keep those same function
signatures and swap the internals for `supabase.from('surprises')` calls; no
UI code needs to change.

## Project structure

```
src/
  lib/
    birthdayService.js   # data layer (URL-encoded, swappable for Supabase)
  components/
    PhoneShell.jsx        # phone-sized card frame (mobile-first, desktop-safe)
    FloatingHearts.jsx    # ambient background hearts
    ProgressIndicator.jsx # dot progress bar across the 7 stages
    BirthdayIntro.jsx     # Screen 1
    ExcitementScreen.jsx  # Screen 2 (playful "No" button)
    BalloonGame.jsx       # Screen 3 (pop 4 balloons)
    CandleBlow.jsx        # Screen 4 (mic blow-detection + tap fallback)
    RoseBouquet.jsx       # Screen 5
    Envelope.jsx          # Screen 6 (tap to open)
    BirthdayLetter.jsx    # Screen 7 (typewriter reveal)
    ShareLink.jsx         # Copy Link / Web Share API button pair
  pages/
    CreatorPage.jsx        # "/" and "/create" — the creation form
    SharePage.jsx           # "/share/:id" — shows the generated link
    BirthdayPage.jsx        # "/birthday/:id" — recipient state machine
    NotFoundBirthday.jsx    # friendly error for an unreadable id
  App.jsx                   # routes
  main.jsx                  # entry point (wraps App in BrowserRouter)
vercel.json                 # SPA rewrite so direct/refreshed URLs never 404
```

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`) on your
computer, or on your phone if it's on the same Wi-Fi network (Vite will also
print a "Network" URL for that).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## Deploy to Vercel (free)

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), click **New Project**, and import
   the repo. Vercel auto-detects Vite — no config needed.
3. Deploy. Vercel will build with `npm run build` and serve `dist/`.
4. The included `vercel.json` adds a rewrite rule so that direct links like
   `/birthday/purvaa--...` load correctly instead of 404'ing, including on
   refresh.

That's it — no environment variables, database, or paid plan required.

## Notes

- **Microphone**: the candle-blow screen asks for mic permission to detect
  blowing. If it's denied, unsupported, or the user is on desktop, a
  "Tap to blow" button always works instead.
- **Sharing**: uses the native Web Share API where available (most mobile
  browsers); falls back to a "Copy Link" button everywhere else.
- **Long links**: because the data lives in the URL, a very long message
  makes for a longer link. That's a deliberate trade-off to avoid requiring
  a backend for v1 — swap in Supabase (see above) if you'd like short,
  clean slugs instead.
