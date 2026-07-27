import { gsap } from './scroll';

// Real files go here — swap these three and everything else keeps working.
const AMBIENT_SRC = '/audio/ambient.wav';
const UNLOCK_SRC = '/audio/unlock.wav';
const ENVELOPE_SRC = '/audio/envelope.wav';

const AMBIENT_TARGET_VOLUME = 0.35;
const AMBIENT_FADE_SECONDS = 1.2;

function createAudio(src: string): HTMLAudioElement {
  const el = new Audio(src);
  el.preload = 'auto';
  // A missing/broken file must never break the page — just stay silent.
  el.addEventListener('error', () => {});
  return el;
}

const ambient = createAudio(AMBIENT_SRC);
ambient.loop = true;
ambient.volume = 0;

const unlockChime = createAudio(UNLOCK_SRC);
unlockChime.volume = 0.45;

const envelopeRustle = createAudio(ENVELOPE_SRC);
envelopeRustle.volume = 0.35;

// One gesture (the music toggle) governs all audio on the page.
let audioEnabled = false;
let ambientPlaying = false;
let hasFadedInOnce = false;

function safePlay(el: HTMLAudioElement) {
  try {
    el.currentTime = 0;
  } catch {
    // Not yet loaded — fine, play() below still no-ops safely if it fails.
  }
  el.play().catch(() => {});
}

export function toggleAmbientMusic(): boolean {
  audioEnabled = true;

  if (ambientPlaying) {
    ambient.pause();
    ambientPlaying = false;
    return false;
  }

  if (!hasFadedInOnce) {
    hasFadedInOnce = true;
    ambient.volume = 0;
    ambient
      .play()
      .then(() => {
        gsap.to(ambient, {
          volume: AMBIENT_TARGET_VOLUME,
          duration: AMBIENT_FADE_SECONDS,
          ease: 'power1.out',
        });
      })
      .catch(() => {});
  } else {
    ambient.volume = AMBIENT_TARGET_VOLUME;
    ambient.play().catch(() => {});
  }

  ambientPlaying = true;
  return true;
}

export function playUnlockChime() {
  if (!audioEnabled) return;
  safePlay(unlockChime);
}

export function playEnvelopeRustle() {
  if (!audioEnabled) return;
  safePlay(envelopeRustle);
}
