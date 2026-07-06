import { useGameStore } from '../store';
import { regions, allTurkeyRegion } from '../data/regions';
import { useEffect, useState, useRef } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { triggerConfetti, clearConfetti } from '../utils/confetti';
import { shuffleArray } from '../utils/shuffle';

export function CompletionScreen() {
  const { selectedRegionId, resetGame, initGameSession } = useGameStore();
  const [isVisible, setIsVisible] = useState(false);
  const { playCompletionSound } = useSoundEffects();
  const hasPlayedRef = useRef(false);

  const region = selectedRegionId === 'all_turkey' 
    ? allTurkeyRegion 
    : regions.find(r => r.id === selectedRegionId);

  useEffect(() => {
    // Small delay to trigger the fade-in animation after mounting
    const timer = setTimeout(() => setIsVisible(true), 50);
    triggerConfetti();
    return () => {
      clearTimeout(timer);
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
    if (selectedRegionId && region) {
      const provinceIds = region.id === 'all_turkey' 
        ? allTurkeyRegion.provinceIds 
        : region.provinceIds;
      const shuffled = shuffleArray([...provinceIds]);
      initGameSession(selectedRegionId, shuffled);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-6 transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-xl w-full bg-[#fbfcfe] dark:bg-slate-800 rounded-3xl shadow-md border border-slate-300 dark:border-slate-700 p-8 md:p-12 text-center transform transition-all duration-700 ease-out translate-y-0 relative overflow-hidden">
        
        {/* Decorative background circle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-100 dark:bg-green-900/30 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative z-10">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-200 dark:border-green-800/50">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
            Tebrikler!
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            {selectedRegionId === 'all_turkey' ? (
              <>Türkiye'nin <span className="font-bold text-slate-800 dark:text-slate-100">81</span> ilinin tamamını başarıyla buldunuz.</>
            ) : (
              <><span className="font-bold text-slate-800 dark:text-slate-100">{region?.name}</span> bölgesindeki tüm şehirleri başarıyla buldunuz.</>
            )}
          </p>

          <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
            <button 
              onClick={handlePlayAgain}
              className="w-full px-6 py-4 bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/50 text-white rounded-xl shadow-md transition-all font-semibold text-lg flex items-center justify-center gap-2"
              autoFocus
            >
              <span>Yeniden Oyna</span>
            </button>
            <button 
              onClick={() => useGameStore.getState().resetToRegionSelect()}
              className="w-full px-6 py-4 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-700 rounded-xl shadow-sm border border-indigo-200 dark:border-indigo-600 transition-all font-semibold text-lg flex items-center justify-center gap-2"
            >
              <span>Başka Bölge Seç</span>
            </button>
            <button 
              onClick={resetGame}
              className="w-full px-6 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 text-slate-700 dark:text-slate-200 rounded-xl shadow-sm border border-slate-300 dark:border-slate-600 transition-all font-semibold text-lg flex items-center justify-center gap-2"
            >
              <span>Ana Menüye Dön</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
