// usePageMeta: keeps the title, description, canonical and social tags correct for each page.
import { useEffect } from 'react';
import { OG_IMAGE, PAGES, SITE_URL, type PageKey } from './pages';

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

export function usePageMeta(key: PageKey) {
  useEffect(() => {
    const page = PAGES[key];
    const url = page.path ? `${SITE_URL}${page.path}` : null;
    const ogTitle = page.ogTitle ?? page.title;
    const ogDescription = page.ogDescription ?? page.description;

    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', ogTitle);
    setMeta('property', 'og:description', ogDescription);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('name', 'twitter:title', ogTitle);
    setMeta('name', 'twitter:description', ogDescription);
    setMeta('name', 'twitter:image', OG_IMAGE);

    if (page.noindex || !url) {
      setCanonical(null);
      document.head.querySelector('meta[property="og:url"]')?.remove();
    } else {
      setCanonical(url);
      setMeta('property', 'og:url', url);
    }
  }, [key]);
}
