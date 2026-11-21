// Hero: the rubber video fills the whole picture, and the headline sits on top of it.
// The headline is revealed line by line through a mask: each line slides up out of a hidden edge, while
// the video keeps playing underneath. A soft shade at the lower left keeps the white text readable on
// any frame. On phones (and with less motion or data saver) the still photo stands in for the video.
// Below the picture: the role paths and the sample lot card, so nothing covers the footage.
import { Link } from 'react-router-dom';
import { ArrowDown, Ban, KeyRound, MapPin } from 'lucide-react';
import LotCard from './LotCard';
import HarvestReel from './HarvestReel';

// Delay for each hero piece, in reading order.
const at = (ms: number) => ({ animationDelay: `${ms}ms` });

// The headline, one entry per line, so each line can be revealed on its own.
const LINES = ['Traceable rubber,', 'from the farm to the EU.'];

// The three things a lot proves, matching the parts of the sample lot card.
const READ_LOT = [
  { Icon: MapPin, title: 'Every farm, named', text: 'Each source farm is listed with its plot and checked against the 2020 forest map.' },
  { Icon: Ban, title: 'Gaps are blocked', text: 'A farm without a verified land deed is kept out, not mixed in.' },
  { Icon: KeyRound, title: 'Signed and handed once', text: 'Pickups are signed on the phone, and the lot changes hands only once.' },
];

// One path per audience, each landing on that audience's row in "Who it's for".
const PATHS = [
  { href: '#for-exporters', label: 'Exporter or processor' },
  { href: '#for-collectors', label: 'Rubber collector' },
  { href: '#for-agents', label: 'Field agent' },
  { href: '#for-buyers', label: 'Manufacturer or EU buyer' },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-page pb-16 pt-4 sm:pb-20 lg:pt-6">
      {/* The picture, with the headline over it */}
      <div className="relative h-[78svh] min-h-[540px] overflow-hidden rounded-hero bg-forest sm:h-[70vh] lg:h-[calc(100svh-150px)] lg:max-h-[760px] lg:min-h-[600px]">
        <img
          src="/media/plantation-rows.jpg"
          srcSet="/media/plantation-rows-800.jpg 800w, /media/plantation-rows.jpg 1400w"
          sizes="(min-width: 1200px) 1200px, 100vw"
          alt="Rows of rubber trees on a plantation, each with a tapping cup."
          width={1400}
          height={933}
          {...{ fetchpriority: 'high' } /* lowercase: React 18 passes it straight to the browser */}
          decoding="async"
          className="hero-media absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="hero-wash pointer-events-none absolute inset-0" />
        {/* The rubber journey clip, playing over the photo on wider screens */}
        <HarvestReel />

        {/* A soft shade rising from the lower left, only as strong as the text needs */}
        <div aria-hidden="true" className="hero-shade pointer-events-none absolute inset-0" />

        {/* The headline, on the video */}
        <div className="on-dark absolute inset-x-0 bottom-0 p-5 text-on-dark sm:p-8 lg:p-12">
          <h1 id="hero-title" className="text-[2.6rem] font-light leading-[1.02] text-on-dark sm:text-[3.75rem] lg:text-[4.75rem]">
            {LINES.map((line, i) => (
              // The outer span is the mask; the inner span slides up through it.
              <span key={line} className="mask-line">
                <span className="mask-line-in" style={at(i * 140)}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="mask-fade mt-5 max-w-[36rem] text-[17px] leading-relaxed text-on-dark/90 sm:text-[19px]" style={at(480)}>
            MŪLA links every lot of rubber to the verified farms it came from, keeps that proof through collectors and
            open-market sales, and hands it down to the manufacturer and the EU importer.
          </p>
          <div className="mask-fade mt-7 flex flex-wrap gap-3" style={at(620)}>
            <Link to="/request-access" className="btn btn-light">
              Request access
            </Link>
            <a href="#how-it-works" className="btn btn-ghost-light">
              See how it works
              {/* Nudges down twice after the hero settles, a hint that the story continues below. */}
              <ArrowDown size={18} aria-hidden="true" className="nudge" />
            </a>
          </div>
        </div>
      </div>

      {/* Under the picture: the role paths beside the sample lot card */}
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <div className="flex flex-col gap-12">
          <nav aria-label="Find your role" className="rise" style={at(300)}>
            <p className="font-serif text-[1.5rem] leading-tight">EUDR traceability for Sri Lankan natural rubber.</p>
            <p className="mt-2 text-[15px] text-muted">Go straight to your role:</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PATHS.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="path-chip">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* A short guide to the sample lot card beside it: what each part of a lot proves. */}
          <section aria-labelledby="read-lot" data-reveal className="border-t border-ink/80 pt-8">
            <h2 id="read-lot" className="h-tile">
              How to read a lot
            </h2>
            <p className="mt-2 max-w-prose text-[16px] text-muted">
              Every lot on MŪLA carries its own proof. The sample beside this shows the three things a buyer checks.
            </p>
            <ol className="mt-6 grid gap-6 sm:grid-cols-3">
              {READ_LOT.map(({ Icon, title, text }, i) => (
                <li key={title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mist text-sage-dark">
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold">
                    <span className="mr-1.5 font-serif font-normal text-sage-dark">{i + 1}</span>
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[15px] text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <div className="rise max-w-[480px] rounded-hero bg-mist p-3 sm:p-6" style={at(360)}>
          <LotCard />
        </div>
      </div>
    </section>
  );
}
