import { whyNowItems } from '../data';

export function WhyNowSection() {
  return (
    <section id="why-now" className="section" aria-label="Why Now">
      <div className="container">
        <div className="section-header reveal">

          <h2 className="section-h2">
            Climate markets are entering a new era of accountability.
          </h2>
        </div>
        <div className="problem-grid">
          {whyNowItems.map((item, index) => (
            <div
              key={item.tag}
              className={`prob-card reveal${index > 0 ? ` reveal-d${index > 2 ? 2 : 1}` : ''}`}
            >
              <span className="prob-tag">{item.tag}</span>
              <div className="prob-title">{item.title}</div>
              <div className="prob-body">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
