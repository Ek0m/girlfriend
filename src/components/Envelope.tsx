import { useRef, useState, type ReactNode } from 'react';
import { gsap, prefersReducedMotion } from '../lib/scroll';

interface EnvelopeProps {
  onOpen?: () => void;
  children: ReactNode;
}

export default function Envelope({ onOpen, children }: EnvelopeProps) {
  const [opened, setOpened] = useState(false);
  const flapRef = useRef<HTMLSpanElement>(null);
  const sealRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    onOpen?.();

    const flap = flapRef.current;
    const seal = sealRef.current;
    const card = cardRef.current;
    const button = buttonRef.current;

    if (prefersReducedMotion()) {
      if (flap) gsap.set(flap, { rotateX: -165 });
      if (seal) gsap.set(seal, { opacity: 0 });
      if (card) gsap.set(card, { opacity: 1, y: 0 });
      if (button) gsap.set(button, { opacity: 0 });
      return;
    }

    const tl = gsap.timeline();
    if (seal) tl.to(seal, { opacity: 0, duration: 0.2 }, 0);
    if (flap) tl.to(flap, { rotateX: -165, duration: 0.7, ease: 'sunflowerBloom' }, 0);
    if (card) tl.to(card, { opacity: 1, y: 0, duration: 0.65, ease: 'sunflowerBloom' }, 0.22);
    if (button) tl.to(button, { opacity: 0, duration: 0.3 }, 0.35);
  };

  return (
    <div className="envelope-wrap">
      <button
        ref={buttonRef}
        type="button"
        className="envelope"
        onClick={handleOpen}
        aria-expanded={opened}
        aria-controls="the-letter"
        disabled={opened}
      >
        <span className="visually-hidden">Open the letter</span>
        <span className="envelope__body" aria-hidden="true">
          <span className="envelope__flap" ref={flapRef}>
            <span className="envelope__seal" ref={sealRef} />
          </span>
        </span>
      </button>

      <p className={`envelope__hint${opened ? ' envelope__hint--hidden' : ''}`} aria-hidden="true">
        tap to open
      </p>

      <div className="letter-card" id="the-letter" ref={cardRef} aria-hidden={!opened} inert={!opened}>
        {children}
      </div>
    </div>
  );
}
