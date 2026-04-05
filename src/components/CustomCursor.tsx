import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Custom cursor with mix-blend-mode: difference.
 * A small dot + trailing ring that grows on interactive elements.
 * Only renders on devices with a fine pointer (desktop).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only show on desktop (fine pointer)
    if (!window.matchMedia('(pointer: fine)').matches) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    // Hide initially until first move
    gsap.set([dot, ring], { opacity: 0 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        duration: 0.15,
        ease: 'power2.out',
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .magnetic-btn, .progress-dot')) {
        gsap.to(ring, { scale: 1.8, opacity: 0.5, duration: 0.4, ease: 'power2.out' });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      }
    };

    const handleLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .magnetic-btn, .progress-dot')) {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleEnter);
    window.addEventListener('mouseout', handleLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleEnter);
      window.removeEventListener('mouseout', handleLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: 8,
          height: 8,
          background: '#FFFFFF',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          zIndex: 10000,
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: 32,
          height: 32,
          border: '1.2px solid rgba(255,255,255,0.7)',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          zIndex: 9999,
        }}
      />
    </>
  );
}
