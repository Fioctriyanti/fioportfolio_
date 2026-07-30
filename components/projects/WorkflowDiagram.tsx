"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import type { WorkflowStep } from "@/lib/projects";

interface WorkflowDiagramProps {
  steps: WorkflowStep[];
  accent: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function WorkflowDiagram({ steps, accent }: WorkflowDiagramProps) {
  const { ref, inView } = useInView(0.2);

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <div
        className="flex min-w-max items-start gap-0 pb-2"
        role="list"
        aria-label="Project workflow steps"
      >
        {steps.map((step, i) => (
          <div key={step.step} className="flex items-start" role="listitem">
            {/* Step node */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 px-4 text-center"
              style={{ maxWidth: "120px" }}
            >
              {/* Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: i * 0.1 + 0.1,
                }}
                className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-sm font-semibold text-white"
                style={{
                  background: accent,
                  borderColor: "rgba(255,255,255,0.15)",
                  fontFamily: "var(--font-poppins)",
                  boxShadow: `0 0 16px rgba(0,200,240,0.3)`,
                }}
              >
                {step.step}
              </motion.div>

              {/* Label */}
              <div
                className="text-[11px] font-medium leading-tight text-white/80"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {step.label}
              </div>

              {/* Detail */}
              <div className="text-[10px] leading-snug text-white/35">
                {step.detail}
              </div>
            </motion.div>

            {/* Connector line (not after last step) */}
            {i < steps.length - 1 && (
              <div className="relative mt-4 flex-shrink-0">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.4,
                    ease,
                    delay: i * 0.1 + 0.2,
                  }}
                  className="h-px w-10 origin-left"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] text-white/20"
                  aria-hidden="true"
                >
                  ›
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
