# Audio

These are placeholders — silent `.wav` files, just long enough to stand in
for the real thing without breaking anything.

- `ambient.wav` — the background music loop (~3s placeholder). Drop in a
  soft solo piano loop.
- `unlock.wav` — plays once when a gift is unlocked (~0.6s placeholder). A
  soft chime works well.
- `envelope.wav` — plays once when the letter's envelope is opened (~0.4s
  placeholder). A paper rustle works well.

**Note on file format:** these placeholders are `.wav`, not `.mp3`. That's a
deliberate shortcut — hand-constructing valid silent MP3 frames by hand is
fragile, while a silent WAV is trivial to generate correctly. `.mp3`, `.ogg`,
or `.wav` all work fine for the real files.

## To swap in real audio

1. Drop your real audio files into this folder, keeping (or updating) these
   three filenames.
2. If you change a filename or extension, open `src/lib/audio.ts` and update
   the three `_SRC` constants at the top of the file to match.

The page never breaks if one of these files is missing or fails to load —
it just stays silent. Music also never autoplays; it only starts once the
listener presses the sunflower toggle in the bottom-right corner, and that
same first press is what allows the chime/rustle sounds to play too.
