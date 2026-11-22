// Page metadata in one place, so the client and the prerender step cannot drift.
export const SITE_URL = 'https://mula.lk';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT = 'MŪLA: Traceable rubber, from the farm to the EU.';

export type PageMeta = {
  /** The canonical path, or null for the 404 page. */
  path: string | null;
  title: string;
  description: string;
  /** Social title, when it should differ from the page title. */
  ogTitle?: string;
  /** Social description, when it should differ from the page description. */
  ogDescription?: string;
  /** Keep the page out of search results. */
  noindex?: boolean;
  /** Include the page in sitemap.xml. */
  inSitemap: boolean;
};

export type PageKey = 'home' | 'requestAccess' | 'privacy' | 'notFound';

export const PAGES: Record<PageKey, PageMeta> = {
  home: {
    path: '/',
    title: 'MŪLA: EUDR traceability for Sri Lankan natural rubber',
    description:
      'MŪLA links every lot of rubber to the verified farms it came from and hands that proof down to the manufacturer and the EU importer.',
    ogTitle: 'MŪLA: Traceable rubber, from the farm to the EU',
    ogDescription: 'EUDR traceability for Sri Lankan natural rubber, from the farm to the EU importer.',
    inSitemap: true,
  },
  requestAccess: {
    path: '/request-access',
    title: 'Request access | MŪLA',
    description: 'Request a MŪLA account as an exporter, processor or rubber collector.',
    inSitemap: true,
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy notice | MŪLA',
    description: 'How the MŪLA demo site handles your information: the request form stores and sends nothing.',
    inSitemap: true,
  },
  notFound: {
    path: null,
    title: 'Page not found | MŪLA',
    description: 'This page does not exist.',
    noindex: true,
    inSitemap: false,
  },
};
