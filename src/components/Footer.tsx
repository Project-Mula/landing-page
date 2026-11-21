// Footer: the logo, the student-project note, the sample-data notice and two links.
// It sits on the light bone band, because the logo needs a light background.
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="grain border-t border-border/60 bg-bone text-ink">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <Logo className="h-16" />
          <p className="mt-4 max-w-prose text-[15px] text-muted">
            MŪLA is a student project for the Agile Team Project module at IIT, in partnership with the University of
            Westminster. All farm and company data shown is sample data.
          </p>
          <p className="mt-2 max-w-prose text-[14px] text-muted">
            Photos and video from{' '}
            <a href="https://www.pexels.com" className="link" rel="noopener" target="_blank">
              Pexels
            </a>{' '}
            and{' '}
            <a href="https://pixabay.com" className="link" rel="noopener" target="_blank">
              Pixabay
            </a>
            , used as illustration. They do not show MŪLA farms or partners.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <a href="/#team" className="link inline-flex min-h-[44px] items-center">
                Team and contact
              </a>
            </li>
            <li>
              <Link to="/privacy" className="link inline-flex min-h-[44px] items-center">
                Privacy notice
              </Link>
            </li>
            <li>
              <Link to="/request-access" className="link inline-flex min-h-[44px] items-center">
                Request access
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
