import { useState } from 'react';
import Sunflower from '../components/Sunflower';
import { gsap, useGsapReveal } from '../lib/scroll';
import { content } from '../data/content';
import '../styles/sections/signoff.css';

interface SignOffProps {
  onResetGifts: () => void;
}

export default function SignOff({ onResetGifts }: SignOffProps) {
  const [flowerBloomed, setFlowerBloomed] = useState(false);

  const rootRef = useGsapReveal<HTMLElement>((root, reduced) => {
    const line = root.querySelector<HTMLElement>('.signoff__line');
    const name = root.querySelector<HTMLElement>('.signoff__name');
    const targets = [line, name].filter((el): el is HTMLElement => el !== null);

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      gsap.delayedCall(0, () => setFlowerBloomed(true));
      return;
    }

    gsap.set(targets, { opacity: 0, y: 16 });
    gsap
      .timeline({
        defaults: { ease: 'sunflowerBloom' },
        scrollTrigger: { trigger: root, start: 'top 80%' },
      })
      .to(targets, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 })
      .call(() => setFlowerBloomed(true), [], '-=0.15');
  }, []);

  return (
    <section ref={rootRef} className="signoff" aria-label="Sign off">
      <p className="signoff__line">{content.signOff.line}</p>
      <p className="signoff__name">{content.me}</p>
      <Sunflower variant="decorative" bloomed={flowerBloomed} size={64} className="signoff__flower" />
      <button type="button" className="signoff__reset" onClick={onResetGifts}>
        Lock them again
      </button>
    </section>
  );
}
