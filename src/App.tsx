import { useScrollProgress } from './hooks/useScrollProgress';
import { useRevealObserver } from './hooks/useRevealObserver';
import { useCounterAnimation } from './hooks/useCounterAnimation';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FounderSection } from './components/FounderSection';
import { WhyNowSection } from './components/WhyNowSection';
import { CountersSection } from './components/CountersSection';
import { LearningSection } from './components/LearningSection';
import { ExploringSection } from './components/ExploringSection';
import { ResearchSection } from './components/ResearchSection';
import { FollowSection } from './components/FollowSection';
import { Footer } from './components/Footer';

function App() {
  const { scrolled, progress } = useScrollProgress();
  const counterValues = useCounterAnimation();
  useRevealObserver();

  return (
    <div className="app-shell">
      <div id="progress-bar" style={{ width: `${progress}%` }} />
      <Navbar scrolled={scrolled} />

      <HeroSection />
      <hr className="section-divider" />
      <FounderSection />
      <hr className="section-divider" />
      <WhyNowSection />
      <CountersSection counterValues={counterValues} />
      <LearningSection />
      <hr className="section-divider" />
      <ExploringSection />
      <hr className="section-divider" />
      <ResearchSection />
      <hr className="section-divider" />
      <FollowSection />

      <Footer />
    </div>
  );
}

export default App;
