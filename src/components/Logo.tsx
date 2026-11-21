// Logo: the MŪLA horizontal lockup (symbol left, wordmark right). Links home.
// The symbol is tall, so the lockup needs about 56px of height for the letters to read well.
// The colour version is all brand sage-dark (#46664F), for light backgrounds.
// On sage or forest, pass tone="white" for the one-colour white version.
import { Link } from 'react-router-dom';

export default function Logo({
  onClick,
  className = 'h-14',
  tone = 'color',
}: {
  onClick?: () => void;
  className?: string;
  tone?: 'color' | 'white';
}) {
  const src = tone === 'white' ? '/brand/mula-horizontal-white.svg' : '/brand/mula-horizontal.svg';
  return (
    <Link to="/" onClick={onClick} className="inline-flex min-h-[44px] items-center" aria-label="MŪLA home">
      <img src={src} alt="" width={419} height={231} className={`w-auto ${className}`} />
    </Link>
  );
}
