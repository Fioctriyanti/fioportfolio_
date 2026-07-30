"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/lib/useCountUp";
import type { ReactNode } from "react";

export interface StatCardData {
  /** Numeric target for the count-up (0 if purely a label card) */
  value?: number;
  decimals?: number;
  /** Unit suffix rendered inline with the number, e.g. "/4.00" or "+" */
  unit?: string;
  /** Large label rendered when there is no numeric value */
  label: string;
  /** Smaller sub-label line */
  sub: string;
  /** Icon node — typically a Lucide icon */
  icon: ReactNode;
  /** Which gradient from the palette to accent this card */
  accent: "cyan" | "blue" | "purple" | "aurora";
  /** Delay in seconds for staggered entrance */
  delay?: number;
}

const ACCENT_MAP = {
  cyan: {
    gradient: "linear-gradient(135deg, #00c8f0, #4a7cf7)",
    glow: "rgba(0, 200, 240, 0.22)",
    border: "rgba(0, 200, 240, 0.2)",
    text: "#00c8f0",
  },
  blue: {
    gradient: "linear-gradient(135deg, #4a7cf7, #6b8fff)",
    glow: "rgba(74, 124, 247, 0.22)",
    border: "rgba(74, 124, 247, 0.2)",
    text: "#7a9cff",
  },
  purple: {
    gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    glow: "rgba(139, 92, 246, 0.22)",
    border: "rgba(139, 92, 246, 0.2)",
    text: "#a78bfa",
  },
  aurora: {
    gradient: "linear-gradient(135deg, #f06292, #f48fb1)",
    glow: "rgba(240, 98, 146, 0.22)",
    border: "rgba(240, 98, 146, 0.2)",
    text: "#f48fb1",
  },
};

interface StatCardProps {
  data: StatCardData;
  visible: boolean;
}

export default function StatCard({ data, visible }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const accent = ACCENT_MAP[data.accent];
  const hasNumber = typeof data.value === "number";

  const { value, ref: countRef } = useCountUp({
    target: data.value ?? 0,
    decimals: data.decimals ?? 0,
    duration: 1400,
    startOnView: true,
  });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={
        visible
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 28, filter: "blur(6px)" }
      }
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: data.delay ?? 0,
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl p-5 transition-transform duration-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(14,17,32,0.85), rgba(10,13,28,0.9))",
        border: `1px solid ${hovered ? accent.border : "rgba(255,255,255,0.06)"}`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: hovered
          ? `0 8px 32px ${accent.glow}, 0 1px 0 rgba(255,255,255,0.05) inset`
          : "0 1px 0 rgba(255,255,255,0.04) inset",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
      }}
    >
      {/* Per-card cursor-following inner glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 110px at ${glowPos.x}% ${glowPos.y}%, ${accent.glow}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Top gradient accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: accent.gradient }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-3">
        {/* Icon */}
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${accent.glow}, transparent)`,
            border: `1px solid ${accent.border}`,
          }}
        >
          <span style={{ color: accent.text }} className="[&>svg]:h-4 [&>svg]:w-4">
            {data.icon}
          </span>
        </div>

        {/* Value or label */}
        <div>
          {hasNumber ? (
            <div className="flex items-end gap-1 leading-none">
              <span
                ref={countRef as React.RefObject<HTMLSpanElement>}
                className="text-3xl font-semibold tracking-tight text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {value}
              </span>
              {data.unit && (
                <span
                  className="mb-0.5 text-base font-medium"
                  style={{ color: accent.text }}
                >
                  {data.unit}
                </span>
              )}
            </div>
          ) : (
            <div
              className="text-xl font-semibold leading-tight text-white"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {data.label}
            </div>
          )}

          {hasNumber && (
            <div
              className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em]"
              style={{ color: accent.text }}
            >
              {data.label}
            </div>
          )}

          <div className="mt-1 text-[12px] leading-snug text-white/45">
            {data.sub}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
