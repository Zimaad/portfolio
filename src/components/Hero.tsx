import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// CONFIGURATION: Based on the provided example 'ezgif-frame-001.png'
const frameCount = 120;
const filePrefix = 'ezgif-frame-';
const fileExtension = 'png';
const framesPath = '/'; // They are directly in the public folder

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Helper to format frame numbers (ezgif-frame-001.png)
  const formatFrame = (index: number) => {
    return `${filePrefix}${index.toString().padStart(3, '0')}.${fileExtension}`;
  };

  /* ─── Preload Images ─── */
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${framesPath}${formatFrame(i)}`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          // Put them in the correct order based on index
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages[i - 1] = img; // Pre-assign index to maintain order
    }
  }, []);

  /* ─── Setup GSAP & Canvas ─── */
  useGSAP(() => {
    if (!isLoaded || !canvasRef.current || !heroRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false }); // Optimization: no alpha needed
    if (!context) return;

    const airpods = { frame: 0 };

    const renderFrame = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img || !img.complete) return;

      // Draw image with cover logic
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      renderFrame(airpods.frame);
    };

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();

    // Context for cleanup
    const ctx = gsap.context(() => {
      /* ─── Entry: fade in the hero text ─── */
      const entryTl = gsap.timeline({ delay: 0.2 });

      entryTl.fromTo('.hero-line',
        { y: '110%' },
        { y: '0%', duration: 1.2, stagger: 0.14, ease: 'expo.out' }
      );

      entryTl.fromTo('.hero-tagline',
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 0.5, y: 0, duration: 1.4, ease: 'power2.out' },
        '-=0.6'
      );

      /* ─── Scroll-driven Canvas Sequence ─── */
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // Frame scrubbing
      scrollTl.to(airpods, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        onUpdate: () => renderFrame(airpods.frame),
      }, 0);

      // Fade out text as scroll begins
      scrollTl.to('.hero-content', {
        opacity: 0,
        y: -60,
        duration: 0.3,
        ease: 'power2.in',
      }, 0);

      // Expand clip-path from porthole to full viewport
      scrollTl.to(videoWrapRef.current, {
        clipPath: 'circle(100% at 51% 46%)',
        duration: 1,
        ease: 'none',
      }, 0);

      // Zoom effect on canvas container
      scrollTl.fromTo('.hero-canvas-container',
        { scale: 1 },
        { scale: 1.08, duration: 0.4, ease: 'none' },
        0.7
      );
    }, heroRef);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      ctx.revert();
    };
  }, [isLoaded, images]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-[#050508]"
    >
      {/* ── Canvas Sequence with clip-path porthole ── */}
      <div
        ref={videoWrapRef}
        className="hero-canvas-container absolute inset-0 z-0"
        style={{
          clipPath: 'circle(15.5% at 51% 46%)',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{
            filter: 'contrast(1.1) brightness(1.02) saturate(1.1)',
            imageRendering: 'auto',
          }}
        />
      </div>

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050508]">
          <div className="geist text-[10px] tracking-[0.4em] text-white/30 uppercase mb-4">
            Initializing Experience
          </div>
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-white/40 transition-transform duration-300" 
              style={{ transform: `translateX(${loadProgress - 100}%)` }}
            />
          </div>
          <div className="mt-4 geist text-[9px] text-white/20">
            {loadProgress}%
          </div>
        </div>
      )}

      {/* ── Hero Text ── */}
      <div
        className="hero-content relative z-10 flex flex-col justify-end px-6 md:px-14 pb-24 md:pb-32"
        style={{ minHeight: '100dvh' }}
      >
        <div className="max-w-screen-xl mx-auto w-full">
          <h1
            className="cormorant text-white mb-6"
            style={{
              fontSize: 'clamp(3.5rem, 11vw, 13rem)',
              lineHeight: '0.88',
              letterSpacing: '-0.03em',
              fontWeight: 300,
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="hero-line" style={{ display: 'block' }}>
                Zimaad
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span className="hero-line italic text-on-surface-variant/50" style={{ display: 'block' }}>
                Azhari
              </span>
            </span>
          </h1>

          <p
            className="hero-tagline geist text-on-surface-variant/60 uppercase"
            style={{
              fontSize: '10px',
              letterSpacing: '0.4em',
            }}
          >
            Crafting systems beyond the visible horizon
          </p>
        </div>

        <div
          className="hero-scroll absolute bottom-10 right-10 geist text-[10px] tracking-[0.25em] text-on-surface-variant/40"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL ↓
        </div>
      </div>
    </section>
  );
}
