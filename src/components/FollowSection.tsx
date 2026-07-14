import { useState } from 'react';

export function FollowSection() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleSubmit = async () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValid) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setServerError(false);
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) throw new Error('Server error');
      setSubmitted(true);
    } catch {
      setServerError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="follow" aria-label="Follow our journey">
      <div className="container">

        <h2 className="follow-h2 reveal reveal-d1">Be among the first organisations
          to access OffsetX.</h2>
        <p className="follow-sub reveal reveal-d2">
          We're onboarding a select group of compliance teams and carbon market participants. No commitment required — just early access.
        </p>

        {!submitted ? (
          <div className="email-row reveal reveal-d3" id="email-form">
            <input
              type="email"
              className={`email-input${emailError ? ' invalid' : ''}`}
              placeholder="your@email.com"
              aria-label="Email address"
              value={email}
              disabled={loading}
              onChange={(event) => {
                setEmail(event.target.value);
                if (emailError) setEmailError(false);
                if (serverError) setServerError(false);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <button
              className="email-submit"
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'SENDING…' : <>STAY UPDATED <span className="arr">→</span></>}
            </button>
            {serverError && (
              <p style={{ color: '#e05a5a', fontSize: '12px', marginTop: '8px', width: '100%' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        ) : (
          <div className="success-msg" role="status">
            <div className="success-icon">
              <div className="success-dot" />
            </div>
            <div>
              <div className="success-text-label">YOU'RE IN</div>
              <div className="success-text-body">
                If you work in carbon compliance, reach out at hello@offsetx.ai.
              </div>
            </div>
          </div>
        )}

        <div className="follow-links reveal reveal-d3">
          <a
            href="https://www.linkedin.com/in/iamsahilkhan/"
            target="_blank"
            rel="noopener"
            className="follow-link"
          >
            Follow on LinkedIn
          </a>
          <a href="mailto:hello@offsetx.ai" className="follow-link">
            hello@offsetx.ai
          </a>
          <a href="mailto:hello@offsetx.ai?subject=Early%20Access" className="follow-link">
            Request early access
          </a>
        </div>
      </div>
    </section>
  );
}
