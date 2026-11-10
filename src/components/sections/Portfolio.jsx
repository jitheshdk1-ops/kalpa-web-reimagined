import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getAssetUrl } from '../../utils/asset';

const portfolioProjects = [
  {
    id: 1,
    img: getAssetUrl('assets/images/portfolio/portfolio-01-greensynth.jpg'),
    alt: 'GreenSynth Herbals Logo & Identity',
  },
  {
    id: 2,
    img: getAssetUrl('assets/images/portfolio/portfolio-02-hro.jpg'),
    alt: 'HRO Natural Stones 3D Brand Mark',
  },
  {
    id: 3,
    img: getAssetUrl('assets/images/portfolio/portfolio-03-didyuh-white.jpg'),
    alt: 'Didyuh Innovations Minimal Logo',
  },
  {
    id: 4,
    img: getAssetUrl('assets/images/portfolio/portfolio-04-farmbandi.jpg'),
    alt: 'Farm Bandi Finger Millet Noodles Packaging',
  },
  {
    id: 5,
    img: getAssetUrl('assets/images/portfolio/portfolio-05-didyuh-dark.jpg'),
    alt: 'Didyuh Innovations Monogram Design',
  },
  {
    id: 6,
    img: getAssetUrl('assets/images/portfolio/portfolio-06-hrudayam.jpg'),
    alt: 'Hrudayam Calligraphy Brand Emblem',
  },
  {
    id: 7,
    img: getAssetUrl('assets/images/portfolio/portfolio-07-marines-crown.jpg'),
    alt: 'Marines Crown Seafood Packaging',
  },
  {
    id: 8,
    img: getAssetUrl('assets/images/portfolio/portfolio-08-parishudd.jpg'),
    alt: 'Parishudd Urad Dal Packaging Pouch',
  },
  {
    id: 9,
    img: getAssetUrl('assets/images/portfolio/portfolio-09-rk-foods.jpg'),
    alt: 'RK Foods Festive Chariots Artwork',
  },
  {
    id: 10,
    img: getAssetUrl('assets/images/portfolio/portfolio-10-swaram.jpg'),
    alt: 'Swaram Flute Musical Brand Identity',
  },
  {
    id: 11,
    img: getAssetUrl('assets/images/portfolio/portfolio-11-atinav.jpg'),
    alt: 'Atinav Enterprises 3D Monogram',
  },
  {
    id: 12,
    img: getAssetUrl('assets/images/portfolio/portfolio-01-greensynth.jpg'),
    alt: 'GreenSynth Herbals Creative Design',
  },
];

const processAreas = [
  { num: '01', title: 'Strategy & Planning', delay: '0s' },
  { num: '02', title: 'Design & Development', delay: '0.14s' },
  { num: '03', title: 'Launch & Growth', delay: '0.28s' },
  { num: '04', title: 'Ongoing Support', delay: '0.42s' },
];

