import { useState, useEffect } from 'react';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface DensityQuestionProps {
  locationName: string;
  correctDensity: 'sik' | 'seyrek';
  onResolved: () => void;
}

export function DensityQuestion({ locationName, correctDensity, onResolved }: DensityQuestionProps) {
  const [selected, setSelected] = useState<'sik' | 'seyrek' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { playCorrectSound, playWrongSound } = useSoundEffects();

  useEffect(() => {
    // Reset state completely when the target location changes
    setSelected(null);
    setIsAnimating(false);
    setIsCorrect(null);
  }, [locationName]);

  const handleAnswer = (answer: 'sik' | 'seyrek') => {
    if (isAnimating) return; // Ignore clicks during feedback animation

    setSelected(answer);

    if (answer === correctDensity) {
      playCorrectSound();
      setIsCorrect(true);
      setIsAnimating(true);
      // Brief delay to show positive feedback (checkmark/green flash) before resolving
      setTimeout(() => {
        onResolved();
      }, 600);
    } else {
      playWrongSound();
      setIsCorrect(false);
      setIsAnimating(true);
      // Brief delay for negative feedback (shake/red flash), then allow another guess
      setTimeout(() => {
        setSelected(null);
        setIsCorrect(null);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <span className="block text-lg md:text-xl font-extrabold text-violet-900 dark:text-violet-300 drop-shadow-sm mb-2">
        {locationName} <span className="font-semibold opacity-80">— Yoğunluğu nasıldır?</span>
      </span>
      
      <div className={`flex flex-row gap-2 md:gap-3 justify-center transition-all duration-200 w-max ${isCorrect === false ? 'translate-x-1 scale-95' : ''}`}>
        <DensityButton 
          label="Sık Nüfuslu"
          value="sik"
          isSelected={selected === 'sik'}
          isCorrect={isCorrect}
          onClick={() => handleAnswer('sik')}
        />
        <DensityButton 
          label="Seyrek Nüfuslu"
          value="seyrek"
          isSelected={selected === 'seyrek'}
          isCorrect={isCorrect}
          onClick={() => handleAnswer('seyrek')}
        />
      </div>
    </div>
  );
}

interface DensityButtonProps {
  label: string;
  value: 'sik' | 'seyrek';
  isSelected: boolean;
  isCorrect: boolean | null;
  onClick: () => void;
}

function DensityButton({ label, isSelected, isCorrect, onClick }: DensityButtonProps) {
  let baseClass = "relative px-4 py-2 md:px-6 md:py-2 font-bold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-4 overflow-hidden text-sm md:text-base ";
  
  if (!isSelected) {
    baseClass += "bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-200 dark:focus:ring-violet-900";
  } else {
    if (isCorrect === true) {
      baseClass += "bg-green-500 text-white ring-4 ring-green-200 dark:ring-green-900 scale-105";
    } else if (isCorrect === false) {
      baseClass += "bg-red-500 text-white ring-4 ring-red-200 dark:ring-red-900 opacity-90";
    }
  }

  // Dim the unselected button when one is selected (and correct)
  if (isCorrect === true && !isSelected) {
    baseClass += " opacity-50 scale-95 pointer-events-none";
  }

  return (
    <button onClick={onClick} className={baseClass}>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {label}
        {isSelected && isCorrect === true && (
          <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
    </button>
  );
}
