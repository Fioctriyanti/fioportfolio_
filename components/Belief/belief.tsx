"use client";

import React from "react";
import { motion } from "framer-motion";

// =========================================================
// 🌟 DATA TOOLS & SKILLS (BEBAS HOTLINK BLOCKING - CDN RESMI)
// =========================================================
const ROW_1_TOOLS = [
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "R Studio",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rstudio/rstudio-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg",
  },
  {
    name: "pgAdmin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "DBeaver",
    icon: "https://api.iconify.design/devicon:dbeaver.svg",
  },
  {
    name: "JupyterLab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Airflow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "MS Azure",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
];

const ROW_2_TOOLS = [
  {
    name: "MS Excel",
    icon: "https://api.iconify.design/vscode-icons:file-type-excel.svg",
  },
  {
    name: "Google Sheets",
    // Data URI SVG Resmi Google Sheets (Anti-Error / Anti-Block)
    icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%230F9D58" d="M30 6H10c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V18L30 6z"/><path fill="%2387CEAC" d="M30 6v12h12L30 6z"/><path fill="%23FFF" d="M14 22h20v12H14zm3 3h14v2H17zm0 4h14v2H17z"/></svg>',
  },
  {
    name: "MS Word",
    icon: "https://api.iconify.design/vscode-icons:file-type-word.svg",
  },
  {
    name: "Google Docs",
    // Data URI SVG Resmi Google Docs (Anti-Error / Anti-Block)
    icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%234285F4" d="M30 6H10c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V18L30 6z"/><path fill="%23A1C2FA" d="M30 6v12h12L30 6z"/><path fill="%23FFF" d="M14 22h20v3H14zm0 6h20v3H14zm0 6h12v3H14z"/></svg>',
  },
  {
    name: "MS Office",
    icon: "https://api.iconify.design/logos:microsoft-icon.svg",
  },
  {
    name: "Google Drive",
    icon: "https://api.iconify.design/logos:google-drive.svg",
  },
  {
    name: "MS Fabric",
    icon: "https://api.iconify.design/logos:microsoft-icon.svg",
  },
  {
    name: "Atoti",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "RPubs",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  },
  {
    name: "Canva",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Notion",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
  },
  {
    name: "Emailing",
    icon: "https://api.iconify.design/logos:google-gmail.svg",
  },
];

// Komponen Pembungkus Baris Badge yang Mengalir Otomatis
function MarqueeRow({
  items,
  direction = "left",
}: {
  items: typeof ROW_1_TOOLS;
  direction?: "left" | "right";
}) {
  const duplicateItems = [...items, ...items, ...items];
  const isLeft = direction === "left";

  return (
    // Container py-5 memberikan ruang aman agar card dan shadow tidak terpotong saat hover naik
    <div className="flex w-full overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <motion.div
        className="flex gap-4 pr-4 whitespace-nowrap py-1"
        animate={{ x: isLeft ? [0, -1000] : [-1000, 0] }}
        transition={{
          ease: "linear",
          duration: 35,
          repeat: Infinity,
        }}
      >
        {duplicateItems.map((tool, idx) => (
          <motion.div
            key={`${tool.name}-${idx}`}
            whileHover={{ y: -6, scale: 1.03 }}
            className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-pointer transition-all duration-200 hover:border-violet-300 hover:shadow-lg select-none"
          >
            {/* CONTAINER LOGO TRANSPARAN */}
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-transparent shrink-0 overflow-hidden">
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-full h-full object-contain p-0.5"
                loading="lazy"
              />
            </div>
            <span className="text-sm font-semibold tracking-wide text-slate-700 font-[family-name:var(--font-poppins-style)]">
              {tool.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ToolsAndSkills() {
  return (
    <section
      id="tools-skills"
      className="relative w-full pt-28 pb-32 bg-[#faf8fb] overflow-hidden block clear-both"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* JUDUL UTAMA */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-center font-[family-name:var(--font-poppins-style)] text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Tech <span className="text-[#a85597]">Skills</span>.
          </h2>
          <p className="font-[family-name:var(--font-poppins-style)] text-xs md:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
            Tools, languages, and ecosystems that I use to gather, model, and visualize data.
          </p>
        </div>

        {/* CONTAINER UTAMA LIST LOGO RUNNING BANNER */}
        <div className="flex flex-col gap-2 w-full max-w-5xl mx-auto pointer-events-auto">
          {/* Baris 1: Mengalir ke Kiri */}
          <MarqueeRow items={ROW_1_TOOLS} direction="left" />

          {/* Baris 2: Mengalir ke Kanan */}
          <MarqueeRow items={ROW_2_TOOLS} direction="right" />
        </div>
      </div>
    </section>
  );
}