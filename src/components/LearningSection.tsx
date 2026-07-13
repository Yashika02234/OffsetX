import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { learningItems } from '../data';

const AUTOPLAY_DELAY = 5000;
const RESUME_DELAY = 3000;

const slideVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? 70 : -70,
    opacity: 0,
    filter: 'blur(8px)',
  }),
  center: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -70 : 70,
    opacity: 0,
    filter: 'blur(8px)',
  }),
};

const springTransition = {
  duration: 1.4,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
};

export function LearningSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Touch support
  const touchStartX = useRef<number | null>(null);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % learningItems.length);
    }, AUTOPLAY_DELAY);
  }, []);

  const pauseThenResume = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(startAutoPlay, RESUME_DELAY);
  }, [startAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
  }, [startAutoPlay]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % learningItems.length);
    pauseThenResume();
  }, [pauseThenResume]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + learningItems.length) % learningItems.length);
    pauseThenResume();
  }, [pauseThenResume]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      pauseThenResume();
    },
    [currentIndex, pauseThenResume],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  const item = learningItems[currentIndex];

  return (
    <section
      id="learning"
      className="section ls-section"
      aria-label="What We're Learning"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animated background grid */}
      <div className="ls-grid" aria-hidden="true" />
      <div className="ls-radial" aria-hidden="true" />
      <div className="ls-glow" aria-hidden="true" />

      <div className="container ls-container">
        {/* ── TOP ─────────────────────────────────────── */}
        <div className="ls-top reveal">

          <h2 className="ls-heading">
            We've spoken with carbon consultants, sustainability leaders,
            project developers, policy experts, and international climate
            practitioners across India, Europe, the Middle East, and North America.
          </h2>
        </div>

        {/* ── DIVIDER ─────────────────────────────────── */}
        <div className="ls-divider" />

        {/* ── BOTTOM SLIDER ───────────────────────────── */}
        <div className="ls-bottom">
          <div className="ls-quote-mark" aria-hidden="true">"</div>

          <div className="ls-slide-area">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={springTransition}
                className="ls-card"
                role="group"
                aria-label={`Slide ${currentIndex + 1} of ${learningItems.length}`}
              >
                <p className="ls-quote-text">{item.quote}</p>
                <div className="ls-meta">
                  <span className="ls-meta-title">{item.title}</span>
                  <span className="ls-meta-badge">{item.mentions} MENTIONS</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── NAV ROW ─────────────────────────────── */}
          <div className="ls-nav-row">
            {/* Dot indicators */}
            <div className="ls-dots" role="tablist" aria-label="Slide navigation">
              {learningItems.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`ls-dot${i === currentIndex ? ' ls-dot--active' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="ls-arrows" aria-label="Slider controls">
              <button
                className="ls-arrow"
                onClick={goPrev}
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                className="ls-arrow"
                onClick={goNext}
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
