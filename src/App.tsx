import Hero from './sections/Hero';
import Letter from './sections/Letter';
import Gallery from './sections/Gallery';
import Gifts from './sections/Gifts';
import SignOff from './sections/SignOff';
import MusicToggle from './components/MusicToggle';
import { useUnlockedGifts } from './lib/storage';

function App() {
  const { isUnlocked, unlock, resetAll } = useUnlockedGifts();

  return (
    <>
      <Hero />
      <Letter />
      <Gallery />
      <Gifts isUnlocked={isUnlocked} unlock={unlock} />
      <SignOff onResetGifts={resetAll} />
      <MusicToggle />
    </>
  );
}

export default App;
