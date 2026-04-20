import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// CONFIGURATION: Updated to WebP
const frameCount = 120;
const filePrefix = 'ezgif-frame-';
const fileExtension = 'webp'; 
const framesPath = '/';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [framesDownloaded, setFramesDownloaded] = useState(0);

  const formatFrame = (index: number) => 
    `${filePrefix}${index.toString().padStart(3, '0')}.${fileExtension}`;

  /* ─── WebP Progressive Loading ─── */
  useEffect(() => {
    // 1. Load frame 1 immediately to reveal site
    const firstImg = new Image();
    const firstFrameUrl = `${framesPath}${formatFrame(1)}`;
    firstImg.src = firstFrameUrl;
    
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      setFirstFrameLoaded(true);
      setFramesDownloaded(1);
      
      // 2. Background load the rest
      loadSequence();
    };

    firstImg.onerror = () => {
      console.error("Failed to load first frame at:", firstFrameUrl);
    };

    const loadSequence = async () => {
      for (let i = 2; i <= frameCount; i++) {
        // Yield to browser every 10 frames to keep the UI responsive
        if (i % 10 === 0) await new Promise(r => setTimeout(r, 0));
        
        const img = new Image();
        img.src = `${framesPath}${formatFrame(i)}`;
        img.onload = () => {
          imagesRef.current[i - 1] = img;
          setFramesDownloaded(prev => prev + 1);
        };
      }
    };
  }, []);

  /* ─── Animation Logic ─── */
  useGSAP(() => {
    if (!firstFrameLoaded || !canvasRef.current || !heroRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const state = { frame: 0 };

    const render = (fIndex: number) => {
      // Intelligent fallback: if frame isn't loaded yet, show the nearest previous one
      let img = imagesRef.current[Math.floor(fIndex)];
      if (!img) {
        for (let i = Math.floor(fIndex); i >= 0; i--) {
          if (imagesRef.current[i]) { 
            img = imagesRef.current[i]; 
            break; 
          }
        }
      }
      
      if (!img || !img.complete) return;

      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      render(state.frame);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=450%',
        pin: true,
        scrub: 0.5,
      }
    });

    tl.to(state, {
      frame: frameCount - 1,
      ease: 'none',
      onUpdate: () => render(state.frame),
    }, 0);

    tl.to('.hero-content', { opacity: 0, y: -40, duration: 0.3 }, 0);
    tl.to(videoWrapRef.current, { clipPath: 'circle(100% at 51% 46%)', duration: 1 }, 0);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [firstFrameLoaded]);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-[#050508]">
      <div
        ref={videoWrapRef}
        className="absolute inset-0 z-0 bg-[#050508]"
        style={{ 
          clipPath: 'circle(15.5% at 51% 46%)',
          opacity: firstFrameLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out'
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
      </div>

      {/* Loading State Overlay (Only shown until frame 1 is ready) */}
      {!firstFrameLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050508]">
          <div className="geist text-[10px] tracking-[0.4em] text-white/30 uppercase mb-4 animate-pulse">
            Initializing Experience
          </div>
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/40" style={{
              animation: 'shimmer 2s infinite linear',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
            }} />
          </div>
        </div>
      )}

      {/* Background Sync Progress (Subtle) */}
      {framesDownloaded < frameCount && firstFrameLoaded && (
        <div className="absolute bottom-6 left-6 z-50 geist text-[8px] tracking-[0.3em] text-white/10 uppercase">
          Optimizing Sequence: {Math.round((framesDownloaded / frameCount) * 100)}%
        </div>
      )}

      {firstFrameLoaded && (
        <div className="hero-content relative z-10 flex flex-col justify-end px-6 md:px-14 pb-24 md:pb-32" style={{ minHeight: '100dvh' }}>
          <div className="max-w-screen-xl mx-auto w-full">
            <h1 className="cormorant text-white mb-6" style={{ fontSize: 'clamp(3.5rem, 11vw, 13rem)', lineHeight: '0.88', fontWeight: 300 }}>
              <span className="block overflow-hidden"><span className="hero-line block">Zimaad</span></span>
              <span className="block overflow-hidden"><span className="hero-line block italic text-on-surface-variant/50">Azhari</span></span>
            </h1>
            <p className="hero-tagline manrope text-on-surface-variant/70 text-sm md:text-base max-w-lg leading-relaxed mb-8">
              I design & build software, websites, and AI-powered tools for businesses ready to scale.
            </p>
            <button
              onClick={scrollToContact}
              className="hero-tagline group inline-flex items-center gap-3 bg-white text-black px-8 py-4 geist text-[10px] tracking-[0.3em] uppercase hover:bg-white/90 transition-all duration-500"
            >
              Start a Project
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
