# MŪLA public website

The public marketing site for MŪLA, an EUDR (EU Deforestation Regulation) traceability platform for Sri Lankan natural rubber. It is a student project for the Agile Team Project module at IIT, in partnership with the University of Westminster.

This is only the public website, not the MŪLA app. It has three pages:

| Address | Page |
| --- | --- |
| `/` | Landing page |
| `/request-access` | Request access form (a demo: it checks your answers but stores and sends nothing) |
| `/privacy` | Privacy notice |

All farm, collector and company names on the site are sample data.

## What you need

- [Node.js](https://nodejs.org/) 20 or newer

## Run it on your computer

```bash
npm install
npm run dev
```

Then open the address it prints, usually http://localhost:5173.

## Build it

```bash
npm run build
```

This checks the TypeScript, builds the client, prerenders each route, and writes the finished site to the `dist` folder. It produces:

- `dist/index.html`
- `dist/request-access.html`
- `dist/privacy.html`
- `dist/404.html`
- `dist/robots.txt`
- `dist/sitemap.xml`

The build fails if the prerendered HTML, metadata, sitemap, or redirect rules do not match.

To check the built site locally, use Cloudflare's local Pages server:

```bash
npx --yes wrangler pages dev dist
```

Do not use `vite preview` for this check: it falls back to `index.html` and hides routing problems on `/request-access` and `/privacy`.

## Deploy it

The build is a static multi-page site: each route has its own HTML file, and `404.html` handles unknown addresses. The included configs cover the three main static hosts.

**Cloudflare Pages**

1. Connect the repository.
2. Build command: `npm run build`.
3. Output directory: `dist`.

`public/_redirects` handles the URL shape: `.html` and trailing-slash addresses redirect to the canonical path. A top-level `404.html` turns off Cloudflare's SPA fallback, so unknown addresses return a real 404.

**Netlify**

1. Connect the repository.
2. `netlify.toml` already sets the build command and the `dist` folder.

Netlify's pretty URLs and `404.html` support work with the same output.

**Vercel**

1. Import the repository.
2. `vercel.json` sets the build command, output folder, clean URLs, and trailing-slash handling.

Vercel's `cleanUrls` serves `request-access.html` at `/request-access`, and `trailingSlash: false` redirects `/request-access/` to `/request-access`.

Other static hosts need equivalent clean-URL and custom-404 support. The site uses root-relative asset paths, so it must be deployed at the domain root.

**Domain:** the canonical address is `https://mula.lk`, set in `src/lib/pages.ts`. If you deploy a fork on another domain, change `SITE_URL` there, plus the URL in `public/robots.txt` and the `<loc>` entries in `public/sitemap.xml`.

## How the code is organised

```
index.html              page shell; SEO tags sit between the prerender markers
tailwind.config.ts      all colours as named tokens (bg, surface, border, sage, ...)
vite.ssr.config.ts      the SSR build that produces the prerender entry
scripts/prerender.mjs   writes the static route HTML and checks the build
public/                 logo, favicon, social sharing image, robots, sitemap, redirects
src/
  main.tsx              hydrates the prerendered page (or mounts it in dev)
  entry-server.tsx      renders one route to HTML for the prerender step
  App.tsx               the page frame and the three routes
  index.css             base styles, buttons, focus rings and animations
  pages/                Landing, RequestAccess, Privacy, NotFound
  components/           one file per section or part, each with a comment saying what it does
  lib/validation.ts     the form rules (Zod): mobile, NIC, email, required fields per role
  lib/districts.ts      the 25 districts of Sri Lanka
  lib/pages.ts          page titles, descriptions, canonical paths and the site URL
  lib/seo.ts            keeps the client-side head tags in sync with pages.ts
  lib/site.ts           team names and roles, supervisor, and the contact email (replace [TEAM EMAIL])
```

## Design notes

- **Colours** are in `tailwind.config.ts`. White text on the brand sage `#5D866C` fails contrast, so buttons use the darker `sage-dark` (`#46664F`) and hover to `forest` (`#2F4A37`).
- **Fonts:** Source Serif 4 for headings and Inter for body text, from Google Fonts.
- **Shapes:** pill buttons and inputs, 20px cards and 30px feature tiles. There are no shadows; depth comes from the tile colours.
- **The logo** has black lettering, so it only sits on light backgrounds (the header and footer).
- **Motion:** all curves and durations are tokens at the top of `src/index.css`, and the helpers are in `src/lib/motion.ts`.
  - On first load the hero rises in, in reading order, then the lot card's farm rows follow. The headline and intro only slide (no fade), so the page still counts as loaded at once.
  - Sections and tiles rise into place once, the first time they scroll into view (add `data-reveal` to any element to join in). Without JavaScript nothing is hidden.
  - Moving to another page starts at its top and fades up. Section links scroll smoothly.
  - The header's bottom rule appears once the page scrolls; the menu icon cross-fades; the menu links follow one by one.
  - In the form: the role-specific fields fade in on switch, errors fade in, and the page glides to the first error or to the success message.
  - Buttons sink slightly when pressed. Hover effects only run on devices with a mouse.
  - With "reduce motion" turned on in the system settings, all movement is removed and only short fades remain.
- **Accessibility:** a skip link, visible focus rings, labels on every input, errors linked to their fields, focus moved to the first error, 44px touch targets, and statuses shown with an icon and a word (never colour alone).

## The request form

- The fields change with the chosen role: exporter or processor, or rubber collector.
- It checks: required fields for that role, a valid email, a Sri Lankan mobile number (07 and 8 more digits), and an NIC in the old format (9 digits and V or X) or the new one (12 digits).
- Files are never opened or uploaded; only the file name is shown.
- On a valid send it shows a success message. Nothing is stored, logged or sent.

## Contact

Email: connectwithmula@gmail.com
