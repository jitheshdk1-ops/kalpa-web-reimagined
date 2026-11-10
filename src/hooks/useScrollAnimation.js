import { useEffect } from 'react';

/**
 * Universal Scroll-Triggered Entry Animation Hook
 * Replicates the entrance animation behavior of "Behind The Creative Work"
 * using IntersectionObserver with progressive child stagger delays.
 */
export function useScrollAnimation() {
  useEffect(() => {
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
      const scrollObserver = new IntersectionObserver(
        (entries, observer) => {
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
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      revealElements.forEach((el) => scrollObserver.observe(el));

      return () => {
        scrollObserver.disconnect();
      };
    } else {
      // Graceful fallback
      revealElements.forEach((el) => el.classList.add('visible', 'is-visible'));
    }
  }, []);
}
