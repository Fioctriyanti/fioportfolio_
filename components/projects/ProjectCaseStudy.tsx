"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  GitBranch,
  ExternalLink,
  TrendingUp,
  Eye,
  Layers,
  Sparkles,
} from "lucide-react";
import type { ProjectData } from "@/lib/projects";
import WorkflowDiagram from "./WorkflowDiagram";
import ProjectMetrics from "./ProjectMetrics";
import { useInView } from "@/lib/useInView";

/* ── Accent palette ── */
const ACCENT_COLORS: Record<string, { text: string; rgb: string; gradient: string }> = {
  cyan: { text: "#4dd9f5", rgb: "0,200,240", gradient: "linear-gradient(135deg,#00c8f0,#4a7cf7)" },
  blue: { text: "#7aa5ff", rgb: "74,124,247", gradient: "linear-gradient(135deg,#4a7cf7,#6b8fff)" },
  purple: { text: "#b48bff", rgb: "139,92,246", gradient: "linear-gradient(135deg,#8b5cf6,#a78bfa)" },
  aurora: { text: "#ff8fb1", rgb: "240,98,146", gradient: "linear-gradient(135deg,#f06292,#ff8fb1)" },
  holo: { text: "#c4aaff", rgb: "139,92,246", gradient: "linear-gradient(135deg,#00c8f0,#4a7cf7,#8b5cf6,#f06292)" },
};

/* ── Devicon SVG Logo Mapper ── */
const TECH_LOGOS: Record<string, string> = {
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  opencv: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  "scikit-learn": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  sklearn: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  sql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  fastapi: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  tableau: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg",
  jupyter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
};

// Helper untuk mengambil SVG logo berdasarkan nama framework
function getTechLogoUrl(techName: string): string | null {
  const name = techName.toLowerCase().trim();
  for (const [key, url] of Object.entries(TECH_LOGOS)) {
    if (name.includes(key)) return url;
  }
  return null;
}

/* ── Fallback Gambar Placeholder Berkuallitas untuk Project ── */
const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", // Data Analytics / Chart
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop", // AI Code / Matrix
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop", // Web App UI
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop", // Modern Abstract AI
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop", // Computer Vision / Hardware
];

const ease = [0.16, 1, 0.3, 1] as const;

