// CtaBand: the closing question and the one action, on a pale sage tile, beside a photo of latex being collected.
import { Link } from 'react-router-dom';

export default function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="container-page py-16 sm:py-24">
      <div data-reveal className="grid overflow-hidden rounded-hero bg-mist md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="flex flex-col items-start justify-center gap-8 px-6 py-12 sm:px-12 sm:py-16">
          <h2 id="cta-title" className="h-section max-w-[14ch]">
            Ready before 30 December 2026?
          </h2>
          <p className="-mt-4 max-w-prose text-[16px] text-muted">
            That is the date for large and medium companies. Micro and small companies follow on 30 June 2027.
          </p>
          <Link to="/request-access" className="btn btn-primary shrink-0">
            Request access
          </Link>
        </div>
        {/* Illustrative stock photo (Pexels). Hidden on phones to keep the action close. */}
        <img
          src="/media/latex-cup.jpg"
          alt="Latex dripping from a tapping cut into a collecting cup."
          width={900}
          height={1200}
          loading="lazy"
          decoding="async"
          className="hidden h-full min-h-[320px] w-full object-cover md:block"
        />
      </div>
    </section>
  );
}
