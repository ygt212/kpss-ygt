import { useState } from 'react';
import { useGameStore } from '../store';
import { regions, allTurkeyRegion } from '../data/regions';
import { TurkeyMap } from './TurkeyMap';
import { shuffleArray } from '../utils/shuffle';
import type { RegionId } from '../types';

export function MainMenu() {
  const { initGameSession } = useGameStore();
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);

  const handleRegionClick = (regionId: RegionId) => {
    const region = regions.find(r => r.id === regionId);
    if (region) {
      const shuffled = shuffleArray(region.provinceIds);
      initGameSession(regionId, shuffled);
    }
  };

  // Get the province IDs for the currently hovered region to highlight them on the mini-map
  const hoveredProvinceIds = hoveredRegion === 'all_turkey'
    ? allTurkeyRegion.provinceIds
    : (hoveredRegion ? regions.find(r => r.id === hoveredRegion)?.provinceIds || [] : []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl w-full flex flex-col items-center">

        <header className="relative w-full mb-10 flex flex-col items-center">
          <div className="w-full flex justify-start mb-6 md:mb-0 md:absolute md:top-0 md:left-0">
            <button
              onClick={() => useGameStore.getState().resetGame()}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 rounded-lg px-3 py-2 transition-colors flex items-center gap-2 font-medium bg-[#fbfcfe] dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 shadow-sm"
              title="Ana Menüye Dön"
            >
              <span className="text-xl leading-none">&larr;</span>
              <span>Ana Menü</span>
            </button>
          </div>

          <div className="text-center md:pt-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
              Bölge Seçimi
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Aşağıdan bir bölge seçin ve harita üzerinde şehirlerin yerini tahmin etmeye çalışın!
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">

          {/* Left Column: Region Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto lg:mx-0">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2 border-b dark:border-slate-700 pb-2">
              Bölgeler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => handleRegionClick(region.id)}
                  className="bg-[#fbfcfe] dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/50 text-slate-700 dark:text-slate-200 font-semibold py-4 px-6 rounded-xl shadow-sm border border-slate-300 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left flex items-center justify-between group"
                >
                  <span>{region.name}</span>
                  <span className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    →
                  </span>
                </button>
              ))}
            </div>

            {/* Tüm Türkiye (All Provinces Mode) */}
            <button
              onMouseEnter={() => setHoveredRegion('all_turkey')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => {
                const shuffled = shuffleArray(allTurkeyRegion.provinceIds);
                initGameSession('all_turkey', shuffled);
              }}
              className="w-full bg-gradient-to-r from-indigo-50 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-900/40 hover:from-indigo-100 hover:to-indigo-100 dark:hover:from-indigo-900/60 dark:hover:to-indigo-900/60 focus:outline-none focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900/50 text-slate-800 dark:text-slate-100 font-bold py-5 px-6 rounded-xl shadow border border-indigo-200 dark:border-indigo-800/50 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all text-left flex items-center justify-between group"
            >
              <div>
                <span className="block text-xl mb-1 text-indigo-900 dark:text-indigo-300 drop-shadow-sm">Tüm Türkiye</span>
                <span className="block text-sm text-indigo-600 dark:text-indigo-400 font-normal">Türkiye'nin 81 ilinin tamamını bulmayı dene!</span>
              </div>
              <span className="text-indigo-400 dark:text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-2xl">
                →
              </span>
            </button>
          </div>

          {/* Right Column: Mini Map */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-lg bg-[#fbfcfe] dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-300 dark:border-slate-700 p-6 flex flex-col items-center relative">
              <div className="w-full aspect-[2/1] relative flex items-center justify-center">
                <TurkeyMap
                  interactiveIds={[]}
                  highlightIds={hoveredProvinceIds}
                  width={600}
                  height={300}
                />
              </div>
              <div className="mt-4 min-h-[2.5rem] flex items-center justify-center">
                <p className="text-sm text-slate-400 dark:text-slate-500 text-center">
                  {hoveredRegion === 'all_turkey'
                    ? allTurkeyRegion.name
                    : (hoveredRegion ? regions.find(r => r.id === hoveredRegion)?.name : "Haritada görmek için bir bölgenin veya 'Tüm Türkiye' modunun üzerine gelin")}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