interface ProjectCaseStudyProps {
  project: ProjectData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProjectCaseStudy({
  project,
  index,
  isOpen,
  onToggle,
}: ProjectCaseStudyProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { ref: bodyRef, inView: bodyInView } = useInView(0.05);
  const { ref: cardViewRef, inView: cardInView } = useInView(0.12);

  const accent = ACCENT_COLORS[project.accent] ?? ACCENT_COLORS.cyan;
  const isFeatured = project.tier === "featured";

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Menggabungkan daftar library, languages, dan algorithms untuk ekstraksi logo framework
  const allTechs = [
    ...(project.libraries || []),
    ...(project.languages || []),
    ...(project.algorithms || []),
  ];

  // Ambil gambar dari project data jika ada, jika tidak gunakan placeholder sesuai index
  const projectImageUrl =
    (project as any).image || PROJECT_IMAGES[index % PROJECT_IMAGES.length];

  return (
    <motion.div
      ref={cardViewRef}
      initial={{ opacity: 0, y: 28 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: Math.min(index * 0.06, 0.3) }}
      id={`project-${project.id}`}
    >
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl border transition-colors duration-300"
        style={{
          background: "linear-gradient(160deg, rgba(14,17,40,0.94), rgba(9,11,26,0.97))",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderColor: isOpen
            ? `rgba(${accent.rgb},0.35)`
            : hovered
              ? `rgba(${accent.rgb},0.18)`
              : isFeatured
                ? "rgba(255,255,255,0.10)"
                : "rgba(255,255,255,0.06)",
          boxShadow: isOpen
            ? `0 0 0 1px rgba(${accent.rgb},0.08), 0 20px 60px rgba(${accent.rgb},0.10)`
            : isFeatured
              ? "0 4px 24px rgba(0,0,0,0.2)"
              : "none",
          transform: hovered && !isOpen ? "translateY(-2px)" : "none",
          transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.2s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left accent bar */}
        {isFeatured && (
          <div
            className="absolute bottom-0 left-0 top-0 w-[3px]"
            style={{ background: accent.gradient }}
            aria-hidden="true"
          />
        )}

        {/* Sticky read progress bar */}
        {isOpen && (
          <div className="sticky top-0 z-30 h-[2px] w-full bg-white/5">
            <motion.div
              className="h-full origin-left"
              style={{ width: progressWidth, background: accent.gradient }}
            />
          </div>
        )}

        {/* ── CARD HEADER (SELALU TAMPIL SAAT COLLAPSED & EXPANDED) ── */}
        <div className="p-5 md:p-7">
          <button
            onClick={onToggle}
            className="w-full text-left focus:outline-none"
            aria-expanded={isOpen}
            aria-controls={`case-study-${project.id}`}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              {/* Sisi Kiri: Detail Judul & Logo Framework */}
              <div className="flex-1">
                {/* Tag Kategori & Tahun */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-mono text-[11px] font-medium tracking-wider text-white/40 uppercase">
                    {project.category} · {project.timeline}
                  </span>
                </div>

                {/* Judul Project */}
                <h3 className="text-xl font-semibold text-white md:text-2xl hover:text-white/90 transition-colors">
                  {project.title}
                </h3>

                {/* FrameWork / Tech Stack Logos (Tampil saat Collapsed) */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] uppercase text-white/30 mr-1">Stack:</span>
                  {allTechs.slice(0, 6).map((tech) => {
                    const logoUrl = getTechLogoUrl(tech);
                    return logoUrl ? (
                      <div
                        key={tech}
                        className="flex items-center justify-center h-7 w-7 rounded-lg border border-white/10 bg-white/5 p-1.5 transition-transform hover:scale-110"
                        title={tech}
                      >
                        <img
                          src={logoUrl}
                          alt={tech}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : (
                      <span
                        key={tech}
                        className="rounded-md border border-white/8 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/50"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Sisi Kanan: Gambar Project & Tombol Expand */}
              <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
                {/* Thumbnail Gambar Project */}
                <div className="relative h-20 w-32 md:h-24 md:w-40 overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-inner">
                  <img
                    src={projectImageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Indicator Expand/Collapse */}
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </div>
            </div>
          </button>

          {/* 1. KEY METRICS (Angka Kunci Penarik Perhatian - Tampil di Collapsed juga) */}
          <div className="mt-5">
            <ProjectMetrics metrics={project.metrics} accent={accent.text} />
          </div>
        </div>

        {/* ── FULL CASE STUDY BODY (EXPANDABLE) ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={`case-study-${project.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div
                ref={bodyRef}
                className={`px-5 pb-6 md:px-7 ${isFeatured ? "md:pl-9" : ""}`}
              >
                {/* 2. PROJECT OVERVIEW (LANGSUNG DIBAWAH ANGKA KUNCI - ZERO GAP) */}
                {project.background && (
                  <div className="mt-1.5 mb-4">
                    <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-white/30">
                      <Layers className="h-3.5 w-3.5" />
                      Project Overview
                    </div>
                    <p className="text-[13.5px] leading-[1.7] text-white/60">
                      {project.background}
                    </p>
                  </div>
                )}

                {/* 3. RECRUITER PERSPECTIVE */}
                {project.assessment?.recruiterImpression && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease, delay: 0.05 }}
                    className="mb-4 flex gap-3 rounded-xl border p-3.5"
                    style={{
                      background: `rgba(${accent.rgb},0.06)`,
                      borderColor: `rgba(${accent.rgb},0.15)`,
                    }}
                  >
                    <Eye className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/30" />
                    <div>
                      <div className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/30">
                        Recruiter perspective
                      </div>
                      <p className="text-[13px] leading-relaxed text-white/60 italic">
                        {project.assessment.recruiterImpression}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 4. WORKFLOW DIAGRAM */}
                {project.workflow && project.workflow.length > 0 && (
                  <div className="mb-4">
                    <div className="mb-2 flex items-center gap-2.5">
                      <TrendingUp className="h-4 w-4 text-white/35" aria-hidden="true" />
                      <h4
                        className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-white/35"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        Workflow
                      </h4>
                    </div>
                    <div
                      className="overflow-hidden rounded-xl border border-white/6 p-4"
                      style={{ background: "rgba(255,255,255,0.015)" }}
                    >
                      <WorkflowDiagram steps={project.workflow} accent={accent.gradient} />
                    </div>
                  </div>
                )}

                {/* 5. SKILLS DEMONSTRATED */}
                {project.assessment?.skillsDemonstrated && project.assessment.skillsDemonstrated.length > 0 && (
                  <div className="mb-4">
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.13em] text-white/25">
                      Skills demonstrated
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.assessment.skillsDemonstrated.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full px-3 py-1 font-mono text-[10px]"
                          style={{
                            background: `rgba(${accent.rgb},0.08)`,
                            border: `1px solid rgba(${accent.rgb},0.16)`,
                            color: accent.text,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. FULL TECH STACK */}
                <div className="mb-4 border-t border-white/6 pt-4">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.13em] text-white/25">
                    Full tech stack
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.languages && project.languages.length > 0 && (
                      <div>
                        <div className="mb-1 font-mono text-[9px] text-white/20">Languages</div>
                        <div className="flex flex-wrap gap-1">
                          {project.languages.map((l) => (
                            <span key={l} className="rounded-full border border-white/8 px-2.5 py-0.5 font-mono text-[9px] text-white/40">{l}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {project.libraries && project.libraries.length > 0 && (
                      <div>
                        <div className="mb-1 font-mono text-[9px] text-white/20">Libraries</div>
                        <div className="flex flex-wrap gap-1">
                          {project.libraries.map((l) => (
                            <span key={l} className="rounded-full border border-white/8 px-2.5 py-0.5 font-mono text-[9px] text-white/40">{l}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {project.algorithms && project.algorithms.length > 0 && (
                      <div>
                        <div className="mb-1 font-mono text-[9px] text-white/20">Algorithms & Methods</div>
                        <div className="flex flex-wrap gap-1">
                          {project.algorithms.map((a) => (
                            <span key={a} className="rounded-full border border-white/8 px-2.5 py-0.5 font-mono text-[9px] text-white/40">{a}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 7. CTA LINKS */}
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/6">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium text-white transition-opacity duration-200 hover:opacity-85"
                      style={{ background: accent.gradient }}
                    >
                      <GitBranch className="h-4 w-4" strokeWidth={2} />
                      View on GitHub
                    </a>
                  ) : (
                    <span
                      className="inline-flex cursor-not-allowed items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium text-white/25"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      title="GitHub repository coming soon"
                    >
                      <GitBranch className="h-4 w-4" strokeWidth={2} />
                      GitHub coming soon
                    </span>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2 text-[13px] font-medium text-white/60 transition-all duration-200 hover:border-white/25 hover:text-white/85"
                    >
                      <ExternalLink className="h-4 w-4" strokeWidth={2} />
                      Live Demo
                    </a>
                  )}

                  <button
                    onClick={onToggle}
                    className="ml-auto inline-flex items-center gap-1.5 text-[11.5px] text-white/25 transition-colors duration-150 hover:text-white/50"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                    Collapse
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}