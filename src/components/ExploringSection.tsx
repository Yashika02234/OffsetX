import { exploringItems } from '../data';

export function ExploringSection() {
  return (
    <section id="exploring" className="section" aria-label="What We're Exploring">
      <div className="container">
        <div className="section-header reveal">
          <span className="eyebrow">06 — WHAT WE'RE EXPLORING</span>
          <h2 className="section-h2">We are currently researching infrastructure across:</h2>
        </div>
        <div className="exploring-grid">
          {exploringItems.map((item, index) => (
            <div
              key={item.title}
              className={`explore-card reveal${index > 0 ? ` reveal-d${index > 2 ? 2 : 1}` : ''}`}
            >
              <div className="explore-title">{item.title}</div>
              <p className="explore-body">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
