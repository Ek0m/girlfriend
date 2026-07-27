import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/scroll';
import '../styles/components/sunflower.css';

export interface SunflowerProps {
  /** Controlled — true renders/animates the open bloom, false the closed bud. */
  bloomed: boolean;
  size?: number;
  petalCount?: number;
  variant?: 'interactive' | 'decorative';
  onBloomComplete?: () => void;
  className?: string;
}

const PETAL_PATH =
  'M60,60 C51,49 44,30 53,13 C55,8 61,7 65,12 C75,29 71,49 60,60 Z';

// Fixed (not random) per-petal jitter so the fan reads hand-drawn, not
// geometric, without needing a unique path per petal or risking
// render-to-render / hydration mismatches.
const SCALE_JITTER = [0.94, 1.03, 0.97, 1.06, 0.95, 1.0, 1.04, 0.96];
const ANGLE_JITTER = [-2, 1, -1, 2, -3, 0, 2, -1];
const TILT_JITTER = [6, -8, 7, -6, 9, -7, 6, -9];

const CLOSED = { y: 17, scale: 0.4, rotate: 1 };
const OPEN = { y: -5, scale: 1, rotate: 0 };

export default function Sunflower({
  bloomed,
  size = 96,
  petalCount = 8,
  variant = 'interactive',
  onBloomComplete,
  className,
}: SunflowerProps) {
  const petalRefs = useRef<(SVGGElement | null)[]>([]);
  const centerRef = useRef<SVGCircleElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const swayTargetRef = useRef<SVGGElement | null>(null);
  const mountedRef = useRef(false);
  const prevBloomedRef = useRef(bloomed);

  const petals = Array.from({ length: petalCount }, (_, i) => i);

  const closedTilt = (i: number) => CLOSED.rotate + TILT_JITTER[i % TILT_JITTER.length];
  const openTilt = () => OPEN.rotate;

  useEffect(() => {
    const isFirstRun = !mountedRef.current;
    mountedRef.current = true;

    const petalEls = petalRefs.current.filter((el): el is SVGGElement => el !== null);
    const centerEl = centerRef.current;

    if (isFirstRun) {
      // Render whatever pose is already true, instantly, no sound/animation.
      const pose = bloomed ? OPEN : CLOSED;
      petalEls.forEach((el, i) => {
        const jitteredScale = pose.scale * SCALE_JITTER[i % SCALE_JITTER.length];
        gsap.set(el, {
          y: pose.y,
          scale: jitteredScale,
          rotate: bloomed ? openTilt() : closedTilt(i),
          transformOrigin: '60px 60px',
        });
      });
      if (centerEl) gsap.set(centerEl, { scale: bloomed ? 1 : 0.5, transformOrigin: '60px 60px' });
      prevBloomedRef.current = bloomed;
      return;
    }

    if (bloomed && !prevBloomedRef.current) {
      // false -> true: play the bloom.
      const reduced = prefersReducedMotion();

      if (reduced) {
        petalEls.forEach((el, i) => {
          gsap.to(el, {
            y: OPEN.y,
            scale: OPEN.scale * SCALE_JITTER[i % SCALE_JITTER.length],
            rotate: openTilt(),
            duration: 0.3,
            ease: 'power1.out',
          });
        });
        if (centerEl) gsap.to(centerEl, { scale: 1, duration: 0.3, ease: 'power1.out' });
        onBloomComplete?.();
      } else {
        const ringEl = ringRef.current;
        const tl = gsap.timeline({
          onComplete: () => onBloomComplete?.(),
        });

        if (centerEl) {
          tl.to(centerEl, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, 0);
        }

        if (ringEl) {
          tl.fromTo(
            ringEl,
            { scale: 0.6, opacity: 0.55 },
            { scale: 2.6, opacity: 0, duration: 0.75, ease: 'power2.out' },
            0,
          );
        }

        // Petals travel outward on the brief-specified ease, then their
        // scale gets a small springy overshoot-and-settle layered on top —
        // this is the one place the page is allowed a bit of flourish.
        tl.to(
          petalEls,
          {
            y: OPEN.y,
            rotate: openTilt(),
            duration: 0.62,
            ease: 'sunflowerBloom',
            stagger: 0.04,
          },
          0,
        )
          .to(
            petalEls,
            {
              scale: (i: number) => OPEN.scale * SCALE_JITTER[i % SCALE_JITTER.length] * 1.14,
              duration: 0.34,
              ease: 'sunflowerBloom',
              stagger: 0.04,
            },
            0,
          )
          .to(
            petalEls,
            {
              scale: (i: number) => OPEN.scale * SCALE_JITTER[i % SCALE_JITTER.length],
              duration: 0.32,
              ease: 'back.out(2.2)',
              stagger: 0.04,
            },
            0.34,
          );
      }
    } else if (!bloomed && prevBloomedRef.current) {
      // true -> false: instant revert, no animation, no sound.
      petalEls.forEach((el, i) => {
        gsap.set(el, {
          y: CLOSED.y,
          scale: CLOSED.scale * SCALE_JITTER[i % SCALE_JITTER.length],
          rotate: closedTilt(i),
        });
      });
      if (centerEl) gsap.set(centerEl, { scale: 0.5 });
    }

    prevBloomedRef.current = bloomed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bloomed]);

  // Ambient sway for decorative flowers only — slow, subtle, disabled under
  // prefers-reduced-motion, and gated so it stays live if the media query
  // changes mid-session.
  useEffect(() => {
    if (variant !== 'decorative') return;
    const el = swayTargetRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduced: '(prefers-reduced-motion: reduce)',
        full: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };
        if (reduced) return;
        const duration = 8 + Math.random() * 4;
        gsap.to(el, {
          rotate: 2.5,
          duration,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '60px 110px',
        });
      },
    );

    return () => mm.revert();
  }, [variant]);

  return (
    <svg
      className={['sunflower', `sunflower--${variant}`, className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden={variant === 'decorative' ? true : undefined}
      role={variant === 'interactive' ? 'img' : undefined}
      aria-label={variant === 'interactive' ? (bloomed ? 'Bloomed sunflower' : 'Closed sunflower bud') : undefined}
    >
      <g ref={variant === 'decorative' ? swayTargetRef : undefined}>
        {petals.map((i) => (
          <g key={i} transform={`rotate(${i * (360 / petalCount) + ANGLE_JITTER[i % ANGLE_JITTER.length]} 60 60)`}>
            <g ref={(el) => { petalRefs.current[i] = el; }}>
              <path d={PETAL_PATH} className="sunflower__petal" />
            </g>
          </g>
        ))}
        <circle ref={ringRef} className="sunflower__ring" cx="60" cy="60" r="14" />
        <circle ref={centerRef} className="sunflower__center" cx="60" cy="60" r="13" />
        <circle className="sunflower__seed" cx="55" cy="57" r="1.6" />
        <circle className="sunflower__seed" cx="65" cy="58" r="1.6" />
        <circle className="sunflower__seed" cx="60" cy="65" r="1.6" />
      </g>
    </svg>
  );
}
