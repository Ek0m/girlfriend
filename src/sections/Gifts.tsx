import GiftCard from '../components/GiftCard';
import { gsap, useGsapReveal } from '../lib/scroll';
import { content } from '../data/content';
import '../styles/sections/gifts.css';

interface GiftsProps {
  isUnlocked: (id: string) => boolean;
  unlock: (id: string) => void;
}

export default function Gifts({ isUnlocked, unlock }: GiftsProps) {
  const rootRef = useGsapReveal<HTMLElement>((root, reduced) => {
    const heading = root.querySelector<HTMLElement>('.gifts__heading');
    const cards = root.querySelectorAll<HTMLElement>('.gift-card');
    const targets = [heading, ...Array.from(cards)].filter((el): el is HTMLElement => el !== null);

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 20 });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'sunflowerBloom',
      stagger: 0.1,
      scrollTrigger: {
        trigger: root,
        start: 'top 70%',
      },
    });
  }, []);

  return (
    <section ref={rootRef} className="gifts" aria-label="Gifts">
      <h2 className="gifts__heading">A Few Small Things, Just for You</h2>
      <div className="gifts__grid">
        {content.gifts.map((gift) => (
          <GiftCard key={gift.id} gift={gift} unlocked={isUnlocked(gift.id)} onUnlock={unlock} />
        ))}
      </div>
    </section>
  );
}
