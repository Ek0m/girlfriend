import { useState } from 'react';
import Sunflower from '../components/Sunflower';
import { gsap, useGsapReveal } from '../lib/scroll';
import { content } from '../data/content';
import '../styles/sections/hero.css';

function StemCluster({ flip }: { flip?: boolean }) {
  return (
    <svg
      className={`hero__stem${flip ? ' hero__stem--flip' : ''}`}
      viewBox="0 0 60 220"
      aria-hidden="true"
    >
      <path
        d="M30,220 C24,170 40,140 26,100 C16,70 34,40 28,10"
        className="hero__stem-line"
      />
      <path d="M28,150 C40,145 50,155 54,168" className="hero__stem-leaf" />
      <path d="M26,95 C14,92 4,100 0,112" className="hero__stem-leaf" />
    </svg>
  );
}

export default function Hero() {
  const [flowersBloomed, setFlowersBloomed] = useState(false);

  const rootRef = useGsapReveal<HTMLElement>((root, reduced) => {
    const eyebrow = root.querySelector<HTMLElement>('.hero__eyebrow');
    const words = root.querySelectorAll<HTMLElement>('.hero__name-word');
    const date = root.querySelector<HTMLElement>('.hero__date');
    const clusters = root.querySelectorAll<HTMLElement>('.hero__flowers');
    const cue = root.querySelector<HTMLElement>('.hero__scroll-cue');
    const heroContent = root.querySelector<HTMLElement>('.hero__content');

    const targets = [eyebrow, ...Array.from(words), date, ...Array.from(clusters), cue].filter(
      (el): el is HTMLElement => el !== null,
    );

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      // Deferred (not called directly in the effect body) so this stays a
      // subscribe-to-external-system callback rather than a synchronous
      // setState-in-effect.
      gsap.delayedCall(0, () => setFlowersBloomed(true));
      return;
    }

    gsap.set(words, { opacity: 0, y: 24 });
    gsap.set([eyebrow, date], { opacity: 0, y: 14 });
    gsap.set(clusters, { opacity: 0, y: 46 });
    gsap.set(cue, { opacity: 0 });

    gsap
      .timeline({ defaults: { ease: 'sunflowerBloom' } })
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.45 })
      .to(words, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, '-=0.2')
      .to(date, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
      .to(clusters, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.15')
      .call(() => setFlowersBloomed(true), [], '<')
      .to(cue, { opacity: 1, duration: 0.35 }, '-=0.2');

    // Gentle parallax exit: as she scrolls past the hero, the type drifts
    // up and fades slightly faster than the flowers behind it — the first
    // "scroll transition" into the letter section below.
    if (heroContent) {
      gsap.to(heroContent, {
        yPercent: -18,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  const nameWords = content.her.split(' ');

  return (
    <section ref={rootRef} className="hero" aria-label="Hero">
      <div className="hero__flowers hero__flowers--left">
        <StemCluster />
        <Sunflower variant="decorative" bloomed={flowersBloomed} size={140} className="hero__flower-head" />
      </div>
      <div className="hero__flowers hero__flowers--right">
        <StemCluster flip />
        <Sunflower variant="decorative" bloomed={flowersBloomed} size={108} className="hero__flower-head" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">{content.eyebrow}</p>
        <h1 className="hero__name">
          {nameWords.map((word, i) => (
            <span className="hero__name-word" key={`${word}-${i}`}>
              {word}
            </span>
          ))}
        </h1>
        <p className="hero__date">{content.date}</p>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span className="hero__scroll-cue-line" />
      </div>
    </section>
  );
}
