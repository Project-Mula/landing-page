// Header: the light bar with the wordmark, section links and the Request access button.
// Below 1024px the section links fold into a menu button.
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

// The four sections the nav scrolls to on the landing page.
export const NAV_LINKS = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#who-its-for', label: "Who it's for" },
  { href: '/#features', label: 'Features' },
  { href: '/#compliance', label: 'Compliance' },
  { href: '/#team', label: 'Team' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Close the menu whenever the page changes.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  // While the menu is open: Escape closes it and returns focus to the button,
  // and widening the window past the breakpoint closes it too.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const wide = window.matchMedia('(min-width: 1024px)');
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  // The bottom rule shows only once the page scrolls under the header.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header data-scrolled={scrolled || open} className="site-header sticky top-0 z-40 bg-bg text-ink">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Logo onClick={() => setOpen(false)} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/request-access" className="btn btn-primary hidden sm:inline-flex">
            Request access
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/30 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {/* Both icons share one spot and cross-fade, so the button feels like a single control. */}
            <span className="grid">
              <Menu size={22} aria-hidden="true" className="menu-icon" data-shown={!open} />
              <X size={22} aria-hidden="true" className="menu-icon" data-shown={open} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu: drops in below the bar. It opens with a short fade, and closes instantly. */}
      {open && (
        <nav id="mobile-menu" aria-label="Main" className="menu-in border-t border-border/60 lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href} style={{ animationDelay: `${40 + i * 40}ms` }}>
                <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-[52px] items-center text-[18px]">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pb-2 pt-3 sm:hidden" style={{ animationDelay: '200ms' }}>
              <Link to="/request-access" className="btn btn-primary w-full">
                Request access
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
