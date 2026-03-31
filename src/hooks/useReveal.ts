import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP-powered scroll reveal hook.
 * Replaces the old IntersectionObserver approach with ScrollTrigger.batch
 * for staggered, buttery-smooth reveal animations.
 */
export function useReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = gsap.utils.toArray<HTMLElement>('.reveal', containerRef.current);
    if (elements.length === 0) return;

    ScrollTrigger.batch(elements, {
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            overwrite: true,
          }
        );
      },
      start: 'top 88%',
    });
  }, { scope: containerRef });

  return containerRef;
}
