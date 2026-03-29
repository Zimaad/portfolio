import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ${
        scrolled
          ? 'bg-bone/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo / Name */}
        <a
          href="#hero"
          className="font-serif text-xl md:text-2xl text-ink tracking-tight transition-opacity duration-300 hover:opacity-60"
        >
          Zimaad Azhari
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted hover:text-ink transition-colors duration-300"
              style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 relative w-8 h-8 items-center justify-center"
          aria-label="Toggle navigation menu"
          id="nav-toggle"
        >
          <span
            className={`block w-5 h-px bg-ink transition-all duration-500 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[3px]' : ''
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
          <span
            className={`block w-5 h-px bg-ink transition-all duration-500 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[4px]' : ''
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-600 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="px-6 pb-8 pt-2 bg-bone/95 backdrop-blur-xl border-t border-border">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-muted hover:text-ink transition-all duration-500"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
