import { learningItems } from '../data';

export function LearningSection() {
  return (
    <section id="learning" className="section" aria-label="What We're Learning">
      <div className="container">
        <div className="section-header reveal">
          <span className="eyebrow">05 — WHAT WE'RE LEARNING</span>
          <h2 className="section-h2">
            We've spoken with carbon consultants, sustainability leaders, project developers,
            policy experts, and international climate practitioners across India, Europe, the
            Middle East, and North America.
          </h2>
        </div>
        <div className="learning-grid">
          {learningItems.map((item, index) => (
            <article
              key={item.title}
              className={`learning-card reveal${index > 0 ? ` reveal-d${index > 2 ? 2 : 1}` : ''}`}
            >
              <div className="learning-title">{item.title}</div>
              <p className="learning-quote">"{item.quote}"</p>
              <div className="learning-mentions">{item.mentions} mentions</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
