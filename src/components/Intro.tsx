import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const introRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    /* ─── Phase 1: Stagger in the intro lines ─── */
    tl.fromTo(
      '.intro-line-inner',
      { y: '110%' },
      {
        y: '0%',
        duration: 1,
        stagger: 0.12,
        ease: 'expo.out',
      },
      0.4
    );

    /* Fade in the subtitle */
    tl.fromTo(
      '.intro-subtitle',
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    );

    /* Fade in the role tags */
    tl.fromTo(
      '.intro-tag',
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    /* Animate the horizontal rule expanding */
    tl.fromTo(
      '.intro-rule',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'expo.out' },
      '-=0.6'
    );

    /* Hold for a moment so the user reads */
    tl.to({}, { duration: 0.6 });

    /* ─── Phase 2: Exit — curtains split vertically ─── */
    tl.to('.intro-line-inner', {
      y: '-110%',
      duration: 0.6,
      stagger: 0.04,
      ease: 'expo.in',
    });

    tl.to(
      '.intro-subtitle, .intro-tag, .intro-rule',
      { autoAlpha: 0, duration: 0.3, ease: 'power2.in' },
      '<'
    );

    /* Split the two curtain panels apart */
    tl.to('.intro-curtain-left', {
      yPercent: -100,
      duration: 0.9,
      ease: 'expo.inOut',
    }, '-=0.1');

    tl.to(
      '.intro-curtain-right',
      {
        yPercent: 100,
        duration: 0.9,
        ease: 'expo.inOut',
      },
      '<'
    );

    /* Fade out the whole overlay so it's gone */
    tl.to(introRef.current, {
      autoAlpha: 0,
      duration: 0.01,
    });
  }, { scope: introRef });

  return (
    <div
      ref={introRef}
      className="intro-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {/* Top curtain panel */}
      <div
        className="intro-curtain-left"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: '#0a0a0a',
        }}
      />

      {/* Bottom curtain panel */}
      <div
        className="intro-curtain-right"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: '#0a0a0a',
        }}
      />

      {/* Centered content (sits above both panels) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '2rem',
          zIndex: 2,
        }}
      >
        {/* Name — large staggered reveal */}
        <h1
          className="cormorant"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 9rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            fontWeight: 300,
            color: '#fff',
            textAlign: 'center',
            margin: 0,
          }}
        >
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span className="intro-line-inner" style={{ display: 'block' }}>
              Zimaad
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span
              className="intro-line-inner"
              style={{ display: 'block', opacity: 0.4, fontStyle: 'italic' }}
            >
              Azhari
            </span>
          </span>
        </h1>

        {/* Thin horizontal rule */}
        <div
          className="intro-rule"
          style={{
            width: 'clamp(60px, 12vw, 120px)',
            height: '1px',
            background: 'rgba(255,255,255,0.2)',
            transformOrigin: 'center',
          }}
        />

        {/* Subtitle */}
        <p
          className="intro-subtitle geist"
          style={{
            fontSize: '10px',
            letterSpacing: '0.45em',
            color: 'rgba(255,255,255,0.45)',
            textTransform: 'uppercase',
            visibility: 'hidden',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Portfolio — 2026
        </p>

        {/* Role tags */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(0.8rem, 2vw, 1.5rem)',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '0.5rem',
          }}
        >
          {['Fullstack Architect', 'Designer', 'Builder'].map((tag) => (
            <span
              key={tag}
              className="intro-tag geist"
              style={{
                fontSize: '9px',
                letterSpacing: '0.3em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '6px 14px',
                visibility: 'hidden',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
