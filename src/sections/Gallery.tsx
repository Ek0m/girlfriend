import { useRef, useState } from 'react';
import { gsap, useGsapReveal } from '../lib/scroll';
import { content, type MediaItem } from '../data/content';
import { duckAmbient } from '../lib/audio';
import '../styles/sections/gallery.css';

function GalleryVideo({ item }: { item: MediaItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  // Starts muted so it can autoplay without ambushing her — the only way sound
  // ever comes on is this button.
  const toggleMuted = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    if (!next) el.play().catch(() => {});
    duckAmbient(!next);
    setMuted(next);
  };

  return (
    <div className="gallery__video-wrap">
      <video
        ref={videoRef}
        src={item.src}
        width={item.width}
        height={item.height}
        className="gallery__media"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={item.caption}
      />
      <button
        type="button"
        className="gallery__sound"
        onClick={toggleMuted}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        aria-pressed={!muted}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z" />
          {muted ? (
            <path d="M16 9.5l5 5M21 9.5l-5 5" />
          ) : (
            <path d="M15.5 9c1.2 1.6 1.2 4.4 0 6M18.5 6.5c2.4 3 2.4 8 0 11" />
          )}
        </svg>
      </button>
    </div>
  );
}

export default function Gallery() {
  const rootRef = useGsapReveal<HTMLElement>((root, reduced) => {
    const items = root.querySelectorAll<HTMLElement>('.gallery__item');

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 20, scale: 0.94 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'sunflowerBloom',
      stagger: 0.15,
      scrollTrigger: {
        trigger: root,
        start: 'top 75%',
      },
    });
  }, []);

  return (
    <section ref={rootRef} className="gallery" aria-label="Photos and a video of us">
      <div className="gallery__row">
        {content.media.map((item, i) => (
          <figure
            className={`gallery__item gallery__item--${i}`}
            key={item.id}
            style={{ '--rotation': `${item.rotation}deg` } as React.CSSProperties}
          >
            {item.kind === 'video' ? (
              <GalleryVideo item={item} />
            ) : (
              <img
                src={item.src}
                alt={item.caption}
                width={item.width}
                height={item.height}
                loading="lazy"
                className="gallery__media"
              />
            )}
            <figcaption className="gallery__caption">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
