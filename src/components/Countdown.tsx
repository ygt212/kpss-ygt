import { useState, useEffect } from 'react';

const targetDate = new Date('2026-09-06T10:15:00').getTime();

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#fbfcfe] dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-300 dark:border-slate-700 p-4 mb-8 text-center mx-auto flex flex-col items-center gap-3 transition-colors max-w-md">
      <h2 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-100">
        KPSS'ye Kalan Zaman
      </h2>
      
      <div className="flex gap-2 sm:gap-4 items-center">
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-slate-400 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-600/50 mb-1">
            <span className="text-xl sm:text-2xl font-extrabold">{timeLeft.days}</span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Gün</span>
        </div>
        
        <span className="text-xl sm:text-2xl font-bold text-slate-300 dark:text-slate-600 mb-5">:</span>
        
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-slate-400 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-600/50 mb-1">
            <span className="text-xl sm:text-2xl font-extrabold">{timeLeft.hours.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Saat</span>
        </div>
        
        <span className="text-xl sm:text-2xl font-bold text-slate-300 dark:text-slate-600 mb-5">:</span>
        
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-slate-400 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-600/50 mb-1">
            <span className="text-xl sm:text-2xl font-extrabold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Dakika</span>
        </div>
        
        <span className="text-xl sm:text-2xl font-bold text-slate-300 dark:text-slate-600 mb-5">:</span>
        
        <div className="flex flex-col items-center">
          <div className="bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border border-cyan-100 dark:border-cyan-800/50 mb-1">
            <span className="text-xl sm:text-2xl font-extrabold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Saniye</span>
        </div>
      </div>
      
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
        6 Eylül 2026 - 10:15
      </p>
    </div>
  );
}
