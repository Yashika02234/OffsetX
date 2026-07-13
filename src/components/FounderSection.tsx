import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.32, 0.72, 0, 1] as const;

export function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section id="founder" className="section fn-section" aria-label="Founder Note">
      {/* Background */}
      <div className="fn-grid" aria-hidden="true" />
      <div className="fn-radial" aria-hidden="true" />

      <div className="container fn-container">
        <div className="fn-layout" ref={ref}>

          {/* ── LEFT COLUMN ─────────────────────────── */}
          <div className="fn-left">
            {/* Square initials badge */}
            <motion.div
              className="fn-badge"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              aria-label="Sahil Khan"
            >
              SK
            </motion.div>

            {/* Rotated label */}
            <motion.div
              className="fn-rotated-label"
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              aria-hidden="true"
            >
              FOUNDER'S NOTE
            </motion.div>
          </div>

          {/* ── VERTICAL LINE ───────────────────────── */}
          <div className="fn-line-col" aria-hidden="true">
            <motion.div
              className="fn-line"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* ── RIGHT COLUMN ────────────────────────── */}
          <div className="fn-right">
            <motion.blockquote
              className="fn-quote"
              initial={{ opacity: 0, y: 28, filter: 'blur(5px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              Every week we speak with project developers, sustainability leaders, auditors,
              policy experts, and climate practitioners to understand where carbon markets are
              heading. OffsetX is being built from these conversations — not assumptions.
            </motion.blockquote>

            <motion.div
              className="fn-signature"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.55, ease }}
            >
              — SAHIL KHAN, FOUNDER · OFFSETX
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
