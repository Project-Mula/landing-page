// App: the shared page frame (skip link, header, footer) and the three routes.
// It also runs the site-wide motion: scroll reveals and the fade between pages.
import { Route, Routes, useLocation } from 'react-router-dom';
import SkipLink from './components/SkipLink';
import DeadlineStrip from './components/DeadlineStrip';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import RequestAccess from './pages/RequestAccess';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import { useRouteChange, useScrollReveal } from './lib/motion';

export default function App() {
  const { pathname } = useLocation();
  const hasMoved = useRouteChange();
  useScrollReveal();

  return (
    <>
      <SkipLink />
      <DeadlineStrip />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* Keyed by page, so each new page mounts fresh and fades up. Not on the first load. */}
        <div key={pathname} className={hasMoved ? 'page-in' : undefined}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/request-access" element={<RequestAccess />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}
