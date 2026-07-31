# Images

Everything in here is real — no placeholders left.

## The gallery

- `us-01.jpg` (1242×2208) — first photo, offset left
- `us-video.mp4` (720×1280, ~7s) — the middle, raised slot
- `us-02.jpg` (1242×2208) — third photo, offset right

The video autoplays **muted** and loops. Sound only ever comes on if she presses
the small round button in its corner, and doing so ducks the ambient music down
instead of letting the two fight.

## The gift illustrations

- `gift-slippers.svg`, `gift-bag.svg`, `gift-necklace.svg` — hand-authored
  480×480 SVGs, shown once each gift is unlocked. They use the site palette
  (`--blush` ground, `--nude-deep` line, `--petal` fill, one `--sunflower`
  accent each) and render at 140px wide, so they're drawn bold and simple on
  purpose.

## To swap any of them

1. Drop the new file into this folder — any format works for the photos
   (`.jpg`, `.png`, `.webp`), and `.mp4` is the safest bet for video.
2. Open `src/data/content.ts` and point the matching entry's `src` at it.
   Photos and the video both live in the `media` array; each entry's `kind` is
   `'photo'` or `'video'`.
3. Update `width` / `height` on that entry to the file's real pixel dimensions
   so the page doesn't shift while it loads.

Keep filenames lowercase. Windows doesn't care, but Netlify and Vercel serve
from a case-sensitive filesystem and a mismatched `.JPG` will 404 there.

Nothing else needs to change — the layout, captions, and animations all read
from `content.ts`.
