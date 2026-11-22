// Server entry: renders one route to HTML for the prerender step.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export { PAGES, SITE_URL, OG_IMAGE, OG_IMAGE_ALT } from './lib/pages';

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
