import { useRef, useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { TurkeyMap } from './TurkeyMap';
import { provinces } from '../data/provinces';
import { regions, allTurkeyRegion } from '../data/regions';
import { useSoundEffects } from '../hooks/useSoundEffects';

export function RegionGameView() {
  const { 
    selectedRegionId, 
    currentTarget, 
    shuffledQueue,
    foundIds,
    lastWrongClickId,
    setShuffledQueue,
    setCurrentTarget,
    addFoundId,
    setLastWrongClick,
    setScreen,
    resetGame 
  } = useGameStore();

  const wrongClickTimeoutRef = useRef<number | null>(null);
  const hintTimeoutRef = useRef<number | null>(null);
  const [hintIds, setHintIds] = useState<string[]>([]);
  const { playCorrectSound, playWrongSound } = useSoundEffects();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (wrongClickTimeoutRef.current) {
        clearTimeout(wrongClickTimeoutRef.current);
      }
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }
    };
  }, []);

  const region = selectedRegionId === 'all_turkey' 
    ? allTurkeyRegion 
    : regions.find(r => r.id === selectedRegionId);
    
  const targetProvince = provinces.find(p => p.id === currentTarget);
  const wrongProvince = provinces.find(p => p.id === lastWrongClickId);

  if (!region) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center p-4 transition-colors">
        <p className="text-red-500 mb-4">Hata: Bölge seçilmedi.</p>
        <button 
          onClick={resetGame}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded shadow"
        >
          Ana Menüye Dön
        </button>
      </div>
    );
  }

  const handleProvinceClick = (provinceId: string) => {
    // Ignore clicks on already found provinces or if there's no active target
    if (foundIds.includes(provinceId) || !currentTarget) return;

    // Clear hint if active
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
      setHintIds([]);
    }

    if (provinceId === currentTarget) {
      // Correct click
      playCorrectSound();
      addFoundId(provinceId);
      
      const nextQueue = shuffledQueue.filter(id => id !== provinceId);
      setShuffledQueue(nextQueue);
      
      // Clear any pending wrong click feedback
      if (wrongClickTimeoutRef.current) {
        clearTimeout(wrongClickTimeoutRef.current);
        setLastWrongClick(null);
      }
      
      if (nextQueue.length > 0) {
        setCurrentTarget(nextQueue[0]);
      } else {
        setCurrentTarget(null);
        // Completed: wait a tiny bit so the user sees the last one turn green
        setTimeout(() => setScreen('city-completed'), 800);
      }
    } else {
      // Wrong click
      playWrongSound();
      setLastWrongClick(provinceId);
      
      // Reset the clear timeout so rapid clicks don't clear prematurely
      if (wrongClickTimeoutRef.current) {
        clearTimeout(wrongClickTimeoutRef.current);
      }
      wrongClickTimeoutRef.current = window.setTimeout(() => {
        setLastWrongClick(null);
      }, 1000);
    }
  };

  const handleHintClick = () => {
    if (!currentTarget) return;
    
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
    }
    
    // Pick up to 3 random wrong options from shuffledQueue
    const remainingOptions = shuffledQueue.filter(id => id !== currentTarget);
    const shuffledRemaining = [...remainingOptions].sort(() => 0.5 - Math.random());
    const selectedHints = shuffledRemaining.slice(0, 3);
    
    // Add current target so it's one of the options
    selectedHints.push(currentTarget);
    
    setHintIds(selectedHints);
    
    hintTimeoutRef.current = window.setTimeout(() => {
      setHintIds([]);
    }, 1500);
  };

  const totalProvinces = region.provinceIds.length;
  const foundCount = foundIds.length;

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-slate-100 dark:bg-slate-900 flex flex-col animate-fade-in transition-colors">
      
      {/* Top Banner / Header */}
      <header className="w-full bg-[#fbfcfe] dark:bg-slate-800 shadow-sm border-b border-slate-300 dark:border-slate-700 p-4 flex flex-col md:flex-row items-center justify-between z-10 relative">
        <div className="mb-4 md:mb-0 w-auto flex gap-2">
          <button 
            onClick={resetGame}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 rounded-lg px-3 py-1.5 transition-colors flex items-center gap-1 font-medium bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600"
            title="Ana Menüye Dön"
          >
            <span className="text-xl leading-none">&larr;</span>
            <span className="hidden sm:inline">Ana Menü</span>
          </button>
          
          <button 
            onClick={() => useGameStore.getState().resetToRegionSelect()}
            className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/50 rounded-lg px-3 py-1.5 transition-colors flex items-center gap-1 font-medium bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800/50"
            title="Bölge Seçimine Dön"
          >
            <span className="hidden sm:inline">Bölgeler</span>
          </button>

          <button 
            onClick={handleHintClick}
            disabled={!currentTarget}
            className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200 dark:focus:ring-yellow-900/50 rounded-lg px-3 py-1.5 transition-colors flex items-center gap-1 font-medium bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800/50 disabled:opacity-50 disabled:cursor-not-allowed"
            title="İpucu Al"
          >
            <span>İpucu</span>
          </button>
        </div>
        
        <div className="flex-1 flex justify-center">
          {targetProvince ? (
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/50 px-8 py-3 rounded-2xl shadow-sm text-center min-w-[280px]">
              <div className="min-h-[64px] flex flex-col justify-center items-center">
                <span className="block text-sm text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1">Şu şehri bulun:</span>
                <span className="block text-3xl md:text-4xl font-extrabold text-indigo-900 dark:text-indigo-300 drop-shadow-sm leading-none">
                  {targetProvince.name}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 px-8 py-3 rounded-2xl shadow-sm text-center min-w-[280px]">
              <div className="min-h-[64px] flex flex-col justify-center items-center">
                <span className="block text-2xl font-extrabold text-green-700 dark:text-green-400">
                  Tebrikler!
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="hidden md:flex w-40 justify-end">
          <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            {foundCount} / {totalProvinces}
          </div>
        </div>
      </header>

      {/* Main Map Area */}
      <main className="flex-1 min-h-0 w-full flex flex-col items-center justify-center relative bg-indigo-50/30 dark:bg-slate-900/50">
        
        {/* Mobile Progress (Visible only on small screens) */}
        <div className="md:hidden mt-4 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
          İlerleme: {foundCount} / {totalProvinces}
        </div>

        {/* Transient Wrong Click Feedback */}
        <div className={`absolute top-20 md:top-10 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 pointer-events-none ${wrongProvince ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>

          {wrongProvince && (
            <div className="bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-full shadow-sm font-bold text-xl border-2 border-white dark:border-slate-800">
              Burası {wrongProvince.name}
            </div>
          )}
        </div>

        <TurkeyMap 
          interactiveIds={region.provinceIds} 
          focusIds={region.id === 'all_turkey' ? [] : region.provinceIds}
          foundIds={foundIds}
          highlightIds={[]}
          hintIds={hintIds}
          onProvinceClick={handleProvinceClick}
        />
      </main>
      
    </div>
  );
}
