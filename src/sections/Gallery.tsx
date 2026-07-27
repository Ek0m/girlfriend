import { gsap, useGsapReveal } from '../lib/scroll';
import { content } from '../data/content';
import '../styles/sections/gallery.css';

export default function Gallery() {
  const rootRef = useGsapReveal<HTMLElement>((root, reduced) => {
    const items = root.querySelectorAll<HTMLElement>('.gallery__item');

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: 20 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
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
    <section ref={rootRef} className="gallery" aria-label="Three photos of us">
      <div className="gallery__row">
        {content.photos.map((photo, i) => (
          <figure
            className={`gallery__item gallery__item--${i}`}
            key={photo.id}
            style={{ '--rotation': `${photo.rotation}deg` } as React.CSSProperties}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              className="gallery__image"
            />
            <figcaption className="gallery__caption">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
