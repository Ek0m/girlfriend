import { useState } from 'react';
import Envelope from '../components/Envelope';
import Sunflower from '../components/Sunflower';
import { content } from '../data/content';
import { playEnvelopeRustle } from '../lib/audio';
import '../styles/sections/letter.css';

export default function Letter() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    playEnvelopeRustle();
    setOpened(true);
  };

  return (
    <section className="letter" aria-label="A letter for you">
      <Envelope onOpen={handleOpen}>
        <p className="letter__greeting">{content.letter.greeting}</p>
        {content.letter.paragraphs.map((paragraph, i) => (
          <p className="letter__paragraph" key={i}>
            {paragraph}
          </p>
        ))}
        <p className="letter__signoff">{content.letter.signoff}</p>
        <Sunflower variant="decorative" bloomed={opened} size={56} className="letter__flower" />
      </Envelope>
    </section>
  );
}
