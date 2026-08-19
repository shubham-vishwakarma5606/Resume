import React, { useEffect, useRef } from 'react';

// Global gothic custom cursor with a trailing comet effect.
// - Core dot tracks the pointer almost instantly ("normal" speed).
// - A ring + a chain of fading embers lag behind, creating a tail motion.
// - Grows and turns crimson when hovering interactive elements.

const TAIL_COUNT = 14;
const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, [role="button"], [data-cursor]';

interface CursorTrailProps {
  color?: string;
  colorHover?: string;
  dotSize?: number;
  ringSize?: number;
}

export const CursorTrail: React.FC<CursorTrailProps> = ({
  color = '#E8DFD8',
  colorHover = '#C41E3A',
  dotSize = 6,
  ringSize = 34,
}) => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const tailRef = useRef<(HTMLDivElement | null)[]>([]);
  const pointsRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TAIL_COUNT + 1 }, () => ({ x: -100, y: -100 }))
  );
  const rafRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return; // keep native cursor on touch devices

    const onMove = (e: MouseEvent) => {
      // Core point follows the cursor exactly = normal, responsive speed
      pointsRef.current[0].x = e.clientX;
      pointsRef.current[0].y = e.clientY;

      const target = e.target as HTMLElement;
      const hovering = !!target.closest?.(INTERACTIVE_SELECTOR);
      if (hoveringRef.current !== hovering) {
        hoveringRef.current = hovering;
        if (dotRef.current) {
          dotRef.current.style.width = hovering ? `${dotSize + 4}px` : `${dotSize}px`;
          dotRef.current.style.height = hovering ? `${dotSize + 4}px` : `${dotSize}px`;
          dotRef.current.style.backgroundColor = hovering ? colorHover : color;
        }
        if (ringRef.current) {
          ringRef.current.style.width = hovering ? `${ringSize + 14}px` : `${ringSize}px`;
          ringRef.current.style.height = hovering ? `${ringSize + 14}px` : `${ringSize}px`;
          ringRef.current.style.borderColor = hovering
            ? 'rgba(196,30,58,0.75)'
            : 'rgba(196,30,58,0.45)';
          ringRef.current.style.opacity = hovering ? '0.9' : '0.55';
        }
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovering = !!target.closest?.(INTERACTIVE_SELECTOR);
      if (hoveringRef.current !== hovering) {
        hoveringRef.current = hovering;
        if (dotRef.current) {
          dotRef.current.style.width = hovering ? `${dotSize + 4}px` : `${dotSize}px`;
          dotRef.current.style.height = hovering ? `${dotSize + 4}px` : `${dotSize}px`;
          dotRef.current.style.backgroundColor = hovering ? colorHover : color;
        }
        if (ringRef.current) {
          ringRef.current.style.width = hovering ? `${ringSize + 14}px` : `${ringSize}px`;
          ringRef.current.style.height = hovering ? `${ringSize + 14}px` : `${ringSize}px`;
          ringRef.current.style.borderColor = hovering
            ? 'rgba(196,30,58,0.75)'
            : 'rgba(196,30,58,0.45)';
          ringRef.current.style.opacity = hovering ? '0.9' : '0.55';
        }
      }
    };

    const loop = () => {
      // Ease each trailing point toward the point ahead of it (tail lag)
      for (let i = 1; i <= TAIL_COUNT; i++) {
        const prev = pointsRef.current[i - 1];
        const cur = pointsRef.current[i];
        cur.x += (prev.x - cur.x) * 0.28;
        cur.y += (prev.y - cur.y) * 0.28;
      }

      const core = pointsRef.current[0];
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${core.x}px, ${core.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        // ring uses the 2nd point for a subtle soft lag
        const rp = pointsRef.current[1];
        ringRef.current.style.transform = `translate3d(${rp.x}px, ${rp.y}px, 0) translate(-50%, -50%)`;
      }
      for (let i = 0; i < TAIL_COUNT; i++) {
        const p = pointsRef.current[i + 1];
        const el = tailRef.current[i];
        if (el) {
          const fade = (i + 1) / TAIL_COUNT;
          const size = Math.max(2, dotSize * (1 - fade * 0.7));
          el.style.opacity = `${0.55 * (1 - fade * 0.85)}`;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [color, colorHover, dotSize, ringSize]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
      {/* trailing embers */}
      {Array.from({ length: TAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            tailRef.current[i] = el;
          }}
          className="absolute top-0 left-0 rounded-full mix-blend-screen"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            background: 'rgba(196,30,58,0.9)',
            boxShadow: '0 0 10px rgba(196,30,58,0.8)',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* soft lag ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderColor: 'rgba(196,30,58,0.45)',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.25s ease',
          opacity: 0.55,
          willChange: 'transform',
        }}
      />

      {/* core dot — normal speed */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: color,
          boxShadow: '0 0 8px rgba(196,30,58,0.6)',
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.2s ease',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default CursorTrail;
