# Images

These are placeholders — solid blush rectangles with the filename printed on
them, sized to match the layout so nothing shifts when you swap them out.

- `us-01.svg`, `us-02.svg`, `us-03.svg` — the three photos in the gallery
  section (1200×1500, 1200×900, 1200×1500).
- `gift-01.svg` … `gift-04.svg` — the optional image shown once each gift is
  unlocked (480×480).

**Note on file format:** these placeholders are hand-authored SVGs, not JPGs.
That's a deliberate shortcut — generating real placeholder JPEGs would need
an image-processing dependency this project doesn't otherwise use. It makes
no difference to swap in real photos.

## To swap in real photos

1. Drop your real image files into this folder (any format — `.jpg`, `.png`,
   `.webp` all work).
2. Open `src/data/content.ts` and update the `src` field for each entry in
   `photos[]` / `gifts[]` to point at your new filename, e.g.
   `src: '/images/us-01.jpg'`.
3. Update `width` / `height` on the same entry to match your image's actual
   pixel dimensions, so the page doesn't shift while it loads.

Nothing else needs to change — the layout, captions, and animations all read
from `content.ts`.
