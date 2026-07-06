import { useEffect } from 'react'
import { useGameStore } from './store'
import { audioCtx } from './hooks/useSoundEffects'
import { MainMenu } from './components/MainMenu'
import { RegionGameView } from './components/RegionGameView'
import { CompletionScreen } from './components/CompletionScreen'

import { Hub } from './components/Hub'
import { RiverGameView } from './components/RiverGameView'
import { RiversCompletionScreen } from './components/RiversCompletionScreen'
import { PopulationGameView } from './components/PopulationGameView'
import { PopulationCompletionScreen } from './components/PopulationCompletionScreen'
import { ThemeToggle } from './components/ThemeToggle'

function App() {
  const screen = useGameStore((state) => state.screen)

  useEffect(() => {
    const handleFirstInteraction = () => {
      // Synchronous resume as the very first action
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      
      // Play silent oscillator to force iOS Safari unlock
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      gain.gain.value = 0.001; // nearly silent
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.001);

      document.removeEventListener('pointerdown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('pointerdown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('pointerdown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="text-slate-900 dark:text-slate-100 min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <ThemeToggle />
      </div>

      {screen === 'hub' && <Hub />}

      {screen === 'city-region-select' && <MainMenu />}
      
      {screen === 'city-region-focus' && <RegionGameView />}
      
      {screen === 'city-completed' && <CompletionScreen />}

      {screen === 'rivers-game' && <RiverGameView />}

      {screen === 'rivers-completed' && <RiversCompletionScreen />}

      {screen === 'population-play' && <PopulationGameView />}

      {screen === 'population-completed' && <PopulationCompletionScreen />}
    </div>
  )
}

export default App
