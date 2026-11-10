import { useEffect, useRef } from 'react';
import { getAssetUrl } from '../utils/asset';

/**
 * Custom hook for Hero scroll-bound 2D canvas image sequence scrubbing.
 * Maps scroll position within container to 190 pre-rendered animation frames.
 */
export function useHeroCanvas({ containerRef, canvasRef, uiLayerRef }) {
  const TOTAL_FRAMES = 190;
  const framesRef = useRef([]);
  const targetFrameIndexRef = useRef(0);
  const renderPendingRef = useRef(false);

  useEffect(() => {
    const heroContainer = containerRef.current;
    const heroCanvas = canvasRef.current;
    const heroUiLayer = uiLayerRef.current;

    if (!heroContainer || !heroCanvas) return;

    const ctx = heroCanvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    framesRef.current = new Array(TOTAL_FRAMES);

    const getFramePath = (index) => {
      const padded = String(index).padStart(6, '0');
      return getAssetUrl(`assets/images/slides/frame_${padded}.png`);
    };

    const getClosestLoadedFrame = (index) => {
      const frames = framesRef.current;
      if (frames[index]?.complete && frames[index].naturalWidth > 0) {
        return frames[index];
      }
      for (let i = index - 1; i >= 0; i--) {
        if (frames[i]?.complete && frames[i].naturalWidth > 0) {
          return frames[i];
        }
      }
      for (let i = index + 1; i < TOTAL_FRAMES; i++) {
        if (frames[i]?.complete && frames[i].naturalWidth > 0) {
          return frames[i];
        }
      }
      return null;
    };

    const render = () => {
      renderPendingRef.current = false;
      const img = getClosestLoadedFrame(targetFrameIndexRef.current);
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
      if (!renderPendingRef.current) {
        renderPendingRef.current = true;
        requestAnimationFrame(render);
      }
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = heroCanvas.clientWidth || window.innerWidth;
      const height = heroCanvas.clientHeight || window.innerHeight;

      heroCanvas.width = width * dpr;
      heroCanvas.height = height * dpr;
      requestRender();
    };

    // Preload frames
    const preloadFrames = () => {
      const firstImg = new Image();
      firstImg.src = getFramePath(1);
      firstImg.onload = () => {
        framesRef.current[0] = firstImg;
        requestRender();
      };
      framesRef.current[0] = firstImg;

      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          if (i - 1 === targetFrameIndexRef.current) {
            requestRender();
          }
        };
        framesRef.current[i - 1] = img;
      }
    };

    const onScroll = () => {
      const rect = heroContainer.getBoundingClientRect();
      const containerHeight = heroContainer.offsetHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = containerHeight - viewportHeight;

      if (maxScroll <= 0) return;

      const scrollTop = -rect.top;
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      const newFrameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      if (newFrameIndex !== targetFrameIndexRef.current) {
        targetFrameIndexRef.current = newFrameIndex;
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

    resizeCanvas();
    preloadFrames();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [containerRef, canvasRef, uiLayerRef]);
}
