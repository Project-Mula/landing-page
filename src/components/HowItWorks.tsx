// HowItWorks: a scroll-led story that follows one sample lot from a farm in Kalutara to an importer in the EU.
// The journey map stays pinned while the four steps scroll past. Whichever step is in the reading zone
// lights up its stop on the map, draws the route to it, and shows what was proved there.
// Plain words, sample data only (farm KAL-003, lot L-0412).
import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    title: 'Map the farm',
    text: 'Draw the boundary or enter the government plot ID. It is checked against the 2020 EU forest map.',
    proof: 'Farm KAL-003: 1.1 ha, no 2020 forest',
    photo: { src: '/media/tapping-cut.jpg', w: 1200, h: 800, alt: 'A fresh tapping cut spiralling down the bark of a rubber tree.' },
  },
  {
    title: 'Verify the collector',
    text: 'A MŪLA verifier checks identity, source farms and land documents once, before they can sell.',
    proof: 'Kalutara Latex Traders: certified',
    photo: { src: '/media/tapper.jpg', w: 900, h: 1350, alt: 'A rubber tapper walking between rows of trees with collecting gear.' },
  },
  {
    title: 'Build a lot',
    text: 'Each pickup is signed on the phone. A lot lists every farm in it, and only verified farms can be added.',
    proof: 'Lot L-0412: every pickup signed',
    photo: { src: '/media/latex-white.jpg', w: 1000, h: 751, alt: 'Fresh white latex collected in a cup on a rubber tree.' },
  },
  {
    title: 'Hand the proof down',
    text: 'After a sale the collector hands the lot to the buyer once. The exporter passes it on as an evidence package and QR passport.',
    proof: 'QR passport: data unchanged since signing',
    photo: { src: '/media/port.jpg', w: 900, h: 1600, alt: 'Cranes and stacked containers at a port at sunset.' },
  },
];

