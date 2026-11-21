// NotFound: shown for any address the site does not have.
import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/seo';

export default function NotFound() {
  usePageMeta('Page not found | MŪLA', 'This page does not exist.');
  return (
    <section className="container-page py-24">
      <h1 className="h-section">This page doesn't exist.</h1>
      <Link to="/" className="btn btn-primary mt-8">
        Go to the home page
      </Link>
    </section>
  );
}
