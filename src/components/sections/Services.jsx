import React from 'react';
import { getAssetUrl } from '../../utils/asset';

const serviceCards = [
  {
    id: 'brand-strategy',
    title: 'Brand Strategy & Identity',
    desc: 'We build iconic visual identities and strategic brand foundations designed to elevate ambitious companies into uncontested cultural market leaders.',
    mediaImg: getAssetUrl('assets/images/mockup-branding.svg'),
    mediaAlt: 'Brand Strategy and Identity Mockup',
    deliverables: [
      'Logo Design & Icons',
      'Color Palette Development',
      'Typography & Brand Guides',
      'Brand Positioning Playbook',
    ],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Strategy & Design',
    desc: 'Engineering fluid, user-centered digital storefronts and bespoke web platforms calibrated for frictionless usability, maximum engagement, and rapid conversion.',
    mediaImg: getAssetUrl('assets/images/mockup-uiux.svg'),
    mediaAlt: 'UI/UX Strategy and Design Mockup',
    deliverables: [
      'UI/UX Strategy & Wireframing',
      'Custom Web & App Interfaces',
      'Design Systems & Component Kits',
      'High-Converting Landing Pages',
    ],
  },
  {
    id: 'packaging-content',
    title: 'Packaging & Dynamic Content',
    desc: 'Creating tactile retail packaging and scroll-stopping visual motion assets that dominate physical shelves and drive exponential engagement on digital feeds.',
    mediaImg: getAssetUrl('assets/images/mockup-packaging.svg'),
    mediaAlt: 'Packaging and Dynamic Content Mockup',
    deliverables: [
      'Bespoke Packaging & Box Art',
      '3D Product Visualization',
      'Motion Graphics & Reels',
      'Social Media Content Assets',
    ],
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    desc: 'We execute data-driven ad campaigns and targeted optimization strategies to maximize your ROI and scale your digital growth efficiently.',
    mediaImg: getAssetUrl('assets/images/mockup-marketing.svg'),
    mediaAlt: 'Performance Marketing and Analytics Mockup',
    deliverables: [
      'Search Engine Optimization (SEO)',
      'Meta & Google Ads',
      'Conversion Rate Optimization',
      'Analytics & Reporting',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="services-two-col">
          {/* Left Column (Sticky Header) */}
          <aside className="services-sticky-col">
            <div className="services-sticky-inner reveal-group">
              <div className="services-pill reveal-item">
                <span className="services-pill-dot"></span>
                <span>Services</span>
              </div>
              <h2 className="services-sticky-title reveal-item" style={{ transitionDelay: '0.14s' }}>
                Our Expertise
              </h2>
              <p className="services-sticky-subtext reveal-item" style={{ transitionDelay: '0.28s' }}>
                Comprehensive creative disciplines designed to transform bold visions into high-impact market presence.
              </p>
            </div>
          </aside>

          {/* Right Column (Card Stack) */}
          <div className="services-stack-col">
            {serviceCards.map((service) => (
              <article key={service.id} className="service-card reveal-card">
                <div className="service-card-top">
                  <div className="card-media-wrap">
                    <img
                      src={service.mediaImg}
                      alt={service.mediaAlt}
                      className="card-media-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-deliverables-wrap">
                    <ul className="service-deliverables">
                      {service.deliverables.map((item, index) => (
                        <li key={index}>
                          <span className="yellow-bullet-square"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="service-card-bottom">
                  <h3 className="card-service-title">{service.title}</h3>
                  <p className="card-service-desc">{service.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
