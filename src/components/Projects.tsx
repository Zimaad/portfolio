import { useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Hiatus',
    description:
      'Multi-agent research intelligence platform that autonomously identifies structural gaps in academic literature. Built with a LangGraph-orchestrated neural core to crawl, analyze, and synthesize complex research clusters.',
    techStack: ['Next.js 16', 'LangGraph', 'FastAPI', 'Llama 3.3', 'Firebase', 'Tailwind v4'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'CodeLens',
    description:
      'AI Codebase Visualization & Chat Platform. Architected a repository analysis tool with an interactive D3.js dependency graph and real-time AI code intelligence.',
    techStack: ['React 19', 'Vite', 'Tailwind v4', 'D3.js', 'LangChain'],
    githubUrl: 'https://github.com/Zimaad/codelens',
    liveUrl: 'https://codelens-two.vercel.app/#',
  },
  {
    title: 'Echonote',
    description:
      'AI-Powered Meeting Productivity Platform. Engineered a cross-platform automation engine with real-time transcription, speaker diarization, and automated report generation.',
    techStack: ['Next.js 15', 'Electron', 'Gemini AI', 'Whisper', 'Pyannote.audio'],
    githubUrl: '#',
    liveUrl: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isLockedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const scrollAccRef = useRef(0);
  const cooldownRef = useRef(false);
  const lastScrollY = useRef(0);

  const SCROLL_THRESHOLD = 60;

  const updateIndicators = useCallback((idx: number) => {
    if (counterRef.current) {
      counterRef.current.textContent = String(idx + 1).padStart(2, '0');
    }
    document.querySelectorAll('#projects .progress-dot').forEach((dot, i) => {
      gsap.to(dot, {
        backgroundColor: i === idx ? 'var(--color-ink)' : 'var(--color-border)',
        scale: i === idx ? 1.5 : 1,
        duration: 0.3,
      });
    });
  }, []);

  const resetToSlide = useCallback((idx: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const slides = section.querySelectorAll('.project-slide');
    slides.forEach((slide, i) => {
      if (i === idx) {
        gsap.set(slide, { xPercent: 0, autoAlpha: 1, scale: 1 });
      } else if (i < idx) {
        gsap.set(slide, { xPercent: -110, autoAlpha: 0, scale: 0.88 });
      } else {
        gsap.set(slide, { xPercent: 110, autoAlpha: 0, scale: 0.88 });
      }
    });
    activeIndexRef.current = idx;
    updateIndicators(idx);
  }, [updateIndicators]);

  const goToSlide = useCallback((newIndex: number, direction: 'next' | 'prev') => {
    if (isAnimatingRef.current || !sectionRef.current) return;
    isAnimatingRef.current = true;

    const slides = sectionRef.current.querySelectorAll('.project-slide');
    const fromSlide = slides[activeIndexRef.current] as HTMLElement;
    const toSlide = slides[newIndex] as HTMLElement;

    const exitX = direction === 'next' ? -110 : 110;
    const enterX = direction === 'next' ? 110 : -110;

    gsap.set(toSlide, { xPercent: enterX, autoAlpha: 0, scale: 0.88 });

    gsap.to(fromSlide, {
      xPercent: exitX,
      scale: 0.88,
      autoAlpha: 0,
      duration: 0.65,
      ease: 'power3.inOut',
    });

    gsap.to(toSlide, {
      xPercent: 0,
      scale: 1,
      autoAlpha: 1,
      duration: 0.65,
      ease: 'power3.inOut',
      onComplete: () => {
        activeIndexRef.current = newIndex;
        isAnimatingRef.current = false;
        scrollAccRef.current = 0;
        updateIndicators(newIndex);
      },
    });
  }, [updateIndicators]);

  // GSAP: set initial slide states + header reveal
  useGSAP(() => {
    if (!sectionRef.current) return;
    const slides = gsap.utils.toArray<HTMLElement>('.project-slide');
    gsap.set(slides[0], { xPercent: 0, autoAlpha: 1, scale: 1 });
    slides.slice(1).forEach((s) => gsap.set(s, { xPercent: 110, autoAlpha: 0, scale: 0.88 }));

    gsap.fromTo('.projects-header',
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1, y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  // Scroll-lock + wheel-driven carousel + mobile touch support
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let touchStartY = 0;

    const lock = () => {
      if (isLockedRef.current || cooldownRef.current) return;
      // Snap section to viewport top
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
      isLockedRef.current = true;
      scrollAccRef.current = 0;
      document.documentElement.style.overflow = 'hidden';
      // On mobile, also disable body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    };

    const unlock = () => {
      if (!isLockedRef.current) return;
      isLockedRef.current = false;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      cooldownRef.current = true;
      setTimeout(() => { cooldownRef.current = false; }, 800);
    };

    // Detect when section enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !cooldownRef.current) {
          const scrollingDown = window.scrollY >= lastScrollY.current;
          if (scrollingDown && activeIndexRef.current === 0) {
            resetToSlide(0);
            lock();
          } else if (!scrollingDown && activeIndexRef.current === projects.length - 1) {
            resetToSlide(projects.length - 1);
            lock();
          }
        }
      },
      { threshold: [0.5] }
    );
    observer.observe(section);

    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isLockedRef.current) return;
      e.preventDefault();
      if (isAnimatingRef.current) return;

      scrollAccRef.current += e.deltaY;

      if (scrollAccRef.current > SCROLL_THRESHOLD) {
        if (activeIndexRef.current < projects.length - 1) {
          goToSlide(activeIndexRef.current + 1, 'next');
        } else {
          unlock();
        }
        scrollAccRef.current = 0;
      } else if (scrollAccRef.current < -SCROLL_THRESHOLD) {
        if (activeIndexRef.current > 0) {
          goToSlide(activeIndexRef.current - 1, 'prev');
        } else {
          unlock();
        }
        scrollAccRef.current = 0;
      }
    };

    // Mobile touch events
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isLockedRef.current) return;
      e.preventDefault();
      if (isAnimatingRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      // Only respond to vertical swipes or primary delta
      if (Math.abs(deltaY) > 30) {
        if (deltaY > SCROLL_THRESHOLD) {
          if (activeIndexRef.current < projects.length - 1) {
            goToSlide(activeIndexRef.current + 1, 'next');
          } else {
            unlock();
          }
          touchStartY = touchY; // Reset to avoid double triggers
        } else if (deltaY < -SCROLL_THRESHOLD) {
          if (activeIndexRef.current > 0) {
            goToSlide(activeIndexRef.current - 1, 'prev');
          } else {
            unlock();
          }
          touchStartY = touchY;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [goToSlide, resetToSlide]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-[100dvh] bg-transparent flex flex-col justify-center items-center px-6 md:px-12 py-20"
    >
      {/* Header row */}
      <div className="projects-header w-full max-w-3xl flex items-end justify-between mb-12" style={{ visibility: 'hidden' }}>
        <div>
          <p
            className="text-muted font-medium mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            Projects
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight tracking-tight">
            Selected work
          </h2>
        </div>

      </div>

      {/* Carousel Wrapper — no overflow-hidden so arrows can hang off the sides */}
      <div className="relative w-full max-w-3xl min-h-[480px] md:min-h-[400px]">
        {/* Navigation Arrows */}
        <button
          onClick={() => {
            const prevIdx = activeIndexRef.current > 0 ? activeIndexRef.current - 1 : projects.length - 1;
            goToSlide(prevIdx, 'prev');
          }}
          className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full border border-border text-muted hover:text-ink hover:border-ink transition-all duration-400 bg-bone/80 backdrop-blur-md opacity-60 hover:opacity-100 shadow-sm"
          aria-label="Previous project"
        >
          <span className="text-xl md:text-2xl">&#8592;</span>
        </button>
        <button
          onClick={() => {
            const nextIdx = activeIndexRef.current < projects.length - 1 ? activeIndexRef.current + 1 : 0;
            goToSlide(nextIdx, 'next');
          }}
          className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full border border-border text-muted hover:text-ink hover:border-ink transition-all duration-400 bg-bone/80 backdrop-blur-md opacity-60 hover:opacity-100 shadow-sm"
          aria-label="Next project"
        >
          <span className="text-xl md:text-2xl">&#8594;</span>
        </button>

        {/* Clipped Slides Container — specifically for the sliding animation */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-bone/40 backdrop-blur-sm group">
          {projects.map((project, i) => (
            <div key={i} className="project-slide absolute inset-0 flex items-center">
              <div className="w-full h-full p-8 md:p-10 flex flex-col justify-center">
                <h3 className="font-serif text-3xl md:text-4xl text-ink mb-4 leading-snug">
                  {project.title}
                </h3>

                <p className="text-muted text-base md:text-lg leading-relaxed mb-8 max-w-xl font-light">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-accent bg-accent-light px-3 py-1.5 rounded-full font-medium"
                      style={{ fontSize: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  <a
                    href={project.githubUrl}
                    className="text-muted hover:text-ink transition-colors duration-300 inline-flex items-center gap-1.5 group"
                    style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">&#8599;</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    className="text-muted hover:text-ink transition-colors duration-300 inline-flex items-center gap-1.5 group"
                    style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">&#8599;</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-4 mt-10">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === activeIndexRef.current || isAnimatingRef.current) return;
              goToSlide(i, i > activeIndexRef.current ? 'next' : 'prev');
            }}
            className="progress-dot rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: 10,
              height: 10,
              padding: 0,
              border: 'none',
              backgroundColor: i === activeIndexRef.current ? 'var(--color-ink)' : 'var(--color-border)',
            }}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
