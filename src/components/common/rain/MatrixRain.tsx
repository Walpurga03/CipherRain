import { useEffect, useRef } from 'react';
import './MatrixRain.scss';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCountRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Canvas Setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix Setup
    const fontSize = 16; // Größere Zeichen
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);
    const flashStates = Array(columns).fill(false); // Für weiße Aufblitzer
    
    // Katakana + lateinische Zeichen
    const chars = "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const frameSkip = 6;

    // Zeichnen
    const draw = () => {
      frameCountRef.current++;

      if (frameCountRef.current % frameSkip === 0) {
        // Semi-transparenter schwarzer Hintergrund für Trail-Effekt
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Matrix-Stil Font
        context.font = `${fontSize}px monospace`;
        context.textAlign = 'center';

        // Jeden Tropfen zeichnen
        drops.forEach((y, i) => {
          // Zufälliges Katakana/Zeichen
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize + fontSize/2;

          // Zufällig Aufblitzen (0.5% Chance)
          if (Math.random() < 0.005) {
            flashStates[i] = true;
          }

          // Farbe basierend auf Status
          if (y === 0) {
            context.fillStyle = '#fff'; // Erstes Zeichen immer weiß
          } else if (flashStates[i]) {
            context.fillStyle = '#fff'; // Aufblitzen in weiß
            flashStates[i] = false; // Reset nach einem Frame
          } else {
            context.fillStyle = '#0F0'; // Normales Matrix-Grün
          }

          context.fillText(char, x, y * fontSize);

          // Tropfen zurücksetzen oder weiterbewegen
          if (y * fontSize > canvas.height && Math.random() > 0.98) {
            drops[i] = 0;
          } else {
            drops[i]++;
          }
        });
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Animation starten
    animationFrameRef.current = requestAnimationFrame(draw);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain-canvas" />;
};

export default MatrixRain;
