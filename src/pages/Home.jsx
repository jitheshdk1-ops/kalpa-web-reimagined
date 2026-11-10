import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Hero from '../components/sections/Hero';
import TrustedPartners from '../components/sections/TrustedPartners';
import ValueProposition from '../components/sections/ValueProposition';
import BentoGrid from '../components/sections/BentoGrid';
import Services from '../components/sections/Services';
import Portfolio from '../components/sections/Portfolio';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Home() {
  useScrollAnimation();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustedPartners />
        <ValueProposition />
        <BentoGrid />
        <Services />
        <Portfolio />
        <Footer />
      </main>
    </>
  );
}
