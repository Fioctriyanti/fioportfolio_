"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroPortrait() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 120, mass: 0.7 };
  const shiftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const shiftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), springConfig);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto flex h-full w-full max-w-[550px] items-end justify-center"
    >
      {/* Ambient halo behind the portrait */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,124,247,0.28), rgba(139,92,246,0.18) 45%, transparent 72%)",
          filter: "blur(36px)",
        }}
        aria-hidden="true"
      />

      <motion.div
        style={{ x: shiftX, y: shiftY }}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        className="relative z-10 w-full"
      >
        {/* Glass frame */}
        <div
          className="relative overflow-hidden rounded-[28px] border border-white/10"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
            backdropFilter: "blur(2px)",
          }}
        >
          {/* Rim light — blue/cyan edge glow */}
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-[28px]"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(0,200,240,0.25), inset 2px 4px 24px rgba(0,200,240,0.12), inset -2px -4px 28px rgba(139,92,246,0.18)",
            }}
            aria-hidden="true"
          />

          {/* Landscape with holographic backdrop fill */}
          <div className="relative aspect-[4/3] w-full">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 35% 20%, rgba(0,200,240,0.12), transparent 55%), radial-gradient(circle at 75% 70%, rgba(139,92,246,0.15), transparent 55%), radial-gradient(circle at 50% 100%, rgba(240,98,146,0.08), transparent 60%), linear-gradient(180deg, #0c0f24, #090a1a)",
              }}
              aria-hidden="true"
            />
            <Image
              src="/images/fio-latest.jpeg"
              alt="Professional portrait of Fio Octriyanti, Data Science undergraduate"
              fill
              priority
              sizes="(max-width: 768px) 80vw, 550px"
              className="object-cover object-center"
            />

            {/* Glass reflection sweep */}
            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                background:
                  "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.10) 48%, transparent 58%)",
              }}
              aria-hidden="true"
            />

            {/* Bottom fade for clean merge with content below */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24"
              style={{
                background:
                  "linear-gradient(0deg, var(--hero-bg-0, #06070f) 0%, transparent 100%)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}