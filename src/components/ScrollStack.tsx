import React, { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  /** vertical gap between stacked card edges */
  itemDistance?: number;
  /** how much each deeper card shrinks relative to the one in front */
  itemScale?: number;
  /** downward offset between stacked cards (creates the deck look) */
  itemStackDistance?: number;
  /** how far down the viewport the deck starts (CSS % of height) */
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

/**
 * "Descent" scroll stack — each card pins at the top of the viewport and then
 * falls one-per-page toward the bottom of the section as the user scrolls,
 * like descending into the depths. The front card is always the active one.
 */
const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 20,
  itemScale = 0.035,
  itemStackDistance = 30,
  stackPosition = '12%',
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const initialTopsRef = useRef<number[]>([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'number' ? value : parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
      };
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const pageHeight = containerHeight; // one full viewport per card = "by each page"
    const bottomInset = containerHeight * 0.16;
    const travel = containerHeight - stackPositionPx - bottomInset; // distance it falls

    const sectionTop = initialTopsRef.current[0] || 0;
    const sectionAnchor = sectionTop - stackPositionPx;
    const n = cardsRef.current.length;

    let activeIndex = -1;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardTop = initialTopsRef.current[i] || 0;

      // This card's descent happens within its own full page of scroll
      const pageStart = sectionAnchor + i * pageHeight;
      const pageEnd = sectionAnchor + (i + 1) * pageHeight;
      const pageProgress = calculateProgress(scrollTop, pageStart, pageEnd);

      // Pin the card to the top deck area regardless of scroll, then fall
      const basePin = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      const translateY = basePin + pageProgress * travel;

      // Shrink slightly as it falls into the depths
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - pageProgress * (1 - targetScale);

      const rotation = rotationAmount ? i * rotationAmount * pageProgress : 0;
      const blur = pageProgress * (blurAmount || 1.5);
      const brightness = 1 - pageProgress * 0.32;

      if (pageProgress > 0 && pageProgress < 1) activeIndex = i;

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
        brightness: Math.round(brightness * 100) / 100,
        glow: Math.round(pageProgress * 40),
      };

      const last = lastTransformsRef.current.get(i);
      const hasChanged =
        !last ||
        Math.abs(last.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(last.scale - newTransform.scale) > 0.001 ||
        Math.abs(last.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(last.blur - newTransform.blur) > 0.1 ||
        Math.abs(last.brightness - newTransform.brightness) > 0.01 ||
        Math.abs(last.glow - newTransform.glow) > 1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = `blur(${newTransform.blur}px) brightness(${newTransform.brightness})`;
        card.style.boxShadow = `0 ${newTransform.glow}px ${newTransform.glow * 1.6}px rgba(196,30,58,${Math.min(
          0.5,
          newTransform.glow * 0.012
        )})`;
        lastTransformsRef.current.set(i, newTransform);
      }

      // Last card finishing its fall = the stack descent is complete
      if (i === n - 1) {
        const complete = pageProgress >= 1;
        if (complete && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!complete && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    // Front (active, falling) card is always on top
    cardsRef.current.forEach((card, i) => {
      card.style.zIndex = i === activeIndex ? '100' : `${n - i}`;
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    const cards = Array.from(
      document.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;

    // Record static natural top positions before any transforms are applied
    initialTopsRef.current = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    cards.forEach((card, i) => {
      card.style.zIndex = `${cards.length - i}`;
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter, box-shadow';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.perspective = '1000px';
    });

    // Runway so every card gets a full page of scroll to descend
    const inner = scrollerRef.current?.querySelector('.scroll-stack-inner');
    if (inner) {
      (inner as HTMLElement).style.paddingBottom = `${cards.length * 100}vh`;
    }

    setupLenis();
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      initialTopsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
