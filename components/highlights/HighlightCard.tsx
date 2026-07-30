"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

export type CardSize = "featured" | "medium" | "small";
export type CardAccent = "cyan" | "blue" | "purple" | "aurora" | "holo";

export interface HighlightCardData {
  id: string;
  size: CardSize;
  accent: CardAccent;
  icon: ReactNode;
  tag?: string;
  title: string;
  description: string;
  detail?: string;          // expanded text shown on "Learn more" click
  metric?: string;          // large number/text rendered prominently
  metricSub?: string;       // label beneath metric
  href?: string;
  delay?: number;
}

/* ── Accent palette ── */
const ACCENTS: Record<CardAccent, {
  gradient: string;
  glow: string;
  border: string;
  text: string;
  iconBg: string;
}> = {
  cyan: {
    gradient: "linear-gradient(135deg, #00c8f0, #4a7cf7)",
    glow: "rgba(0,200,240,0.18)",
    border: "rgba(0,200,240,0.2)",
    text: "#4dd9f5",
    iconBg: "rgba(0,200,240,0.12)",
  },
  blue: {
    gradient: "linear-gradient(135deg, #4a7cf7, #7aa5ff)",
    glow: "rgba(74,124,247,0.18)",
    border: "rgba(74,124,247,0.2)",
    text: "#7aa5ff",
    iconBg: "rgba(74,124,247,0.12)",
  },
  purple: {
    gradient: "linear-gradient(135deg, #8b5cf6, #b48bff)",
    glow: "rgba(139,92,246,0.18)",
    border: "rgba(139,92,246,0.2)",
    text: "#b48bff",
    iconBg: "rgba(139,92,246,0.12)",
  },
  aurora: {
    gradient: "linear-gradient(135deg, #f06292, #ff8fb1)",
    glow: "rgba(240,98,146,0.18)",
    border: "rgba(240,98,146,0.2)",
    text: "#ff8fb1",
    iconBg: "rgba(240,98,146,0.12)",
  },
  holo: {
    gradient: "linear-gradient(135deg, #00c8f0, #4a7cf7, #8b5cf6, #f06292)",
    glow: "rgba(139,92,246,0.22)",
    border: "rgba(139,92,246,0.25)",
    text: "#c4aaff",
    iconBg: "rgba(139,92,246,0.14)",
  },
};

interface Props {
  data: HighlightCardData;
  visible: boolean;
}

export default function HighlightCard({ data, visible }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const accent = ACCENTS[data.accent];
  const isFeatured = data.size === "featured";

  /* Track pointer for per-card cursor spotlight */
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={
        visible
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 32, filter: "blur(8px)" }
      }
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay: data.delay ?? 0,
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => { setHovered(false); }}
      className="group relative flex flex-col overflow-hidden rounded-2xl"
      style={{
        height: "100%",
        /* MODIFIKASI UTAMA: Base background diubah menjadi super transparan agar tidak kaku */
        background: "linear-gradient(160deg, rgba(255,255,255,0.01), rgba(255,255,255,0.02))",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${hovered ? accent.border : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered
          ? `0 12px 40px ${accent.glow}, 0 1px 0 rgba(255,255,255,0.06) inset`
          : "0 1px 0 rgba(255,255,255,0.04) inset",
        transform: hovered ? "translateY(-5px) scale(1.008)" : "translateY(0) scale(1)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.2s ease",
        /* Size-based padding */
        padding: isFeatured ? "28px" : data.size === "medium" ? "24px" : "20px",
        minHeight: isFeatured ? "220px" : data.size === "medium" ? "180px" : "148px",
      }}
    >
      {/* ── Cursor spotlight ── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 140px at ${spotlight.x}% ${spotlight.y}%, ${accent.glow}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* ── Top gradient accent bar ── */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl transition-opacity duration-300"
        style={{
          background: accent.gradient,
          opacity: hovered ? 1 : isFeatured ? 0.5 : 0,
        }}
        aria-hidden="true"
      />

      {/* ── Shimmer sweep (featured cards only) ── */}
      {isFeatured && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(118deg, transparent 30%, rgba(255,255,255,0.055) 48%, transparent 62%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Corner holographic glow (featured only) ── */}
      {isFeatured && (
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20"
          style={{
            background: accent.gradient,
            filter: "blur(32px)",
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Card content ── */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Header row: icon + tag */}
        <div className="mb-auto flex items-start justify-between gap-3">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
            style={{
              background: accent.iconBg,
              border: `1px solid ${accent.border}`,
            }}
          >
            <span
              className="[&>svg]:h-5 [&>svg]:w-5"
              style={{ color: accent.text }}
            >
              {data.icon}
            </span>
          </div>

          {data.tag && (
            <span
              className="rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em]"
              style={{
                background: accent.iconBg,
                color: accent.text,
                border: `1px solid ${accent.border}`,
              }}
            >
              {data.tag}
            </span>
          )}
        </div>

        {/* Large metric (featured with number) */}
        {data.metric && (
          <div className="mt-4 mb-1">
            <span
              className="text-4xl font-semibold leading-none tracking-tight text-white"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {data.metric}
            </span>
            {data.metricSub && (
              <div
                className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em]"
                style={{ color: accent.text }}
              >
                {data.metricSub}
              </div>
            )}
          </div>
        )}

        {/* Title + description */}
        <div className={data.metric ? "mt-3" : "mt-4"}>
          <h3
            className={`font-semibold leading-tight text-white ${
              isFeatured ? "text-[17px]" : "text-[15px]"
            }`}
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {data.title}
          </h3>
          <p className="mt-1.5 text-[12.5px] leading-snug text-white/50">
            {data.description}
          </p>
        </div>

        {/* Expanded detail */}
        {expanded && data.detail && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-[12px] leading-relaxed text-white/40 border-t border-white/8 pt-3"
          >
            {data.detail}
          </motion.p>
        )}

        {/* Footer: Learn more / external link */}
        {(data.detail || data.href) && (
          <div className="mt-4 flex items-center gap-3">
            {data.detail && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-[11px] font-medium transition-colors duration-150"
                style={{ color: hovered ? accent.text : "rgba(255,255,255,0.30)" }}
                aria-expanded={expanded}
              >
                {expanded ? "Show less ↑" : "Learn more ↓"}
              </button>
            )}
            {data.href && (
              <a
                href={data.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1 text-[11px] transition-colors duration-150"
                style={{ color: hovered ? accent.text : "rgba(255,255,255,0.25)" }}
                aria-label={`External link for ${data.title}`}
              >
                <ExternalLink className="h-3 w-3" strokeWidth={1.8} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}