// The four stops on the journey map (SVG units, 480 x 360) and the route between them.
const STOPS = [
  { x: 72, y: 240, label: 'Farm', tag: { x: 72, y: 290, w: 168, text: '1.1 ha, no 2020 forest' } },
  { x: 168, y: 104, label: 'Collector', tag: { x: 168, y: 56, w: 92, text: 'Certified' } },
  { x: 262, y: 236, label: 'Lot', tag: { x: 262, y: 290, w: 120, text: 'Every pickup signed' } },
  { x: 410, y: 136, label: 'EU importer', tag: { x: 400, y: 76, w: 136, text: 'Data unchanged' } },
];
const ROUTE = [
  'M72 240 C 98 168, 128 116, 168 104',
  'M168 104 C 214 94, 248 168, 262 236',
  'M262 236 C 300 312, 362 214, 410 136',
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The step crossing the reading zone becomes the active one. On phones the map is pinned at the top,
  // so the reading zone sits lower on the screen, below the map.
  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 1023px)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: narrow ? '-62% 0px -30% 0px' : '-45% 0px -45% 0px' },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-16 sm:py-24">
      <div className="container-page">
        <div data-reveal className="max-w-[40rem]">
          <h2 id="how-title" className="h-section">
            Proof is built at the farm, not at the sale.
          </h2>
          <p className="mt-5 text-[18px] leading-relaxed text-muted">
            Follow one sample lot of rubber, from a farm in Kalutara to an importer in the EU.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* The journey map: pinned while the steps scroll past it. */}
          <div className="sticky top-[72px] z-10 -mx-4 bg-bg px-4 pb-3 pt-2 sm:-mx-6 sm:px-6 lg:top-[112px] lg:mx-0 lg:self-start lg:bg-transparent lg:p-0">
            <figure className="journey grain rounded-hero bg-mist p-3 sm:p-5">
              <svg
                viewBox="0 0 480 360"
                className="mx-auto block h-auto max-h-[34vh] w-full lg:max-h-none"
                role="img"
                aria-label={`Journey of sample lot L-0412. Now showing step ${active + 1} of 4: ${STEPS[active].title}. ${STEPS[active].proof}.`}
              >
                <g aria-hidden="true">
                  {/* Two regions: Sri Lanka, where the proof is built, and the EU, where it is checked. */}
                  <text x="20" y="30" className="fill-muted text-[14px]">
                    Sri Lanka
                  </text>
                  <text x="460" y="30" textAnchor="end" className="fill-muted text-[14px]">
                    European Union
                  </text>
                  <line x1="336" y1="44" x2="336" y2="336" className="stroke-border" strokeWidth="1.5" strokeDasharray="4 6" />
                  <text x="342" y="330" className="fill-muted text-[12px]">
                    Shipped from Colombo
                  </text>

                  {/* The full route, faint, so the whole journey is visible from the start. */}
                  {ROUTE.map((d) => (
                    <path key={`ghost-${d}`} d={d} className="fill-none stroke-border" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
                  ))}
                  {/* The travelled route: each part draws once the step it leads to is reached. */}
                  {ROUTE.map((d, i) => (
                    <path
                      key={d}
                      d={d}
                      pathLength={1}
                      className="journey-route fill-none stroke-sage-dark"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      data-on={active > i}
                    />
                  ))}

                  {/* The stops: numbered, filled once reached, with what was proved there. */}
                  {STOPS.map((s, i) => {
                    const reached = active >= i;
                    return (
                      <g key={s.label}>
                        <circle
                          cx={s.x}
                          cy={s.y}
                          r="20"
                          className={`journey-stop ${reached ? 'fill-forest stroke-forest' : 'fill-bg stroke-border'}`}
                          strokeWidth="2"
                          data-on={reached}
                        />
                        <text x={s.x} y={s.y + 6} textAnchor="middle" className={`font-serif text-[17px] ${reached ? 'fill-on-dark' : 'fill-muted'}`}>
                          {i + 1}
                        </text>
                        <text
                          x={s.x + (i === 3 ? 0 : 28)}
                          y={s.y + (i === 3 ? 42 : 5)}
                          textAnchor={i === 3 ? 'middle' : 'start'}
                          className={`text-[14px] font-medium ${reached ? 'fill-ink' : 'fill-muted'}`}
                        >
                          {s.label}
                        </text>
                        <g className="journey-tag" data-on={active === i}>
                          <rect x={s.tag.x - s.tag.w / 2} y={s.tag.y - 15} width={s.tag.w} height="28" rx="14" className="fill-success-bg" />
                          <text x={s.tag.x} y={s.tag.y + 4} textAnchor="middle" className="fill-success text-[13px] font-medium">
                            {s.tag.text}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>
              </svg>
              <figcaption className="mt-2 text-[14px] text-muted">
                Sample lot L-0412. Step {active + 1} of 4: {STEPS[active].proof}.
              </figcaption>
            </figure>
          </div>

          {/* The four steps. Each is tall enough that one step at a time sits in the reading zone. */}
          <ol>
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => (stepRefs.current[i] = el)}
                data-index={i}
                data-on={active === i}
                className="journey-step flex min-h-[46vh] flex-col justify-center py-8 lg:min-h-[62vh] lg:last:min-h-[48vh]"
              >
                <div className="relative pl-6">
                  {/* A sage bar marks the step being read. */}
                  <span aria-hidden="true" className="journey-bar absolute bottom-1 left-0 top-1 w-[3px] rounded-full bg-sage-dark" />
                  <span aria-hidden="true" className="font-serif text-[3rem] font-light leading-none text-sage-dark">
                    {i + 1}
                  </span>
                  <h3 className="h-tile mt-4">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-[17px] text-muted">{s.text}</p>
                  {/* A real photo for each stop, so the story is grounded in the actual work. Illustrative stock images. */}
                  <img
                    src={s.photo.src}
                    alt={s.photo.alt}
                    width={s.photo.w}
                    height={s.photo.h}
                    loading="lazy"
                    decoding="async"
                    className="mt-5 aspect-[16/10] w-full max-w-[420px] rounded-card object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
