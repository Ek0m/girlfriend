import { useState } from 'react';
import Sunflower from './Sunflower';
import type { Gift } from '../data/content';
import { playUnlockChime } from '../lib/audio';

interface GiftCardProps {
  gift: Gift;
  unlocked: boolean;
  onUnlock: (id: string) => void;
}

type Phase = 'locked' | 'opening' | 'revealed';

export default function GiftCard({ gift, unlocked, onUnlock }: GiftCardProps) {
  const [phase, setPhase] = useState<Phase>(unlocked ? 'revealed' : 'locked');
  // Tracks the prop value we last reacted to, so a false->true or true->false
  // transition can be detected and handled during render (React's documented
  // pattern for adjusting state from props) instead of inside an effect.
  const [prevUnlocked, setPrevUnlocked] = useState(unlocked);

  if (unlocked !== prevUnlocked) {
    setPrevUnlocked(unlocked);
    setPhase(unlocked ? 'opening' : 'locked');
  }

  const handleClick = () => {
    if (phase !== 'locked') return;
    playUnlockChime();
    onUnlock(gift.id);
  };

  const handleBloomComplete = () => {
    setPhase((current) => (current === 'opening' ? 'revealed' : current));
  };

  return (
    <div className={`gift-card gift-card--${phase}`}>
      <Sunflower
        bloomed={phase !== 'locked'}
        onBloomComplete={handleBloomComplete}
        size={96}
        className="gift-card__flower"
      />

      {phase === 'locked' && (
        <>
          <p className="gift-card__hint">{gift.hint}</p>
          <button type="button" className="gift-card__button" onClick={handleClick}>
            Unlock this one
          </button>
        </>
      )}

      {phase === 'opening' && (
        <button type="button" className="gift-card__button" disabled>
          Opening…
        </button>
      )}

      {phase === 'revealed' && (
        <div className="gift-card__reveal">
          <h3 className="gift-card__name">{gift.name}</h3>
          <p className="gift-card__description">{gift.description}</p>
          {gift.image && (
            <img
              src={gift.image}
              alt={gift.imageAlt ?? gift.name}
              width={480}
              height={480}
              loading="lazy"
              className="gift-card__image"
            />
          )}
        </div>
      )}
    </div>
  );
}
