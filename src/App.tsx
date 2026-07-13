import { useEffect, useState } from 'react';

type Counter = {
  value: number;
  suffix: string;
  label: string;
};

type WhyNowItem = {
  tag: string;
  title: string;
  description: string;
};

type LearningItem = {
  title: string;
  quote: string;
  mentions: number;
};

type ExploringItem = {
  title: string;
  description: string;
};

type ResearchCard = {
  tag: string;
  title: string;
  href: string;
};

const counters: Counter[] = [
  { value: 20, suffix: '+', label: 'EXPERT<br/>INTERVIEWS' },
  { value: 12, suffix: '+', label: 'STAKEHOLDER<br/>GROUPS' },
  { value: 4, suffix: '', label: 'GEOGRAPHIES<br/>COVERED' },
  { value: 30, suffix: '+', label: 'HOURS OF<br/>RESEARCH' },
];

const whyNowItems: WhyNowItem[] = [
  {
    tag: 'REGULATION',
    title: 'CBAM is reshaping global trade.',
    description:
      'Thousands of industrial companies now face mandatory embedded-emissions reporting with financial consequences.',
  },
  {
    tag: 'COMPLIANCE',
    title: 'Compliance carbon markets are being built in real time.',
    description:
      'CCTS is introducing compliance carbon markets in India, and domestic carbon pricing infrastructure is being built right now.',
  },
  {
    tag: 'ENTERPRISE',
    title: 'Enterprises need audit-ready emissions data.',
    description:
      'Spreadsheets and consultant-driven workflows are no longer sufficient for regulatory scrutiny.',
  },
  {
    tag: 'VERIFICATION',
    title: 'Carbon projects require trusted Digital MRV.',
    description:
      'The industry is moving from periodic audits to continuous, satellite-enabled verification.',
  },
  {
    tag: 'DEMAND',
    title: 'Buyers increasingly demand compliance-grade carbon assets.',
    description:
      'Quality, traceability, and auditability are now prerequisites — not differentiators.',
  },
  {
    tag: 'INFRASTRUCTURE',
    title: 'No universal trust layer exists across registries and geographies.',
    description:
      'The market is scaling without the infrastructure it needs.',
  },
];

const learningItems: LearningItem[] = [
  {
    title: 'Manual workflows remain widespread',
    quote: '90% of this market is manual.',
    mentions: 4,
  },
  {
    title: 'Trust in data is a bigger challenge than availability',
    quote: 'The biggest issue is trust in the underlying project.',
    mentions: 4,
  },
  {
    title: 'Compliance markets are expected to drive future demand',
    quote: 'Pure voluntary credits without compliance use cases have weak demand.',
    mentions: 3,
  },
  {
    title: 'Digital MRV is emerging as foundational infrastructure',
    quote: 'If you pick one with a large market size, it\'s dMRV.',
    mentions: 4,
  },
  {
    title: 'Standardisation remains a major gap',
    quote: 'Six calculators would give six different numbers.',
    mentions: 3,
  },
];

const exploringItems: ExploringItem[] = [
  {
    title: 'Compliance-grade emissions data',
    description:
      'Structured, audit-ready Scope 1, 2, and 3 data for EU ETS, CBAM, and CSRD.',
  },
  {
    title: 'Digital MRV',
    description:
      'Satellite, IoT, and AI-driven continuous measurement, reporting, and verification.',
  },
  {
    title: 'Audit-ready reporting',
    description:
      'Compliance-grade documentation structured to survive regulatory review.',
  },
  {
    title: 'Carbon market intelligence',
    description:
      'Structured data on credit supply, demand, registry activity, and compliance exposure.',
  },
  {
    title: 'Trust and verification infrastructure',
    description:
      'UNIC — Universal Carbon Identifier — traceable across registries and geographies.',
  },
];

