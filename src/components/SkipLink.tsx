// SkipLink: lets keyboard users jump straight past the header to the page content.
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-full bg-forest px-5 py-3 font-medium text-on-dark focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}
