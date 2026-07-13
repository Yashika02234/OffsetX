import { counters } from '../data';

interface CountersSectionProps {
  counterValues: number[];
}

export function CountersSection({ counterValues }: CountersSectionProps) {
  return (
    <div id="counters" aria-label="Research scope">
      <div className="container">
        <div className="counter-grid">
          {counters.map((counter, index) => (
            <div className="counter-cell" key={counter.label}>
              <div
                className="counter-num"
                data-target={counter.value}
                data-suffix={counter.suffix}
                data-index={index}
              >
                {counterValues[index]}
                {index === 0 || index === 1 || index === 3 ? (
                  <span className="counter-suffix">{counter.suffix}</span>
                ) : null}
              </div>
              <div
                className="counter-label"
                dangerouslySetInnerHTML={{ __html: counter.label }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
