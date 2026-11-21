// HarvestReel: one 30-second clip of natural rubber's journey over the hero picture: the estate, tapping,
// processing into sheets, the warehouse, and the truck out. A label names each stage as the clip reaches it.
// It only loads and plays on wider screens, while the hero is on screen, and never with less motion or
// data saver on (the still photo shows instead). A button pauses it.
// Media: Pixabay, free to use, illustrative only (not a MŪLA estate).
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { prefersReducedMotion } from '../lib/motion';

const SRC = '/media/harvest/rubber.mp4';

// The clip's scenes, by the second each one starts.
const STAGES = [
  { at: 0, name: 'On the estate' },
  { at: 12, name: 'Tapping' },
  { at: 16, name: 'Processing into sheets' },
  { at: 26, name: 'In the warehouse' },
  { at: 28, name: 'On its way' },
];

export default function HarvestReel() {
  const [enabled, setEnabled] = useState(false);
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Decide once whether this visitor gets the clip at all.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setEnabled(window.matchMedia('(min-width: 768px)').matches && !prefersReducedMotion() && !conn?.saveData);
  }, []);

  // Only play while the hero is on screen.
  useEffect(() => {
    const v = videoRef.current;
    if (!enabled || !v) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, [enabled]);

  // Play or pause with the button and with visibility.
  useEffect(() => {
    const v = videoRef.current;
    if (!enabled || !v) return;
    if (paused || !inView) v.pause();
    else v.play().catch(() => setPaused(true));
  }, [enabled, paused, inView]);

  // Follow the clip's time to show which stage is on screen.
  const onTime = () => {
    const t = videoRef.current?.currentTime ?? 0;
    let i = 0;
    STAGES.forEach((s, k) => {
      if (t >= s.at) i = k;
    });
    if (i !== stage) setStage(i);
  };

  if (!enabled) return null;

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        src={SRC}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onTimeUpdate={onTime}
        className="hero-media reel-in absolute inset-0 h-full w-full object-cover"
      />

      {/* Faint sand wash, so the clip shares the page's warmth */}
      <div aria-hidden="true" className="hero-wash pointer-events-none absolute inset-0" />

      {/* The stage on screen */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-bg/95 py-1.5 pl-1.5 pr-4 text-[14px] text-ink">
        <span className="rounded-full bg-forest px-2.5 py-0.5 text-[12px] font-medium text-on-dark">Rubber</span>
        <span key={stage} className="reel-name font-medium">
          {STAGES[stage].name}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="btn btn-light absolute right-4 top-4 min-h-[44px] px-4 text-[14px]"
        aria-label={paused ? 'Play the rubber video' : 'Pause the rubber video'}
      >
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
}
