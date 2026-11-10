import React from 'react';

export default function BentoGrid() {
  return (
    <section className="bento-section">
      <div className="container">
        <div className="bento-grid reveal-group">
          {/* Card 1: Solid Black Background */}
          <article className="bento-card card reveal-card bento-card-1">
            <div className="card-bg-shape"></div>
            <div className="bento-card-content">
              <div className="bento-card-top">
                <span className="card-pill-tag tag-dark">
                  <span className="tag-dot-yellow"></span> Identity
                </span>
              </div>
              <div className="bento-card-bottom">
                <div className="card-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="48"
                    height="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                    <path d="M2 2l7.586 7.586"></path>
                    <circle cx="11" cy="11" r="2"></circle>
                  </svg>
                </div>
                <h3 className="bento-card-title">Visual Identity</h3>
                <p className="bento-card-desc">
                  Crafting memorable brand stories and cohesive design assets that resonate with your target audience.
                </p>
              </div>
            </div>
          </article>

          {/* Card 2: Solid Black with Vibrant Yellow Kinetic Streaks */}
          <article className="bento-card card reveal-card bento-card-2">
            <div className="card-bg-shape"></div>
            <img src="/assets/images/card-impact.svg" alt="Digital Platforms background" className="bento-card-bg" />
            <div className="bento-card-overlay"></div>
            <div className="bento-card-content">
              <div className="bento-card-top">
                <span className="card-pill-tag tag-dark">
                  <span className="tag-dot-yellow"></span> Platforms
                </span>
              </div>
              <div className="bento-card-bottom">
                <div className="card-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="48"
                    height="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="18" rx="2.5"></rect>
                    <line x1="2" y1="8" x2="22" y2="8"></line>
                    <circle cx="5" cy="5.5" r="0.8" fill="currentColor"></circle>
                    <circle cx="8" cy="5.5" r="0.8" fill="currentColor"></circle>
                    <circle cx="11" cy="5.5" r="0.8" fill="currentColor"></circle>
                    <path d="M7 13l2.5 2.5L7 18"></path>
                    <line x1="12.5" y1="18" x2="17" y2="18"></line>
                  </svg>
                </div>
                <h3 className="bento-card-title">Digital Platforms</h3>
                <p className="bento-card-desc">
                  Building responsive, high-converting websites and custom e-commerce storefronts tailored to your business.
                </p>
              </div>
            </div>
          </article>

          {/* Card 3: Solid Black with Yellow Neon Speed Stream */}
          <article className="bento-card card reveal-card bento-card-3">
            <div className="card-bg-shape"></div>
            <img src="/assets/images/card-creative.svg" alt="Growth Marketing background" className="bento-card-bg" />
            <div className="bento-card-overlay"></div>
            <div className="bento-card-content">
              <div className="bento-card-top">
                <span className="card-pill-tag tag-dark">
                  <span className="tag-dot-yellow"></span> Marketing
                </span>
              </div>
              <div className="bento-card-bottom">
                <div className="card-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="48"
                    height="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="14"></line>
                    <line x1="6" y1="20" x2="6" y2="17"></line>
                    <polyline points="3 13 9 7 14 11 21 3"></polyline>
                    <polyline points="16 3 21 3 21 8"></polyline>
                  </svg>
                </div>
                <h3 className="bento-card-title">Growth Marketing</h3>
                <p className="bento-card-desc">
                  Driving measurable engagement through targeted social media campaigns and data-driven strategies.
                </p>
              </div>
            </div>
          </article>

          {/* Card 4: Solid Black Background with Yellow Heading */}
          <article className="bento-card card reveal-card bento-card-4">
            <div className="card-bg-shape"></div>
            <div className="bento-card-content">
              <div className="bento-card-top">
                <span className="card-pill-tag tag-dark">
                  <span className="tag-dot-yellow"></span> Content
                </span>
              </div>
              <div className="bento-card-bottom">
                <div className="card-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="48"
                    height="48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
                  </svg>
                </div>
                <h3 className="bento-card-title">Dynamic Content</h3>
                <p className="bento-card-desc">
                  Captivating your audience with striking motion graphics and innovative visual storytelling.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
