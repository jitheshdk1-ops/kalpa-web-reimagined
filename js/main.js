/**
 * Kinetic Studio — Main JavaScript
 * Handles scroll-triggered canvas image sequence scrubbing, micro-interactions,
 * service card state switching, and active nav states.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Kinetic Studio scripts loaded & initialized successfully.');

  // =========================================================================
  // 1. Hero Scroll-Triggered Image Sequence Canvas Scrubbing
  // =========================================================================
  const heroContainer = document.getElementById('hero-scroll-container');
  const heroCanvas = document.getElementById('hero-canvas');
  const heroUiLayer = document.getElementById('hero-ui-layer');

  if (heroCanvas && heroContainer) {
    const ctx = heroCanvas.getContext('2d');
    const TOTAL_FRAMES = 190;
    const frames = new Array(TOTAL_FRAMES);
    let targetFrameIndex = 0;
    let renderPending = false;

    // Helper to format frame path (frame_000001.png to frame_000190.png)
    const getFramePath = (index) => {
      const padded = String(index).padStart(6, '0');
      return `assets/images/slides/frame_${padded}.png`;
    };

    // Find the closest loaded frame to prevent any blank screen or flicker
    const getClosestLoadedFrame = (index) => {
      if (frames[index] && frames[index].complete && frames[index].naturalWidth > 0) {
        return frames[index];
      }
      for (let i = index - 1; i >= 0; i--) {
        if (frames[i] && frames[i].complete && frames[i].naturalWidth > 0) {
          return frames[i];
        }
      }
      for (let i = index + 1; i < TOTAL_FRAMES; i++) {
        if (frames[i] && frames[i].complete && frames[i].naturalWidth > 0) {
          return frames[i];
        }
      }
      return null;
    };

    // Draw frame onto canvas using CSS object-fit: cover math
    const render = () => {
      renderPending = false;
      const img = getClosestLoadedFrame(targetFrameIndex);
      if (!img || !ctx) return;

      const cw = heroCanvas.width;
      const ch = heroCanvas.height;
      if (cw === 0 || ch === 0) return;

      const iw = img.naturalWidth || 1280;
      const ih = img.naturalHeight || 720;

      // Aspect-ratio cover math
      const scale = Math.max(cw / iw, ch / ih);
      const renderW = iw * scale;
      const renderH = ih * scale;
      const offsetX = (cw - renderW) / 2;
      const offsetY = (ch - renderH) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    };

    const requestRender = () => {
      if (!renderPending) {
        renderPending = true;
        requestAnimationFrame(render);
      }
    };

    // Canvas sizing setup with DPI scaling
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = heroCanvas.clientWidth || window.innerWidth;
      const height = heroCanvas.clientHeight || window.innerHeight;

      heroCanvas.width = width * dpr;
      heroCanvas.height = height * dpr;
      requestRender();
    };

    // Preloading Logic
    const preloadFrames = () => {
      // 1. Immediately load frame 1 and render upon arrival
      const firstImg = new Image();
      firstImg.src = getFramePath(1);
      firstImg.onload = () => {
        frames[0] = firstImg;
        requestRender();
      };
      frames[0] = firstImg;

      // 2. Preload remaining frames into memory
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          if (i - 1 === targetFrameIndex) {
            requestRender();
          }
        };
        frames[i - 1] = img;
      }
    };

    // Scroll Progress Calculation specifically within #hero-scroll-container
    const onScroll = () => {
      const rect = heroContainer.getBoundingClientRect();
      const containerHeight = heroContainer.offsetHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = containerHeight - viewportHeight;

      if (maxScroll <= 0) return;

      const scrollTop = -rect.top;
      // Normalize progress between 0.0 and 1.0
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      // Map progress percentage to frame index
      const newFrameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      if (newFrameIndex !== targetFrameIndex) {
        targetFrameIndex = newFrameIndex;
        requestRender();
      }

      // Smooth scroll depth fade and subtle upward translation for the hero UI layer
      if (heroUiLayer) {
        if (progress > 0.38) {
          const fadeProgress = (progress - 0.38) / 0.45;
          const opacity = Math.max(0, 1 - fadeProgress);
          const translateY = -(fadeProgress * 45);
          heroUiLayer.style.opacity = opacity.toFixed(3);
          heroUiLayer.style.transform = `translateY(${translateY.toFixed(1)}px)`;
          heroUiLayer.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
        } else {
          heroUiLayer.style.opacity = '1';
          heroUiLayer.style.transform = 'translateY(0px)';
          heroUiLayer.style.pointerEvents = 'auto';
        }
      }
    };

    // Initialize sequence
    resizeCanvas();
    preloadFrames();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial position evaluation
    onScroll();

    console.log(`🎬 Hero sequence initialized: ${TOTAL_FRAMES} frames preloading.`);
  }

  // =========================================================================
  // 2. Service Cards Active State Switcher (Legacy Services Deck)
  // =========================================================================
  const serviceCards = document.querySelectorAll('.services-deck .service-card');
  const activeBgSvg = 'assets/images/service-social.svg';

  serviceCards.forEach((card) => {
    card.addEventListener('click', () => {
      // Deactivate all cards
      serviceCards.forEach((c) => {
        c.classList.remove('active');
        const existingBg = c.querySelector('.service-card-bg-img');
        const existingOverlay = c.querySelector('.service-card-overlay');
        const existingBadge = c.querySelector('.active-pill-badge');
        
        if (existingBg) existingBg.remove();
        if (existingOverlay) existingOverlay.remove();
        if (existingBadge) existingBadge.remove();

        // Unwrap content wrapper if present to reset to standard layout
        const contentWrapper = c.querySelector('.service-card-content');
        if (contentWrapper) {
          while (contentWrapper.firstChild) {
            c.insertBefore(contentWrapper.firstChild, contentWrapper);
          }
          contentWrapper.remove();
        }
      });

      // Activate clicked card
      card.classList.add('active');

      // Create background image
      const bgImg = document.createElement('img');
      bgImg.src = activeBgSvg;
      bgImg.alt = 'Active service neon background';
      bgImg.className = 'service-card-bg-img';

      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'service-card-overlay';

      // Wrap existing children in content container
      const content = document.createElement('div');
      content.className = 'service-card-content';

      const tag = card.querySelector('.service-tag');
      const title = card.querySelector('.service-title');

      if (tag) content.appendChild(tag);
      
      const bottomWrap = document.createElement('div');
      if (title) bottomWrap.appendChild(title);

      const activeBadge = document.createElement('span');
      activeBadge.className = 'active-pill-badge';
      activeBadge.textContent = 'Active';
      bottomWrap.appendChild(activeBadge);

      content.appendChild(bottomWrap);

      card.appendChild(bgImg);
      card.appendChild(overlay);
      card.appendChild(content);
    });

    // Keyboard accessibility support (Enter or Space to select)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // =========================================================================
  // 3. Navigation Active State Tracking on Scroll
  // =========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        const id = section.getAttribute('id');
        currentSectionId = id === 'hero-scroll-container' ? 'home' : id;
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });

  // =========================================================================
  // 4. Smooth Pill Button Hover Spring Reaction
  // =========================================================================
  const heroBtn = document.querySelector('.btn-hero-pill');
  if (heroBtn) {
    heroBtn.addEventListener('mouseenter', () => {
      const glowIcon = heroBtn.querySelector('.pill-icon-glow');
      if (glowIcon) {
        glowIcon.style.transform = 'scale(1.08)';
        glowIcon.style.transition = 'transform 0.25s ease';
      }
    });
    heroBtn.addEventListener('mouseleave', () => {
      const glowIcon = heroBtn.querySelector('.pill-icon-glow');
      if (glowIcon) {
        glowIcon.style.transform = 'scale(1)';
      }
    });
  }

  // =========================================================================
  // 5. Universal Scroll-Triggered Entry Animation Engine
  //    (Matches "Behind The Creative Work" reference entrance behaviour)
  // =========================================================================
  const initScrollReveals = () => {
    // Respect accessibility prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-item, .reveal-card, .reveal-group').forEach((el) => {
        el.classList.add('visible', 'is-visible');
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal-item, .reveal-card, .reveal-group');
    if (revealElements.length === 0) return;

    if ('IntersectionObserver' in window) {
      const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.classList.add('visible', 'is-visible');

            // If it's a reveal-group, trigger all nested reveal-item and reveal-card children
            target.querySelectorAll('.reveal-item, .reveal-card').forEach((child) => {
              child.classList.add('visible', 'is-visible');
            });

            observer.unobserve(target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach((el) => scrollObserver.observe(el));
    } else {
      // Fallback for older browsers
      revealElements.forEach((el) => el.classList.add('visible', 'is-visible'));
    }
  };

  initScrollReveals();

  // =========================================================================
  // 6. Portfolio Master 10X Expanded Circular Rotation Arc Gallery Animation
  //    with Dynamic 25-Degree 3D Y-Axis Tilt (±25deg)
  // =========================================================================
  const portfolioSection = document.getElementById('portfolio');
  const galleryViewport = document.getElementById('portfolio-gallery-viewport') || document.getElementById('portfolio-curve-viewport');
  const galleryTrack = document.getElementById('portfolio-gallery-track') || document.getElementById('portfolio-curve-track');

  if (portfolioSection && galleryViewport && galleryTrack) {
    let arcTween = null;
    let isDragging = false;
    let startX = 0;
    let lastClientX = 0;
    let dragStartProgress = 0;
    let currentMoveDir = -1; // -1 for leftward movement (autoplay), +1 for rightward
    let targetMoveDir = -1;

    const cards = Array.from(galleryTrack.querySelectorAll('.portfolio-card, .portfolio-curve-card'));
    const totalImages = cards.length;

    // Shared linear progress object (in pixels along the arc)
    const animObj = { progress: 0 };
    // Movement speed: strictly constant 72 pixels per second
    const SPEED_PX_PER_SEC = 72;

    // Responsive spacing between adjacent cards along the circular trajectory
    // Dynamically scales spacing on smaller screens to keep a tight, cohesive gap between cards
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

    // Renders all cards along a 10X expanded circular / semicircular trajectory
    // with direction-based 3D Y-axis tilt calculated dynamically from the path tangent
    const renderHalfCircleArc = (globalProgress, moveDir = -1) => {
      const viewportWidth = galleryViewport.offsetWidth || window.innerWidth;

      // 10X Expanded Circular Rotation Path Parameters:
      // Radius of the circular rotation path (~10X base radius: ~5000px to ~7500px)
      const R = Math.max(5000, Math.min(viewportWidth * 4.2, 7500));
      // Reference width defining screen boundary normalization
      const X_ref = Math.max(680, viewportWidth * 0.52);
      // Deep 3D perspective depth pushing side cards into the dramatic foreground
      const Z_depth = viewportWidth <= 640 ? 160 : 280;
      // Graceful concave vertical smile curve height across the full viewport
      const H_curve = viewportWidth <= 640 ? 45 : 85;
      // Dynamic 3D Y-axis tilt range (up to ±25deg) based on path tangent
      const maxTilt = 25;

      const fixedSpacing = getFixedSpacing();
      const totalLength = totalImages * fixedSpacing;
      const halfLength = totalLength / 2;

      // Normalized master progress wrapped into [0, totalLength)
      const p = ((globalProgress % totalLength) + totalLength) % totalLength;

      // Edge fading limits: cards remain 100% visible across the entire screen and feather off-screen
      const fadeStart = Math.max(960, viewportWidth * 0.65);
      const fadeEnd = Math.max(1400, viewportWidth * 0.88);

      // Reference slope at the visible screen boundary for smooth tangent normalization
      const maxSlope = 2 * (Z_depth / X_ref);

      for (let i = 0; i < totalImages; i++) {
        const card = cards[i];

        // Linear arc-length distance from the gallery center along the continuous circular path
        const s = (p + i * fixedSpacing) % totalLength;
        const arcDist = halfLength - s;

        // Angle along the 10X extended circular trajectory
        const theta = arcDist / R;
        // Circular horizontal coordinate in 3D space
        const x = R * Math.sin(theta);
        const absX = Math.abs(x);

        // Off-screen culling: cards beyond the extended arc fade out and hide invisibly
        if (absX >= fadeEnd) {
          card.style.opacity = '0';
          card.style.visibility = 'hidden';
          card.style.pointerEvents = 'none';
          continue;
        }

        // Smooth edge feathering as cards enter and exit beyond the viewport boundary
        let opacity = 1;
        if (absX > fadeStart) {
          opacity = Math.max(0, 1 - (absX - fadeStart) / (fadeEnd - fadeStart));
        }

        // Normalized horizontal coordinate relative to screen edge [-1.3, 1.3]
        const u = Math.max(-1.3, Math.min(1.3, x / X_ref));
        const u2 = u * u;

        // Concave vertical smile curve
        const y = -H_curve * u2;
        // Dramatic 3D perspective depth: side cards curve closer to viewer in the foreground
        const z = Z_depth * u2;

        // Direction-based 3D Y-axis tilt calculated dynamically from path tangent (dz/dx)
        // dz/dx = 2 * (Z_depth / X_ref) * u
        const slope = maxSlope * u;
        const tangentRatio = Math.atan(slope) / Math.atan(maxSlope);
        // Tilt angle dynamically responds to movement direction and distance from center
        const rotY = moveDir * tangentRatio * maxTilt;

        // Subtle natural perspective tilt
        const rotZ = u * 1.5;
        // Progressive depth scaling from background (0.90) to foreground (1.20+)
        const scale = 0.90 + 0.22 * u2;

        card.style.visibility = 'visible';
        card.style.opacity = opacity.toFixed(3);
        card.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
        card.style.zIndex = Math.round(1000 + z);
        card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }
    };

    const setupArcAnimation = () => {
      if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Ensure gsap.min.js is included.');
        return;
      }

      if (totalImages === 0) return;

      if (arcTween) {
        arcTween.kill();
      }

      // Reset track position to ensure pure transform3d coordinate control
      gsap.set(galleryTrack, { x: 0, y: 0 });

      const fixedSpacing = getFixedSpacing();
      const totalLength = totalImages * fixedSpacing;

      // Initial render at current progress moving in default autoplay direction (-1)
      currentMoveDir = -1;
      targetMoveDir = -1;
      renderHalfCircleArc(animObj.progress, currentMoveDir);

      // Master GSAP tween providing strictly uniform velocity (px/sec)
      // duration = totalLength / SPEED_PX_PER_SEC ensures exact linear speed across all screen sizes
      const cycleDuration = totalLength / SPEED_PX_PER_SEC;

      arcTween = gsap.to(animObj, {
        progress: animObj.progress + totalLength,
        duration: cycleDuration,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          renderHalfCircleArc(animObj.progress, -1);
        }
      });
    };

    // Run setup on DOM ready, load, and timeout
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupArcAnimation);
    } else {
      setupArcAnimation();
    }

    window.addEventListener('load', setupArcAnimation);
    setTimeout(setupArcAnimation, 300);

    // Responsive recalculation on window resize (debounced)
    let resizeTimeout = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupArcAnimation();
      }, 150);
    }, { passive: true });

    // Interactive pointer dragging / touch swipe scrub
    galleryViewport.addEventListener('pointerdown', (e) => {
      if (!arcTween || typeof gsap === 'undefined') return;
      isDragging = true;
      startX = e.clientX;
      lastClientX = e.clientX;
      dragStartProgress = animObj.progress;
      galleryViewport.style.cursor = 'grabbing';
      galleryViewport.setPointerCapture(e.pointerId);
      arcTween.pause();
    });

    galleryViewport.addEventListener('pointermove', (e) => {
      if (!isDragging || !arcTween) return;
      const dx = e.clientX - startX;
      const stepDeltaX = e.clientX - lastClientX;
      lastClientX = e.clientX;

      // Convert drag displacement into linear path progress
      animObj.progress = dragStartProgress - dx * 1.25;

      // Determine movement direction dynamically from pointer delta
      if (Math.abs(stepDeltaX) > 0.5) {
        targetMoveDir = stepDeltaX > 0 ? 1 : -1;
      }
      currentMoveDir += (targetMoveDir - currentMoveDir) * 0.25;

      renderHalfCircleArc(animObj.progress, currentMoveDir);
    });

    const endDrag = (e) => {
      if (!isDragging || !arcTween) return;
      isDragging = false;
      galleryViewport.style.cursor = 'grab';
      try {
        galleryViewport.releasePointerCapture(e.pointerId);
      } catch (err) {}

      // Re-synchronize master tween smoothly at the exact constant velocity
      const fixedSpacing = getFixedSpacing();
      const totalLength = totalImages * fixedSpacing;
      const currentP = ((animObj.progress % totalLength) + totalLength) % totalLength;
      animObj.progress = currentP;

      // Autoplay naturally flows leftwards (-1)
      targetMoveDir = -1;
      currentMoveDir = -1;

      arcTween.kill();
      arcTween = gsap.to(animObj, {
        progress: currentP + totalLength,
        duration: totalLength / SPEED_PX_PER_SEC,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          renderHalfCircleArc(animObj.progress, -1);
        }
      });
    };

    galleryViewport.addEventListener('pointerup', endDrag);
    galleryViewport.addEventListener('pointercancel', endDrag);
  }
});
