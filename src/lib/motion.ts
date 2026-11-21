// Motion helpers shared by the whole site.
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// True when the visitor has asked their system for less motion.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A stagger delay for item number i in a group: 70ms apart, so a row arrives as a wave, not all at once.
export const stagger = (i: number, step = 70) => ({ transitionDelay: `${i * step}ms` });

/**
 * focusSmoothly: glides the page so the element sits in the middle of the screen, then focuses it.
 * A plain focus() would jump the page instantly; with less motion turned on it still jumps.
 */
export function focusSmoothly(el: HTMLElement | null | undefined) {
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
  el.focus({ preventScroll: true });
}

// Scene states. "idle": waiting off screen (hidden start). "play": running. "static": finished, no motion.
export type Play = 'idle' | 'play' | 'static';

/**
 * usePlayOnView: for the "Who it's for" scenes. Returns a ref for the scene and its state.
 * Plays when a good part of the scene is on screen, resets once it is fully off screen,
 * so it replays every time it comes back. With less motion asked for, it stays finished.
 */
export function usePlayOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [play, setPlay] = useState<Play>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setPlay('static');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) setPlay('play');
        else if (!entry.isIntersecting) setPlay('idle');
      },
      { threshold: [0, 0.4] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, play };
}

// Animation delay in seconds, for scene parts.
export const at = (s: number) => ({ animationDelay: `${s.toFixed(2)}s` });

/**
 * useScrollReveal: finds every element marked data-reveal on the current page and
 * adds "is-visible" the first time it scrolls into view. Each element reveals once.
 */
export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));
    // Old browsers without IntersectionObserver: just show everything.
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      // Reveal a little before the element is fully in view, so nothing ever waits on screen.
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

/**
 * useRouteChange: runs when the visitor moves to another page (not on the first load).
 * It jumps to the top of the new page, or to its #section, and moves keyboard focus to the
 * main content so screen readers start reading the new page.
 * Returns true once the visitor has moved to a different page, so the page-change fade
 * never plays on the first load or when only the #section changes.
 */
export function useRouteChange() {
  const { pathname, hash } = useLocation();
  const firstPath = useRef(pathname);
  const moved = useRef(false);
  if (pathname !== firstPath.current) moved.current = true;

  useEffect(() => {
    if (!moved.current || hash) return;
    // Instant, not smooth: a new page should start at its top, not scroll there.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return moved.current;
}
