# Build Prompt — "Girlfriends Day" site (Vite)

> Paste this whole file to your coding agent inside the bare Vite project.
> Fill in the **YOUR INPUT** block first — everything else is ready to go.

---

## YOUR INPUT (edit before running)

```
HER NAME:            ___________
MY NAME:             ___________
DATE SHOWN ON SITE:  ___________  (e.g. August 1, 2026)
PET NAME / NICKNAME: ___________  (optional, used in micro-copy)
LETTER:              paste the full text, or write "generate a placeholder letter I'll replace"
GIFT 1 / 2 / 3:      name + one-line description each, or "placeholder"
PHOTO CAPTIONS:      3 short captions, or "placeholder"
```

---

## The brief

Build a single-page site celebrating Girlfriends Day for one specific person. It is a gift, not a landing page — no marketing sections, no feature grids, no stats, no "Get Started" CTA. The whole page has one job: make her feel adored for the three minutes she scrolls through it.

Four beats, in order:
1. **Hero** — her name, the occasion
2. **The letter** — the emotional center
3. **Three photos of us**
4. **Three gifts, locked** — she presses to unlock each one

Then a short sign-off.

---

## Stack

- Vite, already scaffolded. If the project is React, build with components; if it's vanilla, use plain ES modules and a `main.js` that mounts each section. Do not add a framework that isn't already there.
- No UI library, no Tailwind unless already installed. Hand-written CSS with custom properties.
- Allowed deps (only if genuinely needed): `gsap` **or** CSS/Web Animations API for scroll reveals, `howler` for audio. Prefer zero deps and native APIs.
- All editable content lives in **one file**: `src/data/content.js`, exporting `{ her, me, date, letter, photos[], gifts[] }`. I need to swap text and images without touching markup.

---

## Design direction

Do not produce the default AI aesthetic: no cream `#F4F1EA` background with terracotta accent, no near-black + acid green, no broadsheet hairline layout. This brief already pins the palette — follow it.

### Palette (define as CSS custom properties, use these names)

```css
--petal:     #E39BA6;  /* dusty rose — primary pink, used for accents + illustration */
--blush:     #FBEAE9;  /* palest pink — section washes */
--nude:      #DEBFA6;  /* warm nude — dividers, secondary type, envelope */
--nude-deep: #B98F72;  /* deeper nude — hover states, borders */
--linen:     #FFFCF8;  /* off-white — page background */
--sunflower: #F0B429;  /* the one saturated color on the page */
--stem:      #55663F;  /* deep olive — grounds the sunflowers, used sparingly */
--ink:       #3E2B2B;  /* warm dark brown — all body text, never pure black */
```

Rule: `--sunflower` is the loudest thing on the page and appears only in the illustrations and the unlock interactions. Everything else stays soft. Pure white and pure black are banned.

### Type

Load from Google Fonts (`<link>` in `index.html`, preconnect included):

- **Display** — `Fraunces` (use optical-size and `SOFT`/`WONK` axes; weight 300–600, generous negative letter-spacing on large sizes). Headings and her name only.
- **Body** — `Karla`, 400/500, 17–18px base, line-height 1.7.
- **Hand** — `Caveat`, used *only* for the letter's signature and the photo captions. Never for paragraphs of body text — it should feel like handwriting on top of print, not a handwriting-font website.

Set a real type scale (e.g. 0.8 / 1 / 1.25 / 1.9 / 3 / 4.6rem) with `clamp()` for the display sizes.

### Signature element — the sunflower lock

This is the one thing she'll remember, so it gets the effort. Each gift is a **closed sunflower bud** drawn in inline SVG (petals as individual paths, all rotated inward toward the center). Pressing **Unlock** blooms it: petals rotate and translate outward in a staggered sequence (~40ms apart, ~900ms total, `cubic-bezier(.22,1,.36,1)`), the golden center scales up, and the gift card fades in beneath the open flower. One soft chime plays.

Everything else on the page stays quiet so this lands. Do not add particle effects, confetti, gradient meshes, or glow filters anywhere else.

---

## Sections in detail

### 1. Hero
Full viewport, `--linen` background. Her name in Fraunces at the largest size in the scale, with "Happy Girlfriends Day" set small, letterspaced, uppercase, in `--nude-deep` above it as an eyebrow. The date below in the same small utility style.

Behind the type: a hand-drawn-feeling SVG sunflower arrangement anchored bottom-left and bottom-right, stems in `--stem`, petals `--sunflower`, drawn with slightly irregular paths so it reads illustrated rather than geometric. Very slow ambient sway (8–12s, `prefers-reduced-motion` disables it).

Page-load sequence: eyebrow, then name (letters or words staggered), then date, then flowers rise from the bottom edge. Total under 1.6s. A small scroll cue at the bottom.

