import Sunflower from '../components/Sunflower';
import { content } from '../data/content';
import '../styles/sections/signoff.css';

interface SignOffProps {
  onResetGifts: () => void;
}

export default function SignOff({ onResetGifts }: SignOffProps) {
  return (
    <section className="signoff" aria-label="Sign off">
      <p className="signoff__line">{content.signOff.line}</p>
      <p className="signoff__name">{content.me}</p>
      <Sunflower variant="decorative" bloomed size={64} className="signoff__flower" />
      <button type="button" className="signoff__reset" onClick={onResetGifts}>
        Lock them again
      </button>
    </section>
  );
}
