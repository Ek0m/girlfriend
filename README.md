# Happy Girlfriends Day

A one-page gift site: a hero with her name, a letter that opens like an
envelope, three photos, four locked gifts she unlocks one by one, and a
short sign-off. Built with Vite, React, TypeScript, and GSAP.

## Running it locally

```bash
npm install
npm run dev
```

Open the printed local URL. `npm run build` produces a static `dist/`
folder; `npm run preview` serves that build locally.

## Editing the content

Everything you'll want to personalize lives in **one file**:
[`src/data/content.ts`](src/data/content.ts). Every field has a
`// PLACEHOLDER:` comment explaining what belongs there. You can edit:

- `her`, `me`, `petName`, `date`, `eyebrow` — the names and date shown in
  the hero and letter.
- `letter` — the greeting, an array of paragraphs (one per line/paragraph),
  and the sign-off.
- `photos` — three entries with `src`, `caption`, `rotation`, and
  dimensions. See [`public/images/README.md`](public/images/README.md) for
  how to swap in real photos.
- `gifts` — add, remove, or edit entries freely; the gifts section lays
  itself out from however many you list. Each has a `hint` (shown while
  locked), a `name` + `description` (shown once unlocked), and an optional
  `image`.
- `signOff` — the closing line.

No markup needs to change for any of the above.

## Adding the music and sound effects

Audio starts off by design and only turns on if she presses the small
sunflower toggle in the bottom-right corner. See
[`public/audio/README.md`](public/audio/README.md) for the three files to
replace (`ambient.wav`, `unlock.wav`, `envelope.wav`) — real files can be
`.mp3`, `.ogg`, or `.wav`, just update the paths in `src/lib/audio.ts` if
you rename anything.

## Resetting the gifts

Unlocked gifts persist in the browser's `localStorage` so a refresh doesn't
re-lock them. The small "Lock them again" link at the very bottom of the
page clears that and locks all of them again — handy while you're testing.

## Deploying

This is a static site once built, so any static host works:

- **Netlify drop:** run `npm run build`, then drag the resulting `dist/`
  folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel:** run `npx vercel`, or connect the repo in the Vercel dashboard
  and set the build command to `npm run build` with output directory
  `dist`.
