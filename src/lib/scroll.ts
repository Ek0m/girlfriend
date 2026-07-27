import { useLayoutEffect, useRef, type DependencyList } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Matches the brief's cubic-bezier(.22,1,.36,1) exactly for the bloom + reveals.
CustomEase.create('sunflowerBloom', '.22,1,.36,1');

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

type RevealBuilder<T extends HTMLElement> = (root: T, reduced: boolean) => void;

/**
 * Scopes a GSAP timeline/ScrollTrigger build to a section's root element and
 * re-runs it per prefers-reduced-motion branch via gsap.matchMedia. Cleanup
 * (ctx.revert equivalent) happens automatically on unmount.
 */
export function useGsapReveal<T extends HTMLElement>(
  build: RevealBuilder<T>,
  deps: DependencyList = [],
) {
  const rootRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add(
      {
        reduced: '(prefers-reduced-motion: reduce)',
        full: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };
        build(root, reduced);
      },
    );

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}

export { gsap, ScrollTrigger };
