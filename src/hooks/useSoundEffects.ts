
// Global single AudioContext for performance
const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
export const audioCtx = new AudioContextClass();

export function useSoundEffects() {
  const withResume = (playFn: () => void) => {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().then(() => {
        playFn();
      }).catch(err => console.error("Audio resume failed", err));
    } else {
      playFn();
    }
  };

  const playCorrectSound = () => {
    withResume(() => {
      const now = audioCtx.currentTime;

      // Note 1: C6
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046.50, now);
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.15, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      gain1.gain.linearRampToValueAtTime(0, now + 0.12);
      
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      osc1.onended = () => {
        osc1.disconnect();
        gain1.disconnect();
      };

      // Note 2: G6
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1567.98, now + 0.1);
      
      gain2.gain.setValueAtTime(0, now + 0.1);
      gain2.gain.linearRampToValueAtTime(0.15, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      gain2.gain.linearRampToValueAtTime(0, now + 0.32);
      
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.32);

      osc2.onended = () => {
        osc2.disconnect();
        gain2.disconnect();
      };
    });
  };

  const playWrongSound = () => {
    withResume(() => {
      const now = audioCtx.currentTime;
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sawtooth';
      // Pitch drops slightly for an aggressive "bzz"
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      gain.gain.linearRampToValueAtTime(0, now + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.25);

      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    });
  };

  const playCompletionSound = () => {
    withResume(() => {
      const now = audioCtx.currentTime;
      // Faster, brighter arpeggio (7 notes)
      const frequencies = [523.25, 659.25, 783.99, 1046.50, 1174.66, 1318.51, 1567.98];
      const noteDuration = 0.1;
      
      frequencies.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        
        const startTime = now + (index * noteDuration);
        const isLast = index === frequencies.length - 1;
        const duration = isLast ? 0.8 : 0.15;
        
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.02);
        gain.gain.linearRampToValueAtTime(0, startTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
        
        osc.onended = () => {
          osc.disconnect();
          gain.disconnect();
        };
      });
    });
  };

  return { playCorrectSound, playWrongSound, playCompletionSound };
}
