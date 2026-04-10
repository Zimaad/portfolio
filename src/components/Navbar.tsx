import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  // Handle hash scroll on route change
  useEffect(() => {
    if (pathname === '/' && hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname, hash]);

  // Global scroll trigger for nav hide/show
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

  // Mobile menu animation logic
  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 0.8,
        ease: 'power4.inOut',
      });
      gsap.fromTo('.mobile-link', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.6,
        ease: 'power4.inOut',
      });
    }
  }, { dependencies: [isOpen], scope: menuRef });

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      if (pathname === '/') {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home then the hash will be handled by useEffect
        navigate('/' + href);
      }
      closeMenu();
    }
  };

  const navItems = [
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
    { label: 'RESUME', href: '/resume.pdf', external: true },
  ];

  return (
    <>
      <header 
        ref={navRef}
        className="fixed top-0 w-full z-[100] flex justify-between items-center px-6 md:px-10 py-6 bg-transparent backdrop-blur-md"
      >
        <Link to="/" className="text-xl font-bold tracking-tighter cormorant text-neutral-50 uppercase cursor-pointer">ZIMAAD</Link>
        
        <nav className="hidden md:flex gap-12">
          {navItems.map((item) => (
            item.external ? (
              <a 
                key={item.label}
                className="text-neutral-400 font-medium geist all-caps tracking-[0.2em] text-[10px] hover:text-neutral-50 transition-colors duration-300" 
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <a 
                key={item.label}
                className="text-neutral-400 font-medium geist all-caps tracking-[0.2em] text-[10px] hover:text-neutral-50 transition-colors duration-300 cursor-pointer" 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            )
          ))}
        </nav>

        <button 
          onClick={toggleMenu}
          className="md:hidden text-neutral-50 active:scale-95 duration-200 flex items-center justify-center relative z-[101]"
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className={`fixed inset-0 bg-neutral-950 z-[90] flex flex-col items-center justify-center md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ clipPath: 'circle(0% at 100% 0%)' }}
      >
        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            item.external ? (
              <a 
                key={item.label}
                className="mobile-link text-3xl font-bold cormorant text-neutral-50 tracking-tighter hover:text-neutral-400 transition-colors"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <a 
                key={item.label}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  closeMenu();
                }}
                className="mobile-link text-3xl font-bold cormorant text-neutral-50 tracking-tighter hover:text-neutral-400 transition-colors cursor-pointer"
                href={item.href}
              >
                {item.label}
              </a>
            )
          ))}
        </nav>
      </div>
    </>
  );
}
