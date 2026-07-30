"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import type { Metric } from "@/lib/projects";

interface ProjectMetricsProps {
  metrics: Metric[];
  accent: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectMetrics({ metrics, accent }: ProjectMetricsProps) {
  const { ref, inView } = useInView(0.3);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      role="list"
      aria-label="Project key metrics"
    >
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: i * 0.09 }}
          role="listitem"
          className="flex flex-col gap-1 rounded-xl border border-white/8 p-4"
          style={{
            background: "linear-gradient(135deg, rgba(16,20,44,0.7), rgba(9,11,26,0.8))",
          }}
        >
          <div
            className="text-2xl font-semibold leading-none tracking-tight text-white"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {m.value}
          </div>
          <div
            className="text-[11px] font-medium uppercase tracking-[0.08em]"
            style={{ color: accent }}
          >
            {m.label}
          </div>
          <div className="text-[10.5px] leading-snug text-white/35">
            {m.context}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
