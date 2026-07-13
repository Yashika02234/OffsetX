interface NavbarProps {
  scrolled: boolean;
}

export function Navbar({ scrolled }: NavbarProps) {
  return (
    <nav className={`main-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <span className="wordmark">OFFSETX</span>
        <div className="nav-links" role="navigation">
          <a href="#why-now" className="nav-link">
            WHY NOW
          </a>
          <a href="#learning" className="nav-link">
            WHAT WE'RE LEARNING
          </a>
          <a href="#research" className="nav-link">
            RESEARCH
          </a>
          <a href="#follow" className="nav-cta">
            JOIN EARLY ACCESS <span className="arr">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
