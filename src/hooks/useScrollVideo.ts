import { useRef, useEffect, useState, useCallback } from 'react';

const FRAMES_PER_VIDEO = 100; // Increased to 100 for 100% smoother sequence
const MAX_WIDTH = 1920;      // Increased to 1920 for Full HD clarity

/**
 * Canvas-based scroll video hook.
 * Extracts frames from multiple videos into ImageBitmaps on load,
 * then draws the right frame to a canvas on scroll.
 */
export function useScrollVideo(videoSources: string | string[]) {
  const scrollDriverRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<ImageBitmap[]>([]);
  const currentFrameIdx = useRef(-1);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const sources = Array.isArray(videoSources) ? videoSources : [videoSources];
  const totalExpectedFrames = sources.length * FRAMES_PER_VIDEO;

  // Extract all frames from the video sources on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || sources.length === 0) return;

    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    let cancelled = false;

    const extractFramesFromSource = async (src: string, videoIndex: number) => {
      video.src = src;
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(new Error(`Video load failed: ${src}`));
      });

      const aspect = video.videoHeight / video.videoWidth;
      const w = Math.min(video.videoWidth, MAX_WIDTH);
      const h = Math.round(w * aspect);

      // Set canvas size based on the first video, or keep it consistent
      if (videoIndex === 0) {
        canvas.width = w;
        canvas.height = h;
      }

      const offscreen = document.createElement('canvas');
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const offCtx = offscreen.getContext('2d')!;

      const duration = video.duration;

      for (let i = 0; i < FRAMES_PER_VIDEO; i++) {
        if (cancelled) return;

        const time = (i / (FRAMES_PER_VIDEO - 1)) * duration;
        video.currentTime = time;

        await new Promise<void>((resolve) => {
          video.onseeked = () => resolve();
        });

        // Draw video frame, covering the canvas to handle different aspect ratios
        const videoAspect = video.videoHeight / video.videoWidth;
        const canvasAspect = canvas.height / canvas.width;
        
        let drawW, drawH, drawX, drawY;
        if (videoAspect > canvasAspect) {
          drawW = canvas.width;
          drawH = canvas.width * videoAspect;
          drawX = 0;
          drawY = (canvas.height - drawH) / 2;
        } else {
          drawH = canvas.height;
          drawW = canvas.height / videoAspect;
          drawX = (canvas.width - drawW) / 2;
          drawY = 0;
        }

        offCtx.clearRect(0, 0, canvas.width, canvas.height);
        offCtx.drawImage(video, drawX, drawY, drawW, drawH);
        
        const bitmap = await createImageBitmap(offscreen);
        frames.current.push(bitmap);
        
        const currentTotal = videoIndex * FRAMES_PER_VIDEO + (i + 1);
        setProgress(Math.round((currentTotal / totalExpectedFrames) * 100));

        // Initial frame draw
        if (videoIndex === 0 && i === 0) {
          const ctx = canvas.getContext('2d');
          if (ctx) ctx.drawImage(bitmap, 0, 0);
          setLoading(false);
        }
      }
    };

    const extractAll = async () => {
      for (let i = 0; i < sources.length; i++) {
        await extractFramesFromSource(sources[i], i);
      }
    };

    extractAll().catch(console.error);

    return () => {
      cancelled = true;
      frames.current.forEach((b) => b.close());
      frames.current = [];
    };
  }, [JSON.stringify(sources)]);

  // Lerp-smoothed scroll-driven frame drawing
  const targetFrame = useRef(0);
  const smoothFrame = useRef(0);
  const rafId = useRef(0);
  const LERP_FACTOR = 0.08; // Lower = smoother/slower catch-up, higher = snappier

  // On scroll, update the target frame (cheap, no drawing)
  const updateTarget = useCallback(() => {
    const scrollDriver = scrollDriverRef.current;
    if (!scrollDriver || frames.current.length === 0) return;

    const rect = scrollDriver.getBoundingClientRect();
    const total = scrollDriver.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -rect.top);
    const progressVal = Math.min(scrolled / total, 1);

    const totalFrames = frames.current.length;
    targetFrame.current = progressVal * (totalFrames - 1);
  }, []);

  // Persistent rAF loop: lerp smoothFrame toward targetFrame and draw
  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || frames.current.length === 0) {
      rafId.current = requestAnimationFrame(tick);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      rafId.current = requestAnimationFrame(tick);
      return;
    }

    // Lerp toward target
    smoothFrame.current += (targetFrame.current - smoothFrame.current) * LERP_FACTOR;

    // Snap if very close (avoid endless micro-updates)
    if (Math.abs(targetFrame.current - smoothFrame.current) < 0.05) {
      smoothFrame.current = targetFrame.current;
    }

    const idx = Math.min(
      Math.round(smoothFrame.current),
      frames.current.length - 1
    );

    if (idx !== currentFrameIdx.current && frames.current[idx]) {
      currentFrameIdx.current = idx;
      ctx.drawImage(frames.current[idx], 0, 0);
    }

    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (loading) return;

    window.addEventListener('scroll', updateTarget, { passive: true });
    updateTarget();
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', updateTarget);
      cancelAnimationFrame(rafId.current);
    };
  }, [loading, updateTarget, tick]);

  return { scrollDriverRef, canvasRef, loading, progress };
}

