import { useReveal } from '../hooks/useReveal';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const revealRef = useReveal();

  return (
    <section
      id="contact"
      ref={revealRef}
      className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 bg-transparent border-t border-border"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="reveal text-muted font-medium mb-8"
          style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          Contact
        </p>

        <h2 className="reveal font-serif text-4xl sm:text-5xl md:text-7xl text-ink leading-none tracking-tight mb-8">
          Let's work together
        </h2>

        <p className="reveal text-muted text-lg md:text-xl font-light mb-14 max-w-lg mx-auto leading-relaxed">
          Have a project in mind or just want to say hello? Reach out.
        </p>

        {/* Magnetic CTA button */}
        <div className="reveal mb-14">
          <MagneticButton strength={0.35}>
            <a
              href="mailto:zimaad.azhari@gmail.com"
              className="inline-flex items-center gap-3 bg-ink text-bone px-8 py-4 rounded-lg font-medium hover:opacity-85 active:scale-[0.98] transition-all duration-300"
              style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Get in touch
              <span className="text-base">&#8599;</span>
            </a>
          </MagneticButton>
        </div>

        {/* Social links */}
        <div className="reveal flex items-center justify-center gap-8">
          <MagneticButton strength={0.25}>
            <a
              href="https://linkedin.com/in/zimaad"
              className="text-muted hover:text-ink transition-colors duration-300"
              style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </MagneticButton>
          <span className="w-px h-3 bg-border" />
          <MagneticButton strength={0.25}>
            <a
              href="https://github.com/Zimaad"
              className="text-muted hover:text-ink transition-colors duration-300"
              style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-28 pt-8 border-t border-border text-center">
        <p className="text-muted/50 text-xs tracking-wide">
          &copy; 2026. All rights reserved.
        </p>
      </div>
    </section>
  );
}
