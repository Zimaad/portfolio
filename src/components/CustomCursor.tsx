import { useEffect, useRef } from 'react';

/**
 * Custom cursor with mix-blend-mode: difference.
 * A single high-end minimal circle that grows on interactive elements.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Only show on desktop (fine pointer)
    if (!window.matchMedia('(pointer: fine)').matches) {
      cursor.style.display = 'none';
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(4)';
    };

    const handleMouseLeave = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Delegate hover listeners to document for dynamic elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .magnetic-btn')) {
        handleMouseEnter();
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .magnetic-btn')) {
        handleMouseLeave();
      }
    };

    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] mix-blend-mode-difference hidden md:block"
      style={{
        width: '20px',
        height: '20px',
        background: '#ffffff',
        borderRadius: '50%',
        top: 0,
        left: 0,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.15s ease-out',
        mixBlendMode: 'difference'
      }}
    />
  );
}

