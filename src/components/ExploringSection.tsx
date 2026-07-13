import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { exploringItems } from '../data';

export function ExploringSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="exploring" className="section ex-section" aria-label="What We're Exploring">
      <div className="ex-grid" aria-hidden="true" />
      <div className="ex-radial" aria-hidden="true" />

      <div className="container ex-container">
        {/* ── HEADER ─────────────────────────── */}
        <div className="ex-header reveal">

          <h2 className="ex-heading">
            We are currently
            <br />
            researching infrastructure
            <br />
            across:
          </h2>
        </div>

        {/* ── ROWS ───────────────────────────── */}
        <div className="ex-rows">
          {exploringItems.map((item, index) => {
            const isOpen = openIndex === index;
            const num = String(index + 1).padStart(2, '0');

            return (
              <div
                key={item.title}
                className={`ex-row${isOpen ? ' ex-row--open' : ''}`}
                onClick={() => toggle(index)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(index);
                  }
                }}
              >
                {/* Left: index */}
                <span className="ex-num">{num}</span>

                {/* Center: title + collapsible description */}
                <div className="ex-center">
                  <div className="ex-title-text">{item.title}</div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="ex-desc-wrap"
                        initial={{ height: 0, opacity: 0, y: -6 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -6 }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                      >
                        <p className="ex-description">{item.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right: + / × button */}
                <motion.span
                  className="ex-plus"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
