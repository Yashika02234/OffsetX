export function HeroSection() {
  return (
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
            We are building the data and compliance infrastructure that helps organisations
            generate trusted, audit-ready carbon intelligence for the next generation of climate
            regulations.
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
  );
}
