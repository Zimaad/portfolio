import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedRef = useRef(false);

  useGSAP(() => {
    const section = heroRef.current;
    const videoWrap = videoWrapRef.current;
    if (!section || !videoWrap) return;

    /* ─── Entry: just fade in the text ─── */
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

    entryTl.fromTo('.hero-scroll',
      { autoAlpha: 0 },
      { autoAlpha: 0.35, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    /* ─── Scroll-driven porthole → fullscreen ─── */
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=450%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: () => {
          // Start playing the video on first scroll interaction
          if (!hasPlayedRef.current && videoRef.current) {
            hasPlayedRef.current = true;  // flip BEFORE play so blocker lets it through
            videoRef.current.play();
          }
        },
      },
    });

    // Fade out text as scroll begins
    scrollTl.to('.hero-content', {
      opacity: 0,
      y: -60,
      duration: 0.3,
      ease: 'power2.in',
    }, 0);

    scrollTl.to('.hero-scroll', {
      autoAlpha: 0,
      duration: 0.1,
    }, 0);

    // Expand clip-path from porthole to full viewport
    scrollTl.to(videoWrap, {
      clipPath: 'circle(100% at 51% 46%)',
      duration: 1,
      ease: 'none',
    }, 0);

    // Subtle cinematic zoom once nearly open
    scrollTl.fromTo('.hero-video',
      { scale: 1 },
      { scale: 1.06, duration: 0.3, ease: 'none' },
      0.7
    );

  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-[#050508]"
    >
      {/* ── Video with clip-path porthole — visible immediately ── */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 z-0"
        style={{ clipPath: 'circle(15.5% at 51% 46%)' }}
      >
        <video
          ref={videoRef}
          className="hero-video w-full h-full object-cover"
          src="/public\Earth_Video_Generation_Request-ezremove.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            filter: 'contrast(1.12) brightness(1.05) saturate(1.1)',
            imageRendering: 'auto',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>

      {/* ── Minimal hero text ── */}
      <div
        className="hero-content relative z-10 flex flex-col justify-end px-6 md:px-14 pb-24 md:pb-32"
        style={{ minHeight: '100dvh' }}
      >
        <div className="max-w-screen-xl mx-auto w-full">
          {/* Name — massive, left-aligned */}
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

          {/* One evocative tagline */}
          <p
            className="hero-tagline geist text-on-surface-variant/60 uppercase"
            style={{
              fontSize: '10px',
              letterSpacing: '0.4em',
              visibility: 'hidden',
            }}
          >
            Crafting systems beyond the visible horizon
          </p>
        </div>

        {/* Scroll hint */}
        <div
          className="hero-scroll absolute bottom-10 right-10 geist text-[10px] tracking-[0.25em] text-on-surface-variant"
          style={{ visibility: 'hidden', writingMode: 'vertical-rl' }}
        >
          SCROLL ↓
        </div>
      </div>
    </section>
  );
}
