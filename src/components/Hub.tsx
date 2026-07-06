import { useGameStore } from '../store';
import { rivers } from '../data/rivers';
import { populationLocations } from '../data/populationLocations';
import { shuffleArray } from '../utils/shuffle';
import { Countdown } from './Countdown';

export function Hub() {
  const { setScreen, initRiversGameSession, initPopulationGameSession } = useGameStore();

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-6xl w-full pt-8 md:pt-0">

        <Countdown />

        <header className="text-center mb-10 mt-4 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
            KPSS Bilgi Oyunları
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300">
            Hangi oyunu oynamak istersiniz?
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Şehir Bilme Card */}
          <button
            onClick={() => setScreen('city-region-select')}
            className="group relative bg-[#fbfcfe] dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-300 dark:border-slate-700 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500 transition-all text-left overflow-hidden flex flex-col h-full focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/50"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity">
              <svg className="w-24 h-24 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>

            <div className="relative z-10 flex-1">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 border border-indigo-100 dark:border-indigo-800/50 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Şehir Bilme
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Türkiye'nin bölgelerini seçin ve harita üzerinde şehirlerin yerlerini tahmin edin.
              </p>
            </div>
          </button>

          {/* Akarsuları Bilme Card */}
          <button
            onClick={() => {
              const shuffled = shuffleArray(rivers.map(r => r.id));
              initRiversGameSession(shuffled);
            }}
            className="group relative bg-[#fbfcfe] dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-300 dark:border-slate-700 hover:shadow-md hover:border-teal-300 dark:hover:border-teal-500 transition-all text-left overflow-hidden flex flex-col h-full focus:outline-none focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/50"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity">
              <svg className="w-24 h-24 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
              </svg>
            </div>

            <div className="relative z-10 flex-1">
              <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-6 border border-teal-100 dark:border-teal-800/50 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Akarsuları Bilme
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Türkiye'nin akarsularını harita üzerinde bularak coğrafya bilginizi test edin.
              </p>
            </div>
          </button>

          {/* Nüfus Bilme Card */}
          <button
            onClick={() => {
              const shuffled = shuffleArray(populationLocations.map(l => l.id));
              initPopulationGameSession(shuffled);
            }}
            className="group relative bg-[#fbfcfe] dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-300 dark:border-slate-700 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-500 transition-all text-left overflow-hidden flex flex-col h-full focus:outline-none focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/50"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity">
              <svg className="w-24 h-24 text-violet-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>

            <div className="relative z-10 flex-1">
              <div className="w-14 h-14 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-6 border border-violet-100 dark:border-violet-800/50 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                Nüfus Bilme
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Türkiye'nin nüfus yoğunluğunu haritada keşfedin ve tahmin edin.
              </p>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