const researchCards: ResearchCard[] = [
  {
    tag: 'REGULATION',
    title: 'CBAM: What the Q1 2026 certificate price means for European industrial imports',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
  {
    tag: 'MARKET',
    title: 'Why the VCM contracted — and what compliance demand means for recovery',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
  {
    tag: 'TECHNOLOGY',
    title: 'What Digital MRV can and cannot do: an honest assessment of satellite limits',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
  {
    tag: 'INDIA',
    title: 'CCTS and the emergence of compliance carbon markets in India: a field perspective',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
  {
    tag: 'INSIGHTS',
    title: '20+ stakeholder interviews: recurring themes from consultants, registries, policy experts',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
  {
    tag: 'DMRV',
    title: 'Ground-truthing, canopy saturation, and why local calibration data still matters in 2026',
    href: 'https://www.linkedin.com/in/iamsahilkhan/',
  },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [counterValues, setCounterValues] = useState<number[]>(Array(counters.length).fill(0));
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const nextProgress = scrollHeight - clientHeight > 0 ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0;
      setProgress(nextProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.counter-num[data-target]'));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = Number(entry.target.getAttribute('data-target'));
          const duration = 1400;
          const start = performance.now();
          const ease = (p: number) => 1 - Math.pow(1 - p, 3);

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(ease(progress) * target);
            setCounterValues((current) => {
              const next = [...current];
              const index = Number(entry.target.getAttribute('data-index'));
              next[index] = value;
              return next;
            });
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 },
    );

    elements.forEach((element, index) => {
      element.setAttribute('data-index', String(index));
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValid) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setSubmitted(true);
  };

  return (
    <div className="app-shell">
      <div id="progress-bar" style={{ width: `${progress}%` }} />
      <nav className={`main-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <span className="wordmark">OFFSETX</span>
          <div className="nav-links" role="navigation">
            <a href="#why-now" className="nav-link">
              WHY NOW
            </a>
            <a href="#learning" className="nav-link">
              WHAT WE'RE LEARNING
            </a>
            <a href="#research" className="nav-link">
              RESEARCH
            </a>
            <a href="#follow" className="nav-cta">
              JOIN EARLY ACCESS <span className="arr">→</span>
            </a>
          </div>
        </div>
      </nav>

      <section id="hero" aria-label="Hero">
        <div className="container">
          <div className="hero-inner">
            <span className="eyebrow hero-eyebrow">CARBON INTELLIGENCE INFRASTRUCTURE</span>
            <h1 className="hero-h1 hero-headline">
              Building the <span className="accent">trust layer</span>
              <br />
              for compliance-grade
              <br />
              carbon markets.
            </h1>
            <p className="hero-sub hero-sub-el">
              We are building the data and compliance infrastructure that helps organisations generate trusted, audit-ready carbon intelligence for the next generation of climate regulations.
            </p>
            <div className="hero-ctas hero-ctas-el">
              <a href="#follow" className="btn-primary">
                JOIN EARLY ACCESS <span className="arr">→</span>
              </a>
              <a href="mailto:hello@offsetx.ai" className="btn-ghost">
                TALK TO THE FOUNDER
              </a>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section id="founder" className="section founder-section" aria-label="Founder Note">
        <div className="container">
          <div className="founder-note reveal">
            <span className="eyebrow">02 — A NOTE FROM THE FOUNDER</span>
            <blockquote>
              Every week we speak with project developers, sustainability leaders, auditors, policy experts, and climate practitioners to understand where carbon markets are heading. OffsetX is being built from these conversations — not assumptions.
            </blockquote>
            <div className="founder-signature">— Sahil Khan, Founder · OffsetX</div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section id="why-now" className="section" aria-label="Why Now">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">03 — WHY NOW</span>
            <h2 className="section-h2">Climate markets are entering a new era of accountability.</h2>
          </div>
          <div className="problem-grid">
            {whyNowItems.map((item, index) => (
              <div key={item.tag} className={`prob-card reveal${index > 0 ? ` reveal-d${index > 2 ? 2 : 1}` : ''}`}>
                <span className="prob-tag">{item.tag}</span>
                <div className="prob-title">{item.title}</div>
                <div className="prob-body">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="counters" aria-label="Research scope">
        <div className="container">
          <div className="counter-grid">
            {counters.map((counter, index) => (
              <div className="counter-cell" key={counter.label}>
                <div className="counter-num" data-target={counter.value} data-suffix={counter.suffix} data-index={index}>
                  {counterValues[index]}
                  {index === 0 || index === 1 || index === 3 ? <span className="counter-suffix">{counter.suffix}</span> : null}
                </div>
                <div className="counter-label" dangerouslySetInnerHTML={{ __html: counter.label }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="learning" className="section" aria-label="What We're Learning">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">05 — WHAT WE'RE LEARNING</span>
            <h2 className="section-h2">We've spoken with carbon consultants, sustainability leaders, project developers, policy experts, and international climate practitioners across India, Europe, the Middle East, and North America.</h2>
          </div>
          <div className="learning-grid">
            {learningItems.map((item, index) => (
              <article key={item.title} className={`learning-card reveal${index > 0 ? ` reveal-d${index > 2 ? 2 : 1}` : ''}`}>
                <div className="learning-title">{item.title}</div>
                <p className="learning-quote">“{item.quote}”</p>
                <div className="learning-mentions">{item.mentions} mentions</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section id="exploring" className="section" aria-label="What We're Exploring">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">06 — WHAT WE'RE EXPLORING</span>
            <h2 className="section-h2">We are currently researching infrastructure across:</h2>
          </div>
          <div className="exploring-grid">
            {exploringItems.map((item, index) => (
              <div key={item.title} className={`explore-card reveal${index > 0 ? ` reveal-d${index > 2 ? 2 : 1}` : ''}`}>
                <div className="explore-title">{item.title}</div>
                <p className="explore-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section id="research" className="section" aria-label="Research">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">07 — RESEARCH</span>
            <h2 className="section-h2">Our perspective on what's coming.</h2>
          </div>
          <div className="research-grid">
            {researchCards.map((card, index) => (
              <a href={card.href} target="_blank" rel="noopener" className={`research-card reveal${index > 0 ? ` reveal-d${index > 3 ? 3 : index > 1 ? 2 : 1}` : ''}`} key={card.title}>
                <span className="research-tag">{card.tag}</span>
                <div className="research-title">{card.title}</div>
                <div className="research-cta">
                  READ ON LINKEDIN <span className="arr">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section id="follow" aria-label="Follow our journey">
        <div className="container">
          <span className="eyebrow reveal" style={{ display: 'block', textAlign: 'center' }}>
            08 — FOLLOW OUR JOURNEY
          </span>
          <h2 className="follow-h2 reveal reveal-d1">Follow our research as we build.</h2>
          <p className="follow-sub reveal reveal-d2">
            We publish weekly — regulatory analysis, market observations, and honest reflections from building in public. No noise.
          </p>
          {!submitted ? (
            <div className="email-row reveal reveal-d3" id="email-form">
              <input
                type="email"
                className={`email-input${emailError ? ' invalid' : ''}`}
                placeholder="your@email.com"
                aria-label="Email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (emailError) setEmailError(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button className="email-submit" type="button" onClick={handleSubmit}>
                STAY UPDATED <span className="arr">→</span>
              </button>
            </div>
          ) : (
            <div className="success-msg" role="status">
              <div className="success-icon">
                <div className="success-dot" />
              </div>
              <div>
                <div className="success-text-label">YOU'RE IN</div>
                <div className="success-text-body">If you work in carbon compliance, reach out at hello@offsetx.ai.</div>
              </div>
            </div>
          )}
          <div className="follow-links reveal reveal-d3">
            <a href="https://www.linkedin.com/in/iamsahilkhan/" target="_blank" rel="noopener" className="follow-link">
              Follow on LinkedIn
            </a>
            <a href="mailto:hello@offsetx.ai" className="follow-link">
              hello@offsetx.ai
            </a>
            <a href="mailto:hello@offsetx.ai?subject=Early%20Access" className="follow-link">
              Request early access
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <span className="wordmark" style={{ fontSize: '12px' }}>
              OFFSETX
            </span>
            <span className="footer-copy">© 2026 OFFSETX · CARBON INTELLIGENCE INFRASTRUCTURE</span>
            <a href="mailto:hello@offsetx.ai" className="footer-contact">
              hello@offsetx.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
