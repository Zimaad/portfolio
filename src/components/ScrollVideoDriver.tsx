import { type ReactNode } from 'react';
import { useScrollVideo } from '../hooks/useScrollVideo';

interface ScrollVideoDriverProps {
  children: ReactNode;
  videoSrc: string;
}

export default function ScrollVideoDriver({ children, videoSrc }: ScrollVideoDriverProps) {
  {/*
    ┌─────────────────────────────────────────────────────────┐
    │  TODO: Change the video path below to your video.       │
    │  Place your .mp4 file in the /public/ directory.        │
    │  Example: "/your-scroll-video.mp4"                      │
    └─────────────────────────────────────────────────────────┘
  */}
  const { scrollDriverRef, canvasRef, loading, progress } = useScrollVideo(videoSrc);

  return (
    <div
      ref={scrollDriverRef}
      className="relative"
      style={{ height: '425vh' }}
    >
      {/* Sticky canvas background — renders pre-extracted video frames */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white" style={{ zIndex: 0 }}>
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ 
            opacity: 0.75, 
            objectFit: 'cover',
            filter: 'saturate(1.05) brightness(1.02)'
          }}
        />
        
        {/* Subtle blending mask */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent 20%, transparent 80%, rgba(255,255,255,0.1))' 
          }}
        />

        {/* Loading indicator while frames extract */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-bone transition-opacity duration-500">
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex items-center justify-center">
                <div
                  className="w-12 h-12 border-2 border-border rounded-full"
                  style={{
                    borderTopColor: 'var(--color-ink)',
                    animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
                  }}
                />
                <span className="absolute text-[9px] font-bold text-ink">
                  {progress}%
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span
                  className="text-ink font-bold"
                  style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  Optimizing Storyboard
                </span>
                <span className="text-muted text-[9px] tracking-widest uppercase opacity-60">
                  Extracting high-fidelity frames
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content sections — scroll on top of the sticky canvas */}
      <div
        className="relative w-full"
        style={{ marginTop: '-100vh', zIndex: 1 }}
      >
        {children}
      </div>
    </div>
  );
}
