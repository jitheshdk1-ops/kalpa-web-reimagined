import React from 'react';
import { getAssetUrl } from '../../utils/asset';

const clientLogos = Array.from({ length: 12 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    id: i + 1,
    src: getAssetUrl(`assets/images/clients/client-logo-${num}.png`),
    alt: `Trusted Partner Logo ${i + 1}`,
  };
});

export default function TrustedPartners() {
  return (
    <section className="partners-section" id="partners" aria-label="Our Trusted Partners">
      <div className="container partners-header-container reveal-item">
        <h2 className="partners-heading">Our Trusted Partners</h2>
      </div>

      <div
        className="partners-marquee-wrapper reveal-item"
        style={{ transitionDelay: '0.15s' }}
        aria-label="Our Trusted Partners Carousel"
      >
        <div className="partners-track">
          {/* Logo Set 1 (Original) */}
          <div className="partners-group">
            {clientLogos.map((logo) => (
              <div key={`set1-${logo.id}`} className="partner-logo-item">
                <img src={logo.src} alt={logo.alt} className="partner-logo-img" loading="lazy" />
              </div>
            ))}
          </div>

          {/* Logo Set 2 (Duplicate for Seamless Loop) */}
          <div className="partners-group" aria-hidden="true">
            {clientLogos.map((logo) => (
              <div key={`set2-${logo.id}`} className="partner-logo-item">
                <img src={logo.src} alt="" className="partner-logo-img" loading="lazy" />
              </div>
            ))}
          </div>

          {/* Logo Set 3 (Duplicate for Ultrawide Screens) */}
          <div className="partners-group" aria-hidden="true">
            {clientLogos.map((logo) => (
              <div key={`set3-${logo.id}`} className="partner-logo-item">
                <img src={logo.src} alt="" className="partner-logo-img" loading="lazy" />
              </div>
            ))}
          </div>

          {/* Logo Set 4 (Duplicate for Ultrawide Screens) */}
          <div className="partners-group" aria-hidden="true">
            {clientLogos.map((logo) => (
              <div key={`set4-${logo.id}`} className="partner-logo-item">
                <img src={logo.src} alt="" className="partner-logo-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
