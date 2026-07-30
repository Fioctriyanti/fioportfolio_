"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  target: number;
  duration?: number;   // ms
  decimals?: number;
  prefix?: string;
  suffix?: string;
  startOnView?: boolean;
}

export function useCountUp({
  target,
  duration = 1600,
  decimals = 0,
  startOnView = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!startOnView) {
      setTimeout(() => setStarted(true), 0);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setTimeout(() => setValue(target), 0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, startOnView]);

  useEffect(() => {
    if (!started) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setTimeout(() => setValue(target), 0);
      return;
    }

    const startTime = performance.now();
    const factor = Math.pow(10, decimals);

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target * factor) / factor;
      setValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration, decimals]);

  return { value: value.toFixed(decimals), ref };
}
