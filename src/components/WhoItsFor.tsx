// WhoItsFor: the four kinds of people who use MŪLA, as ruled rows.
// Each row pairs the words with a small scene of what that person does with MŪLA.
// The scenes play when they scroll into view, and replay each time they come back.
// On wide screens the scene swaps sides from row to row, so the section reads as a zigzag.
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ScanLine, Smartphone, Truck } from 'lucide-react';
import GateScene from './GateScene';
import CollectorScene from './CollectorScene';
import GpsPlot from './GpsPlot';
import PassportScene from './PassportScene';

type Group = {
  Icon: typeof Truck;
  title: string;
  text: string;
  more?: string;
  link?: { to: string; label: string };
  Scene: ComponentType;
  id: string; // the hero's role paths link here
};

const GROUPS: Group[] = [
  {
    Icon: Building2,
    title: 'Exporters and processors',
    text: 'Your own admin dashboard: manage field agents, connect with collectors, receive lots, build batches and pass the compliance gate.',
    link: { to: '/request-access?role=company', label: 'Request a company account' },
    Scene: GateScene,
    id: 'for-exporters',
  },
  {
    Icon: Truck,
    title: 'Rubber collectors',
    text: 'Get verified once, then sell to any exporter on MŪLA.',
    link: { to: '/request-access?role=collector', label: 'Apply as a collector' },
    Scene: CollectorScene,
    id: 'for-collectors',
  },
  {
    Icon: Smartphone,
    title: 'Company field agents',
    text: 'Your company creates your account. The app works offline, out on the estate.',
    more: 'Walk the farm boundary and the app records each corner by GPS, then checks the plot against the 2020 EU forest map.',
    Scene: GpsPlot,
    id: 'for-agents',
  },
  {
    Icon: ScanLine,
    title: 'Manufacturers and EU buyers',
    text: "Scan the QR passport to see where the rubber came from, and check the records haven't been changed.",
    Scene: PassportScene,
    id: 'for-buyers',
  },
];

export default function WhoItsFor() {
  return (
    <section id="who-its-for" aria-labelledby="who-title" className="pb-16 sm:pb-24">
      <div className="container-page">
        <h2 id="who-title" data-reveal className="h-section">
          Who it's for
        </h2>

        <ul className="mt-10">
          {GROUPS.map(({ Icon, title, text, more, link, Scene, id }, i) => (
            <li
              key={title}
              id={id}
              data-reveal
              className="scroll-mt-[96px] grid items-center gap-8 border-t border-ink/80 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14"
            >
              <div className="flex gap-5">
                <Icon size={28} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-sage-dark" />
                <div>
                  <h3 className="h-tile">{title}</h3>
                  <p className="mt-2 max-w-prose text-[16px] text-muted">{text}</p>
                  {more && <p className="mt-3 max-w-prose text-[16px] text-muted">{more}</p>}
                  {link && (
                    <Link to={link.to} className="link mt-4 inline-flex min-h-[44px] items-center text-[16px]">
                      {link.label}
                    </Link>
                  )}
                </div>
              </div>
              {/* Capped at 560px so scenes never grow oversized on tablets, where rows stack. */}
              <div className={`w-full max-w-[560px] ${i % 2 === 1 ? 'lg:order-first' : ''}`}>
                <Scene />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
