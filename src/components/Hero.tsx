import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const nameText = 'Zimaad Azhari';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    // Eyebrow
    tl.fromTo('.hero-eyebrow',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Name characters slide up from overflow-hidden mask
    tl.fromTo('.hero-char',
      { y: '110%' },
      { y: '0%', duration: 0.7, stagger: 0.035, ease: 'expo.out' },
      '-=0.3'
    );

    // Tagline
    tl.fromTo('.hero-tagline',
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );

    // Description
    tl.fromTo('.hero-desc',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
  }, { scope: heroRef });

  const words = nameText.split(' ');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex flex-col justify-center px-6 md:px-12"
      style={{ minHeight: '100dvh', background: 'transparent' }}
    >
      <div className="max-w-6xl mx-auto w-full pt-24">
        {/* Eyebrow */}
        <p
          className="hero-eyebrow text-muted mb-6 font-sans font-medium"
          style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', visibility: 'hidden' }}
        >
          Designer &amp; Developer
        </p>

        {/* Main heading — character-split animation */}
        <h1 className="font-serif text-ink leading-none tracking-tight mb-8 text-5xl sm:text-7xl md:text-8xl lg:text-[7rem]">
          {words.map((word, wIdx) => (
            <span key={wIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {word.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
                >
                  <span className="hero-char" style={{ display: 'inline-block' }}>
                    {char}
                  </span>
                </span>
              ))}
              {wIdx < words.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
          <br />
          <span className="hero-tagline text-muted italic" style={{ visibility: 'hidden' }}>
            Architecting and building scalable software.
          </span>
        </h1>

        {/* Short intro */}
        <p
          className="hero-desc text-muted text-lg md:text-xl max-w-xl leading-relaxed font-light"
          style={{ visibility: 'hidden' }}
        >
          I'm Zimaad, a Fullstack and AI developer building AI code visualization tools and high-performance applications that bridge software and finance.
        </p>
      </div>
    </section>
  );
}
