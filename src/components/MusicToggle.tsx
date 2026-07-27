import { useState } from 'react';
import Sunflower from './Sunflower';
import { toggleAmbientMusic } from '../lib/audio';
import '../styles/components/music-toggle.css';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    setPlaying(toggleAmbientMusic());
  };

  return (
    <button
      type="button"
      className={`music-toggle${playing ? ' music-toggle--playing' : ''}`}
      onClick={handleClick}
      aria-label={playing ? 'Pause music' : 'Play music'}
      aria-pressed={playing}
    >
      <Sunflower bloomed={playing} size={40} className="music-toggle__flower" />
    </button>
  );
}
