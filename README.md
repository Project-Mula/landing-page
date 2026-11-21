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

- [Node.js](https://nodejs.org/) 20 or newer (it comes with npm)

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

This checks the TypeScript and writes the finished site to the `dist` folder. To look at the built version before deploying:

```bash
npm run preview
```

## Deploy it

The site is a static single-page app, so any static host works. Both hosts below are already set up so that refreshing `/request-access` or `/privacy` still works.

**Vercel**

1. Push this folder to a GitHub repository.
2. In Vercel, choose Add New, then Project, and import the repository.
3. Vercel detects Vite. Keep the build command `npm run build` and the output folder `dist`.
4. Add your domain under Settings, then Domains.

`vercel.json` sends every address to `index.html` so the pages load on refresh.

**Netlify**

1. Push this folder to a GitHub repository.
2. In Netlify, choose Add new site, then Import an existing project.
3. `netlify.toml` already sets the build command and the `dist` folder.
4. Add your domain under Domain management.

`public/_redirects` sends every address to `index.html` so the pages load on refresh.

**After you have a domain:** open `index.html` and change `content="/og-image.png"` in the `og:image` tag to the full address, for example `https://your-domain/og-image.png`. Link previews in chat apps need the full address.

## How the code is organised

```
index.html              page title, description, social sharing tags, fonts
tailwind.config.ts      all colours as named tokens (bg, surface, border, sage, ...)
public/                 logo, favicon, social sharing image, deploy redirects
src/
  main.tsx              starts the app and the router
  App.tsx               the page frame and the three routes
  index.css             base styles, buttons, focus rings and animations
  pages/                Landing, RequestAccess, Privacy, NotFound
  components/           one file per section or part, each with a comment saying what it does
  lib/validation.ts     the form rules (Zod): mobile, NIC, email, required fields per role
  lib/districts.ts      the 25 districts of Sri Lanka
  lib/seo.ts            sets the title and description for each page
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
