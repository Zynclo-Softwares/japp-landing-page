import { useState, useEffect } from 'react';
import NoiseOverlay from '../components/landing/NoiseOverlay';
import PromoBar from '../components/landing/PromoBar';
import Nav from '../components/landing/Nav';
import HeroSection from '../components/landing/HeroSection';
import OldVsNewSection from '../components/landing/OldVsNewSection';
import ProfileFirstSection from '../components/landing/ProfileFirstSection';
import BYOTemplateSection from '../components/landing/BYOTemplateSection';
import CompanyResearchSection from '../components/landing/CompanyResearchSection';
import ApplyAnywhereSection from '../components/landing/ApplyAnywhereSection';
import JobTrackerSection from '../components/landing/JobTrackerSection';
import HITLSection from '../components/landing/HITLSection';
import PricingSection from '../components/landing/PricingSection';
import FaqSection from '../components/landing/FaqSection';
import Footer from '../components/landing/Footer';
import WaitlistModal from '../components/landing/WaitlistModal';

export default function Landing() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('japp-theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('japp-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <NoiseOverlay />

      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
        style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
      >
        Skip to content
      </a>


      <Nav theme={theme} toggleTheme={toggleTheme} onJoinClick={() => setWaitlistOpen(true)} />

      <main id="main-content">
        <HeroSection />

        {/* Section divider */}
        <div className="flex justify-center">
          <div className="w-2/5 h-px bg-border" />
        </div>

        <OldVsNewSection />

        <div className="flex justify-center">
          <div className="w-2/5 h-px bg-border" />
        </div>

        <ProfileFirstSection />

        <div className="flex justify-center">
          <div className="w-2/5 h-px bg-border" />
        </div>

        <BYOTemplateSection />

        <div className="flex justify-center">
          <div className="w-2/5 h-px bg-border" />
        </div>

        <CompanyResearchSection />

        <div className="flex justify-center">
          <div className="w-2/5 h-px bg-border" />
        </div>

        <ApplyAnywhereSection />

        <div className="flex justify-center">
          <div className="w-2/5 h-px bg-border" />
        </div>

        <JobTrackerSection />

        <div className="flex justify-center">
          <div className="w-2/5 h-px bg-border" />
        </div>

        <HITLSection />

        <div className="flex justify-center">
          <div className="w-2/5 h-px bg-border" />
        </div>

        <PricingSection />

        <div className="flex justify-center">
          <div className="w-2/5 h-px bg-border" />
        </div>

        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}