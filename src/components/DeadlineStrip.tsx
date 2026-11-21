// DeadlineStrip: the one bright line on the site, stating when the EUDR starts to apply.
// Two dates (Regulation (EU) 2025/2650): large and medium companies first, micro and small ones later.
export default function DeadlineStrip() {
  return (
    <p className="bg-lime px-4 py-2 text-center text-[14px] font-medium leading-snug text-forest">
      The EUDR applies from 30 December 2026 for large and medium companies, and 30 June 2027 for micro and small
      ones.
    </p>
  );
}
