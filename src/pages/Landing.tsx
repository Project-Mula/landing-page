// Landing: the public home page, built from its sections in order.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '../lib/seo';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import HowItWorks from '../components/HowItWorks';
import WhoItsFor from '../components/WhoItsFor';
import Features from '../components/Features';
import ComplianceSection from '../components/ComplianceSection';
import CtaBand from '../components/CtaBand';
import Team from '../components/Team';
import BackToTop from '../components/BackToTop';

export default function Landing() {
  usePageMeta('home');

  // Arriving from another page with a #section in the address: scroll to it once the page has rendered.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <WhoItsFor />
      <Features />
      <ComplianceSection />
      <Team />
      <CtaBand />
      <BackToTop />
    </>
  );
}
