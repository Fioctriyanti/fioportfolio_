"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCaseStudy from "./ProjectCaseStudy";
import {
  PROJECTS,
  DISPLAY_CATEGORIES,
  FEATURED_PROJECTS,
  type ProjectCategory,
} from "@/lib/projects";
import { useInView } from "@/lib/useInView";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [openProject, setOpenProject] = useState<string | null>(FEATURED_PROJECTS[0]?.id ?? null);
  const { ref: filterRef, inView: filterInView } = useInView(0.3);

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  function toggleProject(id: string) {
    setOpenProject((prev) => (prev === id ? null : id));
  }

  // UBAH HANYA 5 BARIS DI BAWAH INI:
  // Kita masukkan semua data 'filtered' langsung ke featuredFiltered agar sejajar tanpa sekat.
  const featuredFiltered = filtered;
  const secondaryFiltered: typeof filtered = [];
  const compactFiltered: typeof filtered = [];
  const archivedFiltered: typeof filtered = [];

  // Kita matikan label sekat/tier agar tampilannya bersih rata ke bawah
  const showTierLabels = false;

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="projects-heading"
      style={{
        background: "linear-gradient(180deg, #08091a 0%, #0a0b1e 50%, #0c0d22 100%)",
      }}
    >
      {/* ── Aurora lighting ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -right-32 top-24 h-[500px] w-[500px] rounded-full opacity-[0.055]"
          style={{ background: "radial-gradient(circle, #00c8f0, transparent 65%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute -left-24 bottom-1/3 h-[420px] w-[420px] rounded-full opacity-[0.065]"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 65%)", filter: "blur(72px)" }}
        />
        <div
          className="absolute right-1/4 top-2/3 h-[300px] w-[300px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #f06292, transparent 65%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(0,200,240,0.15) 40%,rgba(74,124,247,0.15) 60%,transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.12) 40%,rgba(74,124,247,0.12) 60%,transparent)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-12">
        <SectionHeading
          eyebrow="Projects"
          title="My Academic Projects & Case Studies"
          subtitle="Every case study below reflects actual academic work — the problem, the approach, and what was learned. Click any project to read the full breakdown."
        />

        {/* ── Category filter ── */}
        <div
          ref={filterRef}
          className="mb-14 flex flex-wrap items-center justify-between gap-4 border-b border-violet-950/10 pb-4"
        >
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory("All")}
              className={`rounded-full px-4 py-1.5 font-mono text-[11px] font-medium tracking-wide transition-all duration-200 ${activeCategory === "All"
                  ? "bg-violet-950 text-white shadow-sm"
                  : "text-violet-950/70 hover:text-violet-950 hover:bg-violet-950/5"
                }`}
            >
              All
            </button>
            {DISPLAY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 font-mono text-[11px] font-medium tracking-wide transition-all duration-200 ${activeCategory === cat
                    ? "bg-violet-950 text-white shadow-sm"
                    : "text-violet-950/70 hover:text-violet-950 hover:bg-violet-950/5"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-violet-950 font-bold tracking-tight">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </span>
            <div className="h-3 w-px bg-violet-950/10" aria-hidden="true" />
            <span className="text-violet-950/60">
              Sort: <span className="font-bold text-violet-950">Featured</span>
            </span>
          </div>
        </div>

        {/* ── Project lists grouped by tier ── */}
        <div className="space-y-16">
          {/* FEATURED TIER */}
          {featuredFiltered.length > 0 && (
            <div className="space-y-6">
              {showTierLabels && (
                <div className="flex items-center gap-3">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-violet-950">
                    Featured
                  </h4>
                  <div className="h-px flex-1 bg-violet-950/10" />
                </div>
              )}
              <div className="grid gap-6">
                {featuredFiltered.map((project, idx) => (
                  <ProjectCaseStudy
                    key={project.id}
                    project={project}
                    index={idx}
                    isOpen={openProject === project.id}
                    onToggle={() => toggleProject(project.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SECONDARY TIER */}
          {secondaryFiltered.length > 0 && (
            <div className="space-y-6">
              {showTierLabels && (
                <div className="flex items-center gap-3">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-violet-950/60">
                    Secondary
                  </h4>
                  <div className="h-px flex-1 bg-violet-950/10" />
                </div>
              )}
              <div className="grid gap-6">
                {secondaryFiltered.map((project, idx) => (
                  <ProjectCaseStudy
                    key={project.id}
                    project={project}
                    index={featuredFiltered.length + idx}
                    isOpen={openProject === project.id}
                    onToggle={() => toggleProject(project.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* COMPACT TIER */}
          {compactFiltered.length > 0 && (
            <div className="space-y-6">
              {showTierLabels && (
                <div className="flex items-center gap-3">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-violet-950/60">
                    Compact
                  </h4>
                  <div className="h-px flex-1 bg-violet-950/10" />
                </div>
              )}
              <div className="grid gap-4">
                {compactFiltered.map((project, idx) => (
                  <ProjectCaseStudy
                    key={project.id}
                    project={project}
                    index={featuredFiltered.length + secondaryFiltered.length + idx}
                    isOpen={openProject === project.id}
                    onToggle={() => toggleProject(project.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ARCHIVED TIER */}
          {archivedFiltered.length > 0 && (
            <div className="space-y-6">
              {showTierLabels && (
                <div className="flex items-center gap-3">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-violet-950/40">
                    Archived
                  </h4>
                  <div className="h-px flex-1 bg-violet-950/10" />
                </div>
              )}
              <div className="grid gap-4">
                {archivedFiltered.map((project, idx) => (
                  <ProjectCaseStudy
                    key={project.id}
                    project={project}
                    index={featuredFiltered.length + secondaryFiltered.length + compactFiltered.length + idx}
                    isOpen={openProject === project.id}
                    onToggle={() => toggleProject(project.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer note ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease }}
          className="mt-16 flex flex-col items-center gap-3 text-center"
        >
          <div
            className="h-px w-16 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(74,124,247,0.3), transparent)" }}
          />
          <p className="max-w-sm text-[12.5px] leading-relaxed text-violet-950/60">
            All projects completed between 2025 and 2026 at the State University of Surabaya. 
            GitHub links are added progressively as repositories are made public.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

/* ── Tier section divider ── */
interface TierLabelProps {
  label: string;
  description: string;
  color: string;
}

function TierLabel({ label, description, color }: TierLabelProps) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
      <div className="flex flex-col items-center gap-0.5 text-center">
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color }}
        >
          {label}
        </span>
        <span className="text-[10px] text-violet-950/40">{description}</span>
      </div>
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
    </div>
  );
}