### 2. The letter
Background shifts to `--blush`. Center stage is a **closed envelope** in `--nude` with a `--petal` wax seal. It opens on click (or automatically when 60% scrolled into view — pick the click, it's better; keyboard accessible, it's a real `<button>`). The flap rotates back in 3D, the letter card slides up out of it.

The letter itself: `--linen` card, soft long shadow, subtle paper grain (CSS gradient or SVG turbulence at very low opacity), generous padding, body text in Karla at comfortable measure (60–70ch max), sign-off in Caveat, one small sunflower drawn in the bottom corner. If the letter is long, that's fine — let it breathe, don't scroll-trap it.

### 3. Three photos of us
Not a grid of three equal squares. Asymmetric stack: photo 1 large and offset left, photo 2 smaller and raised, overlapping slightly, photo 3 large and offset right — like photos laid on a table. Each has a thin `--linen` border and a soft shadow, each sits at a slight rotation (−3°, +2°, −1.5°). Caption in Caveat sits beside or under each, in `--nude-deep`.

Reveal on scroll: fade + 20px rise, staggered. On hover, the photo straightens to 0° and lifts slightly. Mobile: single column, keep the rotations, reduce the offsets.

**Placeholders:** create `public/images/us-01.jpg`, `us-02.jpg`, `us-03.jpg` as generated placeholder files (solid `--blush` with the filename centered), sized 1200×1500, 1200×900, 1200×1500. Referenced from `content.js` so I just overwrite the files.

### 4. The gifts
Section header in Fraunces: something short and warm — write it yourself, not "Your Gifts". Three sunflower locks in a row (stacked on mobile), each labelled only with a hint word until unlocked.

Locked state: closed bud, a hint line ("something you wear"), and a button labelled **Unlock this one**.
Unlocked state: bloomed flower, gift name in Fraunces, one-line description in Karla, optional image (`public/images/gift-01.jpg` etc., placeholder like above).

Behavior:
- Buttons are real `<button>` elements with visible focus rings.
- Button copy changes with state: `Unlock this one` → (during bloom, disabled) `Opening…` → gone, replaced by the gift.
- Persist unlocked state in `localStorage` so it survives a refresh, plus a tiny, low-contrast "Lock them again" text link at the very bottom of the page for resetting.
- Stagger is per-gift; unlocking one must not animate the others.

### 5. Sign-off
Short closing line, my name in Caveat, a single small sunflower. Nothing else. No footer nav, no credits block.

---

## Sound

Elegant and optional — never ambush her.

- **Ambient music:** soft solo piano loop at `public/audio/ambient.mp3` (placeholder file — create a silent 3-second mp3 and a `README` in that folder telling me what to drop in). **Starts muted/off.** A small floating toggle, bottom-right, sunflower-shaped, `aria-label="Play music"` / `"Pause music"`. On first activation, fade volume in over ~1.2s to about 0.35. Never autoplay.
- **Interaction sounds:** `unlock.mp3` (soft chime, ~0.6s) and `envelope.mp3` (paper rustle, ~0.4s), both in `public/audio/`, both at low volume, both silent if the music toggle has never been switched on — one gesture governs all audio.
- Preload with `<audio preload="auto">` or Howler so the chime isn't late.
- Everything must degrade silently if a file is missing — a 404 on audio should never break the page.

---

## Quality floor (non-negotiable)

- Responsive from 320px up. Test the gift row and photo stack at 375px.
- `@media (prefers-reduced-motion: reduce)`: all transforms become instant opacity changes, sway and page-load sequences disabled. The bloom becomes a simple fade to the open state.
- Visible keyboard focus on every button and link, in `--nude-deep`, never `outline: none` without a replacement.
- Semantic HTML: one `<h1>` (her name), `<section>` per beat, `alt` text on every image sourced from the captions, `<button>` for anything clickable.
- Images lazy-loaded below the fold, with `width`/`height` set to prevent layout shift.
- No horizontal scroll at any width.
- Lighthouse-clean enough that it loads fast on her phone over mobile data.

---

## What to deliver

```
src/
  main.js (or main.jsx)
  data/content.js        ← all copy, photo paths, gift data
  styles/
    tokens.css           ← palette, type scale, spacing
    base.css
    sections/*.css
  sections/              ← hero, letter, gallery, gifts, signoff
  components/
    Sunflower.(js|jsx)   ← the SVG, accepts a `bloomed` state
    MusicToggle.*
  lib/audio.js
public/
  images/  (6 placeholders + README)
  audio/   (3 placeholders + README)
```

Plus a short `README.md` at the project root: how to swap the photos, how to edit the letter and gifts, where to drop the music files, and how to deploy (Netlify drop or Vercel).

Work in this order and show me the result after each: **(1)** tokens + hero, **(2)** letter, **(3)** gallery, **(4)** gifts + bloom, **(5)** audio + polish pass. After the last step, critique your own build against this brief and remove one thing that isn't earning its place.