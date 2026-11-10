import React from 'react';
import { getAssetUrl } from '../../utils/asset';

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container reveal-group">
        {/* Top Centered Logo Mark */}
        <div className="footer-top-mark reveal-item">
          <a href="#home" aria-label="Kalpa Media Home">
            <img
              src={getAssetUrl('assets/images/kalpa-footer-logo.png')}
              alt="Kalpa Media — The Smart Design Agency"
              className="footer-logo-img"
            />
          </a>
        </div>

        {/* Bottom Copyright & Navigation Bar */}
        <div className="bottom-bar-inner reveal-item" style={{ transitionDelay: '0.16s' }}>
          <p>&copy; 2026 Kalpa Media. All rights reserved. Creative &amp; Design Agency.</p>
          <ul className="bottom-links">
            <li><a href="#home">Privacy Policy</a></li>
            <li><a href="#services">Terms of Service</a></li>
            <li><a href="#portfolio">Instagram</a></li>
            <li><a href="#contact">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
