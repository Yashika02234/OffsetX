import { useEffect, useState } from 'react';
import { counters } from '../data';

export function useCounterAnimation() {
  const [counterValues, setCounterValues] = useState<number[]>(
    Array(counters.length).fill(0),
  );

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('.counter-num[data-target]'),
    );
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

  return counterValues;
}
