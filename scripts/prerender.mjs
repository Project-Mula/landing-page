// Prerender: turns the built SPA shell into static HTML for each route.
// Runs after the client build and the SSR build. Fails the build if anything is off.
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = join(root, 'dist');
const ssrEntry = join(root, '.ssr', 'entry-server.js');

const { render, PAGES, SITE_URL, OG_IMAGE, OG_IMAGE_ALT } = await import(pathToFileURL(ssrEntry).href);

const SEO_START = '<!--seo:start-->';
const SEO_END = '<!--seo:end-->';
const ROOT_EMPTY = '<div id="root"></div>';

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function replaceBlock(html, start, end, replacement) {
  const from = html.indexOf(start);
  const to = html.indexOf(end, from);
  if (from === -1 || to === -1) throw new Error('dist/index.html is missing the SEO markers');
  return html.slice(0, from) + replacement + html.slice(to + end.length);
}

function headFor(page) {
  const url = page.path ? `${SITE_URL}${page.path}` : null;
  const ogTitle = page.ogTitle ?? page.title;
  const ogDescription = page.ogDescription ?? page.description;
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
  ];
  if (url) tags.push(`<link rel="canonical" href="${url}" />`);
  tags.push(
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="MŪLA" />',
    '<meta property="og:locale" content="en_LK" />',
    `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(ogDescription)}" />`,
  );
  if (url) tags.push(`<meta property="og:url" content="${url}" />`);
  tags.push(
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:type" content="image/png" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(ogDescription)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />`,
  );
  return tags.join('\n    ');
}

const template = await readFile(join(dist, 'index.html'), 'utf8');
if (!template.includes(SEO_START) || !template.includes(SEO_END)) {
  throw new Error('dist/index.html is missing the SEO markers');
}
if (!template.includes(ROOT_EMPTY)) {
  throw new Error('dist/index.html is missing the empty #root container');
}

const routes = [
  { key: 'home', file: 'index.html', url: '/', marker: 'id="hero-title"' },
  { key: 'requestAccess', file: 'request-access.html', url: '/request-access', marker: 'Request access to MŪLA' },
  { key: 'privacy', file: 'privacy.html', url: '/privacy', marker: 'This demo stores nothing' },
  { key: 'notFound', file: '404.html', url: '/404', marker: 'Go to the home page' },
];

const outputs = routes.map((route) => {
  const page = PAGES[route.key];
  if (!page) throw new Error(`PAGES.${route.key} is missing`);
  const body = render(route.url);
  const html = replaceBlock(template, SEO_START, SEO_END, headFor(page)).replace(
    ROOT_EMPTY,
    `<div id="root">${body}</div>`,
  );
  return { ...route, page, html };
});

for (const { file, page, html, marker } of outputs) {
  const url = page.path ? `${SITE_URL}${page.path}` : null;
  const fail = (message) => {
    throw new Error(`${file}: ${message}`);
  };

  if (!html.includes(`<title>${escapeHtml(page.title)}</title>`)) fail('wrong title');
  if (!html.includes(marker)) fail('page content missing');
  if (!html.includes('type="module"')) fail('client bundle missing');
  if (!html.includes('application/ld+json')) fail('JSON-LD missing');
  if (html.includes(ROOT_EMPTY)) fail('#root is empty');
  if (html.includes(SEO_START) || html.includes(SEO_END)) fail('SEO markers left behind');

  if (url) {
    if (!html.includes(`<link rel="canonical" href="${url}" />`)) fail('canonical missing');
    if (!html.includes(`<meta property="og:url" content="${url}" />`)) fail('og:url missing');
  } else {
    if (html.includes('rel="canonical"')) fail('canonical should not be present');
    if (html.includes('property="og:url"')) fail('og:url should not be present');
    if (!html.includes('<meta name="robots" content="noindex, follow" />')) fail('noindex missing');
  }
}

const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) throw new Error('robots.txt does not point at the sitemap');

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const expected = Object.values(PAGES)
  .filter((page) => page.inSitemap && page.path)
  .map((page) => `${SITE_URL}${page.path}`);
if (locs.length !== expected.length || !expected.every((url) => locs.includes(url))) {
  throw new Error(`sitemap.xml does not match PAGES (found ${locs.join(', ')})`);
}

const redirects = await readFile(join(dist, '_redirects'), 'utf8');
if (/^\s*\/\*\s+/m.test(redirects)) throw new Error('_redirects still contains a catch-all');
for (const path of ['/index.html', '/request-access.html', '/privacy.html', '/request-access/', '/privacy/']) {
  if (!redirects.includes(path)) throw new Error(`_redirects is missing ${path}`);
}

for (const { file, html } of outputs) {
  await writeFile(join(dist, file), html, 'utf8');
}

console.log(`Prerendered ${outputs.map((output) => output.file).join(', ')}`);
