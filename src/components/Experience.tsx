import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReveal } from '../hooks/useReveal';

gsap.registerPlugin(ScrollTrigger);

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

  useGSAP(() => {
    if (!timelineRef.current) return;

    // Scrub-animate the timeline progress line
    gsap.fromTo('.timeline-progress',
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
      }
    );

    // Animate each dot's border when scroll reaches it
    gsap.utils.toArray<HTMLElement>('.timeline-dot').forEach((dot) => {
      gsap.to(dot, {
        borderColor: 'var(--color-ink)',
        duration: 0.3,
        scrollTrigger: {
          trigger: dot,
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Stagger each experience entry from the left
    gsap.utils.toArray<HTMLElement>('.timeline-entry').forEach((entry) => {
      gsap.fromTo(entry,
        { autoAlpha: 0, x: -30 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  });

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

          {/* Vertical line - Animated Progress (Black) — GSAP scrub-driven */}
          <div
            className="timeline-progress absolute top-2 w-px bg-ink"
            style={{ left: '8px', height: '0%' }}
          />

          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="timeline-entry relative pl-10 md:pl-12"
                style={{ visibility: 'hidden' }}
              >
                {/* Timeline dot */}
                <div
                  className="timeline-dot absolute top-1.5 w-[17px] h-[17px] rounded-full border-2 border-border bg-bone z-10"
                  style={{ left: '0px' }}
                />

                <div>
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
            <div className="relative pl-10 md:pl-12 pt-4">
              <div
                className="timeline-dot absolute top-1.5 w-[17px] h-[17px] rounded-full border-2 border-border bg-bone z-10"
                style={{ left: '0px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
