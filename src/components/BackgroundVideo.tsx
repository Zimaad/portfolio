import { useRef } from 'react';

interface BackgroundVideoProps {
  videoSrc: string;
}

export default function BackgroundVideo({ videoSrc }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-bone flex items-center justify-center overflow-hidden">
      <div className="relative w-[92vw] h-[92vh] flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain saturate-105 transition-opacity duration-1000 mix-blend-multiply opacity-80"
          style={{ filter: 'brightness(1.12) contrast(1.05) blur(1px)' }}
        />
        
        {/* Advanced Diffusion Mask: multiple layers for a soft, realistic fade */}
        <div 
          className="absolute inset-0 pointer-events-none scale-110" 
          style={{ 
            background: `
              linear-gradient(to right, var(--color-bone) 0%, transparent 15%, transparent 85%, var(--color-bone) 100%),
              linear-gradient(to bottom, var(--color-bone) 0%, transparent 15%, transparent 85%, var(--color-bone) 100%),
              radial-gradient(circle at center, transparent 20%, var(--color-bone) 75%, var(--color-bone) 100%)
            ` 
          }}
        />
      </div>
    </div>
  );
}
