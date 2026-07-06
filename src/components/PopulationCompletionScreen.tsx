import { useGameStore } from '../store';
import { useEffect, useRef } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { triggerConfetti, clearConfetti } from '../utils/confetti';
import { populationLocations } from '../data/populationLocations';
import { shuffleArray } from '../utils/shuffle';

export function PopulationCompletionScreen() {
  const { resetGame, initPopulationGameSession } = useGameStore();
  const { playCompletionSound } = useSoundEffects();
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    triggerConfetti();
    return () => {
      clearConfetti();
    };
  }, []);

  useEffect(() => {
    if (!hasPlayedRef.current) {
      playCompletionSound();
      hasPlayedRef.current = true;
    }
  }, [playCompletionSound]);

  const handlePlayAgain = () => {
    const shuffled = shuffleArray(populationLocations.map(l => l.id));
    initPopulationGameSession(shuffled);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-6 animate-fade-in transition-colors">
      <div className="max-w-md w-full bg-[#fbfcfe] dark:bg-slate-800 rounded-3xl p-10 shadow-md border border-slate-200 dark:border-slate-700 text-center relative overflow-hidden">
        
        {/* Decorative background circle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-50 dark:bg-violet-900/30 rounded-full blur-3xl opacity-60"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">Tebrikler!</h2>
          
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-10 font-medium">
            Türkiye'nin nüfus yoğunluğunu tüm bölgelerde doğru bildiniz. Harika bir iş çıkardınız!
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={handlePlayAgain}
              className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-4 focus:ring-violet-200 dark:focus:ring-violet-900/50"
            >
              Yeniden Oyna
            </button>
            <button 
              onClick={resetGame}
              className="w-full bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/60 font-bold py-4 px-6 rounded-2xl transition-all duration-200 border border-violet-200 dark:border-violet-800/50 hover:border-violet-300 dark:hover:border-violet-700 shadow-sm hover:shadow"
            >
              Ana Menüye Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
