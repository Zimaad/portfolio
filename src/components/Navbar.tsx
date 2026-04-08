import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        if (self.direction === -1) {
          gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.out' });
        } else if (self.scroll() > 100) {
          gsap.to(navRef.current, { y: -100, duration: 0.3, ease: 'power2.in' });
        }
      },
    });
  });

  return (
    <header 
      ref={navRef}
      className="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-6 bg-transparent backdrop-blur-md"
    >
      <div className="text-xl font-bold tracking-tighter cormorant text-neutral-50 uppercase">ZIMAAD</div>
      
      <nav className="hidden md:flex gap-12">
        <a className="text-neutral-50 border-b-2 border-neutral-50 pb-1 geist all-caps tracking-[0.2em] text-[10px] hover:text-neutral-200 transition-colors duration-300" href="#projects">PROJECTS</a>
        <a className="text-neutral-400 font-medium geist all-caps tracking-[0.2em] text-[10px] hover:text-neutral-200 transition-colors duration-300" href="#skills">SKILLS</a>
        <a className="text-neutral-400 font-medium geist all-caps tracking-[0.2em] text-[10px] hover:text-neutral-200 transition-colors duration-300" href="#experience">EXPERIENCE</a>
        <a className="text-neutral-400 font-medium geist all-caps tracking-[0.2em] text-[10px] hover:text-neutral-200 transition-colors duration-300" href="#contact">CONTACT</a>
        <a className="text-neutral-400 font-medium geist all-caps tracking-[0.2em] text-[10px] hover:text-neutral-200 transition-colors duration-300" href="/resume.pdf" target="_blank" rel="noopener noreferrer">RESUME</a>
      </nav>

      <button className="text-neutral-50 active:scale-95 duration-200">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}
