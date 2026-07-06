import confetti from 'canvas-confetti';

let myConfetti: confetti.CreateTypes | null = null;
let confettiCanvas: HTMLCanvasElement | null = null;

export const triggerConfetti = () => {
  if (!confettiCanvas) {
    confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.width = '100vw';
    confettiCanvas.style.height = '100vh';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '9999';
    document.body.appendChild(confettiCanvas);
  }

  if (!myConfetti) {
    myConfetti = confetti.create(confettiCanvas, {
      resize: true,
      useWorker: true
    });
  }

  myConfetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
};

export const clearConfetti = () => {
  if (myConfetti) {
    myConfetti.reset();
  }
  if (confettiCanvas && confettiCanvas.parentNode) {
    confettiCanvas.parentNode.removeChild(confettiCanvas);
    confettiCanvas = null;
    myConfetti = null;
  }
};
