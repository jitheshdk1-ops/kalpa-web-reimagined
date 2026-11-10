import React, { useState, useEffect } from 'react';

export default function Header() {
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveLink(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Far Left Logo */}
        <a href="#home" className="brand-logo" aria-label="Kalpa Media Home">
          <img src="/assets/images/kalpa-logo.png" alt="Kalpa Media Logo" className="brand-icon" />
        </a>

        {/* Center Navigation Links */}
        <nav aria-label="Primary Navigation">
          <ul className="navbar-nav">
            <li>
              <a
                href="#home"
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                onClick={() => setActiveLink('home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={`nav-link ${activeLink === 'services' ? 'active' : ''}`}
                onClick={() => setActiveLink('services')}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className={`nav-link ${activeLink === 'portfolio' ? 'active' : ''}`}
                onClick={() => setActiveLink('portfolio')}
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                onClick={() => setActiveLink('about')}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveLink('contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Far Right CTA Button */}
        <div className="header-action">
          <a href="#contact" className="btn btn-pill-primary">Contact us</a>
        </div>
      </div>
    </header>
  );
}
