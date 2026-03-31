import { useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'CodeLens',
    description:
      'AI Codebase Visualization & Chat Platform. Architected a repository analysis tool with an interactive D3.js dependency graph and real-time AI code intelligence.',
    techStack: ['React 19', 'Vite', 'Tailwind v4', 'D3.js', 'LangChain'],
    githubUrl: 'https://github.com/Zimaad/codelens',
    liveUrl: 'https://codelens-two.vercel.app/#',
  },
  {
    title: 'Lost & Found',
    description:
      'A full-stack web application enabling students to easily post, search, and manage lost and found items within a secure campus environment.',
    techStack: ['HTML', 'JavaScript', 'Firebase', 'CSS'],
    githubUrl: 'https://github.com/Zimaad/lostandfoundv2',
    liveUrl: 'https://lostnfounddjsce.web.app/',
  },
  {
    title: 'Echonote',
    description:
      'AI-Powered Meeting Productivity Platform. Engineered a cross-platform automation engine with real-time transcription, speaker diarization, and automated Google Slides report generation.',
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

  // Scroll-lock + wheel-driven carousel
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lock = () => {
      if (isLockedRef.current || cooldownRef.current) return;
      // Snap section to viewport top
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'auto' });
      isLockedRef.current = true;
      scrollAccRef.current = 0;
      document.documentElement.style.overflow = 'hidden';
    };

    const unlock = () => {
      if (!isLockedRef.current) return;
      isLockedRef.current = false;
      document.documentElement.style.overflow = '';
      cooldownRef.current = true;
      setTimeout(() => { cooldownRef.current = false; }, 800);
    };

    // Detect when section enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6 && !cooldownRef.current) {
          const scrollingDown = window.scrollY >= lastScrollY.current;
          if (scrollingDown) {
            resetToSlide(0);
          } else {
            resetToSlide(projects.length - 1);
          }
          lock();
        }
      },
      { threshold: [0.6] }
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      document.documentElement.style.overflow = '';
    };
  }, [goToSlide, resetToSlide]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="h-screen bg-transparent flex flex-col justify-center items-center px-6 md:px-12"
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

      {/* Carousel container — overflow hidden clips sliding cards */}
      <div className="relative w-full max-w-3xl overflow-hidden" style={{ minHeight: '340px' }}>
        {projects.map((project, i) => (
          <div key={i} className="project-slide absolute inset-0 flex items-center">
            <div className="w-full border border-border rounded-2xl p-8 md:p-10 bg-bone/50 backdrop-blur-sm relative overflow-hidden">


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

      {/* Progress dots */}
      <div className="flex gap-3 mt-10">
        {projects.map((_, i) => (
          <div
            key={i}
            className="progress-dot rounded-full"
            style={{
              width: 8,
              height: 8,
              backgroundColor: i === 0 ? 'var(--color-ink)' : 'var(--color-border)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