export default function Portfolio() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const galleryViewport = viewportRef.current;
    const galleryTrack = trackRef.current;

    if (!galleryViewport || !galleryTrack) return;

    let arcTween = null;
    let isDragging = false;
    let startX = 0;
    let lastClientX = 0;
    let dragStartProgress = 0;
    let currentMoveDir = -1; // -1 for leftward movement (autoplay), +1 for rightward
    let targetMoveDir = -1;

    const cards = Array.from(galleryTrack.querySelectorAll('.portfolio-card'));
    const totalImages = cards.length;
    if (totalImages === 0) return;

    // Shared linear progress object (in pixels along the arc)
    const animObj = { progress: 0 };
    // Movement speed: strictly constant 72 pixels per second
    const SPEED_PX_PER_SEC = 72;

    const getFixedSpacing = () => {
      const vw = galleryViewport.offsetWidth || window.innerWidth;
      let cardWidth = 280;
      if (cards.length > 0 && cards[0].offsetWidth) {
        cardWidth = cards[0].offsetWidth;
      } else if (vw <= 480) {
        cardWidth = 170;
      } else if (vw <= 640) {
        cardWidth = 190;
      } else if (vw <= 860) {
        cardWidth = 230;
      }

      if (vw <= 480) {
        return Math.round(cardWidth + 14);
      } else if (vw <= 640) {
        return Math.round(cardWidth + 18);
      } else if (vw <= 860) {
        return Math.round(cardWidth + 24);
      } else if (vw <= 1024) {
        return Math.round(cardWidth + 28);
      }
      return 315;
    };

    const renderHalfCircleArc = (globalProgress, moveDir = -1) => {
      const viewportWidth = galleryViewport.offsetWidth || window.innerWidth;

      // 10X Expanded Circular Rotation Path Parameters
      const R = Math.max(5000, Math.min(viewportWidth * 4.2, 7500));
      const X_ref = Math.max(680, viewportWidth * 0.52);
      const Z_depth = viewportWidth <= 640 ? 160 : 280;
      const H_curve = viewportWidth <= 640 ? 45 : 85;
      const maxTilt = 25;

      const fixedSpacing = getFixedSpacing();
      const totalLength = totalImages * fixedSpacing;
      const halfLength = totalLength / 2;

      const p = ((globalProgress % totalLength) + totalLength) % totalLength;

      const fadeStart = Math.max(960, viewportWidth * 0.65);
      const fadeEnd = Math.max(1400, viewportWidth * 0.88);
      const maxSlope = 2 * (Z_depth / X_ref);

      for (let i = 0; i < totalImages; i++) {
        const card = cards[i];

        const s = (p + i * fixedSpacing) % totalLength;
        const arcDist = halfLength - s;

        const theta = arcDist / R;
        const x = R * Math.sin(theta);
        const absX = Math.abs(x);

        if (absX >= fadeEnd) {
          card.style.opacity = '0';
          card.style.visibility = 'hidden';
          card.style.pointerEvents = 'none';
          continue;
        }

        let opacity = 1;
        if (absX > fadeStart) {
          opacity = Math.max(0, 1 - (absX - fadeStart) / (fadeEnd - fadeStart));
        }

        const u = Math.max(-1.3, Math.min(1.3, x / X_ref));
        const u2 = u * u;

        const y = -H_curve * u2;
        const z = Z_depth * u2;

        const slope = maxSlope * u;
        const tangentRatio = Math.atan(slope) / Math.atan(maxSlope);
        const rotY = moveDir * tangentRatio * maxTilt;

        const rotZ = u * 1.5;
        const scale = 0.90 + 0.22 * u2;

        card.style.visibility = 'visible';
        card.style.opacity = opacity.toFixed(3);
        card.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
        card.style.zIndex = Math.round(1000 + z);
        card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }
    };

    const setupArcAnimation = () => {
      if (totalImages === 0) return;

      if (arcTween) {
        arcTween.kill();
      }

      gsap.set(galleryTrack, { x: 0, y: 0 });

      const fixedSpacing = getFixedSpacing();
      const totalLength = totalImages * fixedSpacing;

      currentMoveDir = -1;
      targetMoveDir = -1;
      renderHalfCircleArc(animObj.progress, currentMoveDir);

      const cycleDuration = totalLength / SPEED_PX_PER_SEC;

      arcTween = gsap.to(animObj, {
        progress: animObj.progress + totalLength,
        duration: cycleDuration,
        ease: 'none',
        repeat: -1,
        onUpdate: () => {
          renderHalfCircleArc(animObj.progress, -1);
        },
      });
    };

    setupArcAnimation();

    let resizeTimeout = null;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupArcAnimation();
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Pointer Drag & Touch Scrub Handlers
    const onPointerDown = (e) => {
      if (!arcTween) return;
      isDragging = true;
      startX = e.clientX;
      lastClientX = e.clientX;
      dragStartProgress = animObj.progress;
      galleryViewport.style.cursor = 'grabbing';
      galleryViewport.setPointerCapture(e.pointerId);
      arcTween.pause();
    };

    const onPointerMove = (e) => {
      if (!isDragging || !arcTween) return;
      const dx = e.clientX - startX;
      const stepDeltaX = e.clientX - lastClientX;
      lastClientX = e.clientX;

      animObj.progress = dragStartProgress - dx * 1.25;

      if (Math.abs(stepDeltaX) > 0.5) {
        targetMoveDir = stepDeltaX > 0 ? 1 : -1;
      }
      currentMoveDir += (targetMoveDir - currentMoveDir) * 0.25;

      renderHalfCircleArc(animObj.progress, currentMoveDir);
    };

    const endDrag = (e) => {
      if (!isDragging || !arcTween) return;
      isDragging = false;
      galleryViewport.style.cursor = 'grab';
      try {
        galleryViewport.releasePointerCapture(e.pointerId);
      } catch (err) {}

      const fixedSpacing = getFixedSpacing();
      const totalLength = totalImages * fixedSpacing;
      const currentP = ((animObj.progress % totalLength) + totalLength) % totalLength;
      animObj.progress = currentP;

      targetMoveDir = -1;
      currentMoveDir = -1;

      arcTween.kill();
      arcTween = gsap.to(animObj, {
        progress: currentP + totalLength,
        duration: totalLength / SPEED_PX_PER_SEC,
        ease: 'none',
        repeat: -1,
        onUpdate: () => {
          renderHalfCircleArc(animObj.progress, -1);
        },
      });
    };

    galleryViewport.addEventListener('pointerdown', onPointerDown);
    galleryViewport.addEventListener('pointermove', onPointerMove);
    galleryViewport.addEventListener('pointerup', endDrag);
    galleryViewport.addEventListener('pointercancel', endDrag);

    return () => {
      if (arcTween) arcTween.kill();
      window.removeEventListener('resize', handleResize);
      galleryViewport.removeEventListener('pointerdown', onPointerDown);
      galleryViewport.removeEventListener('pointermove', onPointerMove);
      galleryViewport.removeEventListener('pointerup', endDrag);
      galleryViewport.removeEventListener('pointercancel', endDrag);
    };
  }, []);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container portfolio-container">
        {/* Section Header Area */}
        <div className="portfolio-header reveal-group">
          <div className="portfolio-pill-badge reveal-item">
            <span className="portfolio-badge-dot"></span>
            <span>Our Portfolio</span>
          </div>
          <h2 className="portfolio-title reveal-item" style={{ transitionDelay: '0.12s' }}>
            Behind The Creative Work
          </h2>
          <p className="portfolio-subtitle reveal-item" style={{ transitionDelay: '0.24s' }}>
            Explore a collection of our creative projects, visual identities, digital experiences, branding, and design
            solutions.
          </p>
          <div className="portfolio-cta-wrap reveal-item" style={{ transitionDelay: '0.36s' }}>
            <a href="#contact" className="btn-portfolio-pill">
              <span>See more Projects</span>
              <svg
                className="portfolio-arrow-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>

        {/* Seamless Infinite Horizontal Looping Project Gallery */}
        <div
          className="portfolio-gallery-viewport reveal-item"
          style={{ transitionDelay: '0.15s' }}
          id="portfolio-gallery-viewport"
          ref={viewportRef}
          aria-label="Behind the Designs Animated Project Gallery"
        >
          <div className="portfolio-gallery-track" id="portfolio-gallery-track" ref={trackRef}>
            {portfolioProjects.map((project, idx) => (
              <div key={`${project.id}-${idx}`} className="portfolio-card">
                <img src={project.img} alt={project.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* 4 Process Focus Areas */}
        <div className="portfolio-process-row reveal-group">
          {processAreas.map((area) => (
            <div
              key={area.num}
              className="portfolio-process-item reveal-item"
              style={{ transitionDelay: area.delay }}
            >
              <div className="process-number">
                <span className="process-hash">#</span>
                <span className="process-digit">{area.num}</span>
              </div>
              <h4 className="process-title">{area.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
