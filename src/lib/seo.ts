// usePageMeta: keeps the title, description, canonical and social tags correct for each page.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://mula.lk';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (href === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta(title: string, description: string, options?: { noindex?: boolean }) {
  const { pathname } = useLocation();
  const noindex = options?.noindex ?? false;

  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', OG_IMAGE);

    if (noindex) {
      setCanonical(null);
      document.head.querySelector('meta[property="og:url"]')?.remove();
    } else {
      setCanonical(url);
      setMeta('property', 'og:url', url);
    }
  }, [title, description, pathname, noindex]);
}
