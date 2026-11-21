// BackToTop: a floating button that returns to the top of the long landing page.
// It appears once the visitor has scrolled past most of the first screen, and is not in the
// tab order while hidden. Near the footer it rises to sit level with the MŪLA logo, so the two
// share one line and the button never covers the footer links. Motion follows the reduce-motion setting.
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  // Extra bottom offset while the footer logo is on screen; null means the normal position.
  const [dock, setDock] = useState<number | null>(null);

  // One passive, once-per-frame update for both the show/hide state and the footer docking.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.8);

      // Line the button's centre up with the footer logo's centre. The logo is the footer's
      // home link, so no extra markup is needed. When the logo is off screen, use the normal spot.
      const base = window.matchMedia('(min-width: 640px)').matches ? 24 : 16;
      const logo = document.querySelector('footer a[aria-label="MŪLA home"]');
      const rect = logo?.getBoundingClientRect();
      const centre = rect ? rect.top + rect.height / 2 : Infinity;
      const next =
        centre > 24 && centre < window.innerHeight
          ? Math.max(base, Math.round(window.innerHeight - centre - 24)) // 24 is half the button
          : base;
      setDock(next === base ? null : next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  const onClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    // Put keyboard and screen-reader focus back at the start of the page without moving the scroll again.
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <div
      className="rise fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6"
      style={dock !== null ? { bottom: dock } : undefined}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label="Back to top"
        className="btn btn-primary h-12 w-12 border-2 border-bg px-0"
      >
        <ArrowUp size={20} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
