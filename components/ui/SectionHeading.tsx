"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const { ref, inView } = useInView(0.5);
  const isCenter = align === "center";

  return (
    <div
      ref={ref}
      className={`mb-12 ${isCenter ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className={`mb-3 flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}
        >
          {!isCenter && (
            <div
              className="h-px w-8 rounded-full"
              style={{ background: "linear-gradient(90deg, #3A004D, #8B4F67)" }}
              aria-hidden="true"
            />
          )}
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8B4F67] font-semibold">
            {eyebrow}
          </span>
          {isCenter && (
            <div
              className="h-px w-8 rounded-full"
              style={{ background: "linear-gradient(90deg, #4a7cf7, #8b5cf6)" }}
              aria-hidden="true"
            />
          )}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.65, ease, delay: 0.05 }}
        className="relative inline-block text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {title}
        {/* Animated gradient underline */}
        <motion.span
          className="absolute -bottom-2 left-0 h-[3px] rounded-full"
          style={{
            background: "linear-gradient(90deg, #00c8f0, #4a7cf7, #8b5cf6, #f06292)",
          }}
          initial={{ width: "0%" }}
          animate={inView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          aria-hidden="true"
        />
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="mt-5 text-[15px] leading-relaxed text-[#3A004D] font-medium"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}