"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

interface TechStackProps {
  stack: string[];
  accent: string;
  accentBorder: string;
}

export default function TechStack({ stack, accent, accentBorder }: TechStackProps) {
  const { ref, inView } = useInView(0.3);

  return (
    <div
      ref={ref}
      className="flex flex-wrap gap-2"
      role="list"
      aria-label="Technologies used"
    >
      {stack.map((tech, i) => (
        <motion.span
          key={tech}
          role="listitem"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.35,
            ease: [0.34, 1.56, 0.64, 1],
            delay: i * 0.05,
          }}
          className="rounded-full px-3 py-1.5 font-mono text-[11px] font-medium"
          style={{
            background: `rgba(${accentBorder}, 0.1)`,
            border: `1px solid rgba(${accentBorder}, 0.2)`,
            color: accent,
          }}
        >
          {tech}
        </motion.span>
      ))}
    </div>
  );
}
