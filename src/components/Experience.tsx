import { useState, useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

const experiences = [
  {
    company: 'UrbanTech Services LLP',
    role: 'Fullstack Developer Intern',
    date: 'June 2025 — Present',
    points: [
      'Built PREX, a procurement and quotation automation tool, improving operational visibility with a React-based real-time order analytics dashboard.',
      'Integrated OpenAI, Microsoft Graph, DHL, and FedEx APIs with a Firebase backend for AI email processing, secure data management, and live shipment tracking.',
      'Reduced manual order and sales tracking effort by approximately 70%.',
    ],
  },
  {
    company: 'TSB Enterprises',
    role: 'Web Developer (Client Project)',
    date: 'Dec 2025',
    points: [
      'Developed a Django-based booking platform with Razorpay payments, QR code generation, and automated booking lifecycle management.',
      'Built a role-based staff portal with verification workflows and integrated MongoDB (Djongo) for complex state handling.',
      'Deployed using Docker with Cloudinary CDN and MongoDB Atlas.',
    ],
  },
];

export default function Experience() {
  const revealRef = useReveal();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the timeline has crossed the center point of the screen
      const startTrigger = rect.top - windowHeight * 0.5;
      const totalHeight = rect.height;
      const progress = Math.min(Math.max(-startTrigger / totalHeight, 0), 1);
      
      setScrollProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" ref={revealRef} className="py-32 md:py-40 px-6 md:px-12 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <p
          className="reveal text-muted font-medium mb-12"
          style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          Experience
        </p>

        <h2 className="reveal font-serif text-4xl md:text-5xl text-ink leading-tight tracking-tight mb-16">
          Where I've worked
        </h2>

        {/* Timeline container */}
        <div className="relative" ref={timelineRef}>
          {/* Vertical line - Background (Gray) */}
          <div
            className="absolute top-2 bottom-2 w-px bg-border"
            style={{ left: '8px' }}
          />

          {/* Vertical line - Animated Progress (Black) */}
          <div
            className="absolute top-2 w-px bg-ink transition-all duration-150 ease-out"
            style={{ 
              left: '8px', 
              height: `${scrollProgress}%`,
              opacity: scrollProgress > 0 ? 1 : 0 
            }}
          />

          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="reveal relative pl-10 md:pl-12"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute top-1.5 w-[17px] h-[17px] rounded-full border-2 border-border bg-bone z-10"
                  style={{ 
                    left: '0px',
                    borderColor: scrollProgress > (index / experiences.length) * 100 + 5 ? 'var(--color-ink)' : 'var(--color-border)'
                  }}
                />

                <div className="transition-all duration-500">
                  {/* Date */}
                  <p
                    className="text-muted font-medium mb-1.5"
                    style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    {exp.date}
                  </p>

                  {/* Company */}
                  <h3 className="font-serif text-2xl md:text-3xl text-ink mb-1">
                    {exp.company}
                  </h3>

                  {/* Role */}
                  <p className="text-accent text-sm font-medium mb-5">
                    {exp.role}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="text-muted text-sm leading-relaxed font-light flex items-start gap-3"
                      >
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-border flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Final Closing Dot */}
            <div 
              className="reveal relative pl-10 md:pl-12 pt-4"
              style={{ transitionDelay: `${experiences.length * 120}ms` }}
            >
              <div
                className="absolute top-1.5 w-[17px] h-[17px] rounded-full border-2 border-border bg-bone z-10"
                style={{ 
                  left: '0px',
                  borderColor: scrollProgress >= 100 ? 'var(--color-ink)' : 'var(--color-border)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
