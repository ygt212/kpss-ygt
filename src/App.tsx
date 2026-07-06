import { useEffect } from 'react'
import { useGameStore } from './store'
import { audioCtx } from './hooks/useSoundEffects'
import { MainMenu } from './components/MainMenu'
import { RegionGameView } from './components/RegionGameView'
import { CompletionScreen } from './components/CompletionScreen'
import { Analytics } from "@vercel/analytics/react"

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
    <div className="text-slate-900 dark:text-slate-100 min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors flex flex-col">
      {/* Header Logo - Sadece Ana Menüde (Hub) */}
      {screen === 'hub' && (
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-4 pointer-events-none">
          <img src="/favicon.png" alt="Logo" className="w-16 h-16 md:w-36 md:h-36 transition-all duration-300 drop-shadow-md pointer-events-auto" />
        </div>
      )}

      <main className="flex-grow flex flex-col">
        {screen === 'hub' && <Hub />}

        {screen === 'city-region-select' && <MainMenu />}

        {screen === 'city-region-focus' && <RegionGameView />}

        {screen === 'city-completed' && <CompletionScreen />}

        {screen === 'rivers-game' && <RiverGameView />}

        {screen === 'rivers-completed' && <RiversCompletionScreen />}

        {screen === 'population-play' && <PopulationGameView />}

        {screen === 'population-completed' && <PopulationCompletionScreen />}
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-100 dark:bg-slate-900 border-t border-slate-300 dark:border-slate-700 mt-auto relative z-40">
        <div className="py-3 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Bu site <strong className="font-semibold text-slate-800 dark:text-slate-200">Yiğit Yıldırım</strong> tarafından hazırlanmıştır.
          </p>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <ThemeToggle />
      </div>

      <Analytics />
    </div>
  )
}

export default App
