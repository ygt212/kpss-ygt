import { useRef, useEffect, useState } from 'react';
import { useGameStore } from '../store';
import { TurkeyMap } from './TurkeyMap';
import { MapMarkers } from './MapMarkers';
import { populationLocations } from '../data/populationLocations';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { DensityQuestion } from './DensityQuestion';

export function PopulationGameView() {
  const { 
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

  const [stage, setStage] = useState<'locate' | 'classify'>('locate');
  const wrongClickTimeoutRef = useRef<number | null>(null);
  
  const { playCorrectSound, playWrongSound } = useSoundEffects();

  useEffect(() => {
    return () => {
      if (wrongClickTimeoutRef.current) {
        clearTimeout(wrongClickTimeoutRef.current);
      }
    };
  }, []);

  const targetLocation = populationLocations.find(l => l.id === currentTarget);
  const wrongLocation = populationLocations.find(l => l.id === lastWrongClickId);

  const handleMarkerClick = (markerId: string) => {
    // Stage classify: ignore clicks on other markers
    if (stage === 'classify') return;

    if (foundIds.includes(markerId) || !currentTarget) return;

    if (markerId === currentTarget) {
      playCorrectSound();
      setStage('classify');
      
      if (wrongClickTimeoutRef.current) {
        clearTimeout(wrongClickTimeoutRef.current);
        setLastWrongClick(null);
      }
    } else {
      playWrongSound();
      setLastWrongClick(markerId);
      
      if (wrongClickTimeoutRef.current) {
        clearTimeout(wrongClickTimeoutRef.current);
      }
      wrongClickTimeoutRef.current = window.setTimeout(() => {
        setLastWrongClick(null);
      }, 1000);
    }
  };

  const handleResolved = () => {
    addFoundId(currentTarget!);
    setStage('locate');
    
    const nextQueue = shuffledQueue.filter(id => id !== currentTarget);
    setShuffledQueue(nextQueue);
    
    if (nextQueue.length > 0) {
      setCurrentTarget(nextQueue[0]);
    } else {
      setCurrentTarget(null);
      setTimeout(() => setScreen('population-completed'), 800);
    }
  };

  const totalLocations = populationLocations.length;
  const foundCount = foundIds.length;

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-slate-100 dark:bg-slate-900 flex flex-col animate-fade-in transition-colors">
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
        </div>
        
        <div className="flex-1 flex justify-center">
          {targetLocation ? (
            <div className="bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800/50 px-6 md:px-8 py-3 rounded-2xl shadow-sm text-center min-w-[280px] max-w-lg">
              <div className="min-h-[84px] flex flex-col justify-center items-center w-full">
                {stage === 'locate' ? (
                  <>
                    <span className="block text-sm text-violet-600 dark:text-violet-400 font-bold uppercase tracking-wider mb-1">Şu bölgeyi bulun:</span>
                    <span className="block text-2xl md:text-3xl font-extrabold text-violet-900 dark:text-violet-300 drop-shadow-sm leading-none">
                      {targetLocation.name}
                    </span>
                  </>
                ) : (
                  <DensityQuestion 
                    locationName={targetLocation.name}
                    correctDensity={targetLocation.density}
                    onResolved={handleResolved}
                  />
                )}
              </div>
            </div>
          ) : foundCount === totalLocations ? (
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 px-8 py-3 rounded-2xl shadow-sm text-center min-w-[280px]">
              <span className="block text-2xl font-extrabold text-green-700 dark:text-green-400">
                Tebrikler!
              </span>
            </div>
          ) : (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 px-8 py-3 rounded-2xl shadow-sm text-center min-w-[280px]">
              <span className="block text-xl font-bold text-red-700 dark:text-red-400">
                Oyun başlatılamadı. Lütfen ana menüye dönün.
              </span>
            </div>
          )}
        </div>
        
        <div className="hidden md:flex w-40 justify-end">
          <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            {foundCount} / {totalLocations}
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 w-full flex flex-col items-center justify-center relative bg-violet-50/30 dark:bg-slate-900/50">
        <div className="md:hidden mt-4 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
          İlerleme: {foundCount} / {totalLocations}
        </div>

        <div className={`absolute top-20 md:top-10 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 pointer-events-none ${wrongLocation ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          {wrongLocation && (
            <div className="bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-full shadow-sm font-bold text-xl border-2 border-white dark:border-slate-800">
              Burası {wrongLocation.name}
            </div>
          )}
        </div>
        
        <TurkeyMap 
          interactiveIds={[]} 
          focusIds={[]}
          foundIds={[]}
          highlightIds={[]}
          hintIds={[]}
          renderOverlay={(projection) => (
            <MapMarkers 
              projection={projection} 
              items={populationLocations}
              foundIds={foundIds}
              hintIds={stage === 'classify' && currentTarget ? [currentTarget] : []}
              onMarkerClick={handleMarkerClick}
            />
          )}
        />
      </main>
    </div>
  );
}
