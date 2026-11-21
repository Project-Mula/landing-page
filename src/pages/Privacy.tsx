// Privacy: a short, plain-English privacy notice for the demo site.
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/seo';
import { CONTACT_EMAIL } from '../lib/site';

// One block of the notice: a heading and its paragraphs or list.
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border/70 pt-8">
      <h2 className="h-tile">{title}</h2>
      <div className="mt-3 space-y-3 text-[17px]">{children}</div>
    </section>
  );
}

export default function Privacy() {
  usePageMeta('Privacy notice | MŪLA', 'How the MŪLA demo site handles your information: the request form stores and sends nothing.');

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="max-w-[44rem]">
        <h1 className="text-[2.5rem] font-light leading-[1.05] sm:text-[3rem]">Privacy notice</h1>
        <p className="mt-5 text-[18px] leading-relaxed text-muted">
          MŪLA is a student project. This website is a demo, and this notice explains what that means for anything you
          type into it.
        </p>

        <div className="mt-10 space-y-8">
          <Block title="This demo stores nothing">
            <p>
              The Request access form only checks your answers in your own browser. Nothing you enter is saved, logged or
              sent anywhere, and it is gone when you leave or reload the page.
            </p>
            <p>
              When you choose a file, the form only shows its name. The file itself is never opened or uploaded.
            </p>
            <p>This site does not use cookies or analytics.</p>
          </Block>

          <Block title="Fonts">
            <p>
              The site loads its fonts from Google Fonts. When it does, Google receives your IP address, like any website
              you visit. No form data goes to Google.
            </p>
          </Block>

          <Block title="What a real version would collect, and why">
            <p>A real MŪLA service would ask for details so a verifier can check who you are before an account is made:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold">Companies:</strong> your name and contact details, the registered
                company name, the BR number and a copy of the BR certificate.
              </li>
              <li>
                <strong className="font-semibold">Collectors:</strong> your name and contact details, your NIC number, your
                RDD dealer licence, and photos of both.
              </li>
            </ul>
            <p>These details would be used only to verify companies and collectors, and for nothing else.</p>
          </Block>

          <Block title="How long it would be kept">
            <p>
              A request that is not approved would be deleted once the decision is made. For an approved account, the
              details and documents would be kept while the account is open.
            </p>
            <p>
              Records that prove where rubber came from would be kept for at least 5 years, because the EUDR asks companies
              to keep their evidence for that long.
            </p>
          </Block>

          <Block title="Who would see your documents">
            <p>Only the MŪLA verifier who checks your request would see your documents.</p>
          </Block>

          <Block title="Contact">
            <p>Questions about this notice: {CONTACT_EMAIL}</p>
          </Block>
        </div>

        <Link to="/request-access" className="btn btn-primary mt-12">
          Request access
        </Link>
      </div>
    </div>
  );
}
