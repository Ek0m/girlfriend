import Envelope from '../components/Envelope';
import Sunflower from '../components/Sunflower';
import { content } from '../data/content';
import { playEnvelopeRustle } from '../lib/audio';
import '../styles/sections/letter.css';

export default function Letter() {
  return (
    <section className="letter" aria-label="A letter for you">
      <Envelope onOpen={playEnvelopeRustle}>
        <p className="letter__greeting">{content.letter.greeting}</p>
        {content.letter.paragraphs.map((paragraph, i) => (
          <p className="letter__paragraph" key={i}>
            {paragraph}
          </p>
        ))}
        <p className="letter__signoff">{content.letter.signoff}</p>
        <Sunflower variant="decorative" bloomed size={56} className="letter__flower" />
      </Envelope>
    </section>
  );
}
