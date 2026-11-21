// ProblemSection: why traceability breaks today, on a sand band.
import { Factory, Repeat, SearchX, Shuffle } from 'lucide-react';
import { stagger } from '../lib/motion';
import MixingScene from './MixingScene';

const POINTS = [
  { Icon: Repeat, title: 'Rubber changes hands', text: 'Smallholders, collectors, dealers, processors and exporters, often through the open market.' },
  { Icon: SearchX, title: 'Proof gets lost', text: 'After a sale, the buyer rarely knows which farms the rubber came from.' },
  { Icon: Shuffle, title: 'Mixing breaks it', text: 'One input without plot geolocation makes the whole lot non-compliant.' },
  { Icon: Factory, title: 'Most buyers are local', text: 'Glove and tyre makers need the proof for their own EU customers.' },
];

export default function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className="grain bg-surface py-16 sm:py-24">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <h2 id="problem-title" className="h-section">
              One unverified farm can stop a whole shipment.
            </h2>
            <p className="mt-6 max-w-prose text-[18px] leading-relaxed text-ink">
              From 30 December 2026 for large and medium companies, and 30 June 2027 for micro and small ones, the EUDR
              needs the location of every plot the rubber was grown on, and proof that no forest was cleared there after
              31 December 2020.
            </p>
          </div>
          {/* Animated diagram: one unverified input blocks the whole lot. */}
          <div className="w-full max-w-[560px] lg:justify-self-end">
            <MixingScene />
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map(({ Icon, title, text }, i) => (
            <li key={title} data-reveal style={stagger(i)} className="rounded-card bg-bg p-6">
              <Icon size={24} strokeWidth={1.75} aria-hidden="true" className="text-sage-dark" />
              <h3 className="h-tile mt-5">{title}</h3>
              <p className="mt-2 text-[16px] text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
