import { researchCards } from '../data';

export function ResearchSection() {
  return (
    <section id="research" className="section" aria-label="Research">
      <div className="container">
        <div className="section-header reveal">

          <h2 className="section-h2">Our perspective on what's coming.</h2>
        </div>
        <div className="research-grid">
          {researchCards.map((card, index) => (
            <a
              href={card.href}
              target="_blank"
              rel="noopener"
              className={`research-card reveal${index > 0 ? ` reveal-d${index > 3 ? 3 : index > 1 ? 2 : 1}` : ''
                }`}
              key={card.title}
            >
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
  );
}
