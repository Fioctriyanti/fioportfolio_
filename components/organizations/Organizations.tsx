"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Sparkles,
  Eye,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Play,
} from "lucide-react";
import { useInView } from "@/lib/useInView";
import SectionHeading from "@/components/ui/SectionHeading";

/* ══════════════════════════════════════════════════════
   TYPES FOR MEDIA & ROADMAP
══════════════════════════════════════════════════════ */
export interface MediaItem {
  type: "image" | "video";
  url: string;
}

export interface RoadmapItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  category: "Leadership" | "Leadership & Creative" | "AI & Community" | "Award" | "Mentorship" | "Certification";
  location: string;
  highlights: string[];
  skills: string[];
  media?: MediaItem[]; // Array berisi foto & video
  colorLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

// 7 Tingkatan Warna Ungu Berurutan
const PURPLE_GRADIENT_MAP = {
  1: {
    border: "border-[#4c1d95]/40 hover:border-[#6d28d9]/70",
    borderActive: "border-[#6d28d9] shadow-[0_0_20px_rgba(76,29,149,0.4)]",
    dot: "bg-[#4c1d95] ring-[#6d28d9]/50",
    text: "text-[#a78bfa]",
    badge: "bg-[#2e1065]/80 text-[#c4b5fd] border-[#581c87]/60",
    button: "bg-[#3b0764] hover:bg-[#581c87] text-[#d8b4fe] border-[#6d28d9]/60",
  },
  2: {
    border: "border-[#581c87]/50 hover:border-[#7e22ce]/70",
    borderActive: "border-[#7e22ce] shadow-[0_0_20px_rgba(88,28,135,0.45)]",
    dot: "bg-[#6d28d9] ring-[#7e22ce]/50",
    text: "text-[#c084fc]",
    badge: "bg-[#3b0764]/80 text-[#d8b4fe] border-[#6d28d9]/60",
    button: "bg-[#4c1d95] hover:bg-[#6d28d9] text-[#e9d5ff] border-[#7e22ce]/60",
  },
  3: {
    border: "border-[#6d28d9]/50 hover:border-[#9333ea]/70",
    borderActive: "border-[#9333ea] shadow-[0_0_20px_rgba(109,40,217,0.45)]",
    dot: "bg-[#7e22ce] ring-[#9333ea]/50",
    text: "text-[#c084fc]",
    badge: "bg-[#4c1d95]/80 text-[#e9d5ff] border-[#7e22ce]/60",
    button: "bg-[#581c87] hover:bg-[#7e22ce] text-[#f3e8ff] border-[#9333ea]/60",
  },
  4: {
    border: "border-[#7e22ce]/50 hover:border-[#a855f7]/70",
    borderActive: "border-[#a855f7] shadow-[0_0_22px_rgba(126,34,206,0.5)]",
    dot: "bg-[#8b5cf6] ring-[#a855f7]/50",
    text: "text-[#d8b4fe]",
    badge: "bg-[#581c87]/80 text-[#f3e8ff] border-[#8b5cf6]/60",
    button: "bg-[#6d28d9] hover:bg-[#8b5cf6] text-[#f3e8ff] border-[#a855f7]/60",
  },
  5: {
    border: "border-[#8b5cf6]/50 hover:border-[#c084fc]/70",
    borderActive: "border-[#c084fc] shadow-[0_0_22px_rgba(139,92,246,0.5)]",
    dot: "bg-[#a855f7] ring-[#c084fc]/50",
    text: "text-[#e9d5ff]",
    badge: "bg-[#6d28d9]/80 text-[#faf5ff] border-[#a855f7]/60",
    button: "bg-[#7e22ce] hover:bg-[#a855f7] text-white border-[#c084fc]/60",
  },
  6: {
    border: "border-[#a855f7]/50 hover:border-[#d8b4fe]/80",
    borderActive: "border-[#d8b4fe] shadow-[0_0_25px_rgba(168,85,247,0.55)]",
    dot: "bg-[#c084fc] ring-[#d8b4fe]/60",
    text: "text-[#f3e8ff]",
    badge: "bg-[#7e22ce]/80 text-white border-[#c084fc]/60",
    button: "bg-[#8b5cf6] hover:bg-[#c084fc] text-white border-[#d8b4fe]/60",
  },
  7: {
    border: "border-[#c084fc]/60 hover:border-[#e9d5ff]/90",
    borderActive: "border-[#e9d5ff] shadow-[0_0_30px_rgba(192,132,252,0.65)]",
    dot: "bg-[#e9d5ff] ring-[#f3e8ff]/80",
    text: "text-white",
    badge: "bg-[#8b5cf6]/80 text-white border-[#e9d5ff]/70",
    button: "bg-[#a855f7] hover:bg-[#d8b4fe] text-slate-950 font-bold border-[#e9d5ff]",
  },
};

/* ══════════════════════════════════════════════════════
   DATA ROADMAP
══════════════════════════════════════════════════════ */
const ROADMAP_DATA: RoadmapItem[] = [
  {
    id: "gsa-2025",
    year: "2025",
    title: "Google Student Ambassador",
    organization: "Google Indonesia",
    category: "AI & Community",
    location: "Surabaya, Indonesia",
    highlights: [
      "Promoted AI literacy through workshops and community engagement.",
      "Supported campus initiatives introducing generative AI technologies.",
    ],
    skills: ["AI Literacy", "Generative AI", "Public Speaking", "Community Engagement"],
    media: [
      { type: "image", url: "/certificates/gsa1.jpeg" },
      { type: "image", url: "/certificates/gsa2.jpeg" },
      { type: "video", url: "/certificates/gsa3.mp4" },
    ],
    colorLevel: 1,
  },
  {
    id: "ppsd-2025",
    year: "2024 - 2025",
    title: "1st Runner Up Putra Putri Sains Data 2025",
    organization: "HIMASADA UNESA",
    category: "Award",
    location: "Surabaya, Indonesia",
    highlights: [
      "Selected as 1st Runner-Up among Data Science Ambassador finalists.",
      "Promoted academic excellence and represented the Data Science program in university activities.",
    ],
    skills: ["Leadership", "Data Science Advocacy", "Public Relations", "Branding"],
    media: [
      { type: "image", url: "/certificates/ppsd1.png" },
      { type: "image", url: "/certificates/ppsd2.jpeg" },
      { type: "image", url: "/certificates/ppsd3.jpeg" },
      { type: "image", url: "/certificates/ppsd4.jpeg" },
    ],
    colorLevel: 2,
  },
  {
    id: "pematerippsd-2025",
    year: "2025",
    title: "Pemateri Karantina Putra Putri Sains Data",
    organization: "HIMASADA UNESA",
    category: "Mentorship",
    location: "Surabaya, Indonesia",
    highlights: [
      "Delivered sharing and training sessions for finalists during the quarantine period of Putra Putri Sains Data 2026.",
      "Guided finalists on public speaking, personal branding, and data science advocacy.",
    ],
    skills: ["Public Speaking", "Mentorship", "Personal Branding", "Data Science Advocacy"],
    media: [
      { type: "image", url: "/certificates/pemateri1.jpeg" },
      { type: "image", url: "/certificates/pemateri2.jpeg" },
      { type: "image", url: "/certificates/pemateri3.jpeg" },
    ],
    colorLevel: 3,
  },
  {
    id: "coach-2025",
    year: "2025",
    title: "Coach (Orientation Mentor)",
    organization: "BEM FMIPA UNESA",
    category: "Mentorship",
    location: "Surabaya, Indonesia",
    highlights: [
      "Mentored incoming students during the faculty orientation program.",
    ],
    skills: ["Mentorship", "Leadership", "Student Guidance", "Communication"],
    media: [
      { type: "image", url: "/certificates/coach1.jpeg" },
      { type: "image", url: "/certificates/coach2.jpeg" },
    ],
    colorLevel: 4,
  },
  {
    id: "moderator-gss-2025",
    year: "2025",
    title: "Moderator Group Sharing Spiritual (GSS) 2025",
    organization: "HIMASADA UNESA",
    category: "Leadership",
    location: "Surabaya, Indonesia",
    highlights: [
      "Moderated academic discussions involving students and invited speakers.",
    ],
    skills: ["Moderating", "Public Speaking", "Discussion Facilitation"],
    media: [{ type: "image", url: "/certificates/moderator1.jpeg" }],
    colorLevel: 5,
  },
  {
    id: "mc-short-movie-2025",
    year: "2025",
    title: "Master of Ceremony (MC) Data Science Short Movie 2025",
    organization: "HIMASADA UNESA",
    category: "Leadership",
    location: "Surabaya, Indonesia",
    highlights: [
      "Hosted faculty events and coordinated event flow with organizing committees.",
    ],
    skills: ["Master of Ceremony", "Stage Management", "Event Hosting"],
    media: [
      { type: "image", url: "/certificates/sasovi1.jpeg" },
      { type: "video", url: "/certificates/sasovi2.mp4" },
    ],
    colorLevel: 6,
  }, // 👈 Tutup kurung ini sebelumnya hilang!
  {
    id: "mc-reloud-2025",
    year: "2025",
    title: "MC & Talent Promotion RELOUD 2025",
    organization: "HIMASADA UNESA",
    category: "Leadership & Creative",
    location: "Surabaya, Indonesia",
    highlights: [
      "Served as Master of Ceremony (MC) for RELOUD 2025, guiding event flow and maintaining high audience engagement.",
      "Actively involved in talent promotion, showcasing featured performers, and driving promotional reach for the event.",
      "Coordinated with the organizing committee and talents to ensure seamless rundown and stage execution.",
    ],
    skills: ["Master of Ceremony", "Talent Promotion", "Public Speaking", "Stage Management", "Event Branding"],
    media: [
      { type: "image", url: "/certificates/mc1.jpeg" },
      { type: "video", url: "/certificates/talent2.mp4" },
    ],
    colorLevel: 7,
  },
  {
    id: "event-coordinator-2024",
    year: "2024",
    title: "Event Coordinator Staff",
    organization: "HIMASADA UNESA",
    category: "Leadership",
    location: "Surabaya, Indonesia",
    highlights: [
      "Supported the organization of academic and student engagement events.",
      "Collaborated with committees to ensure successful event implementation.",
    ],
    skills: ["Event Planning", "Team Coordination", "Event Operations"],
    media: [
      { type: "image", url: "/certificates/eventstaff1.jpeg" },
      { type: "image", url: "/certificates/eventstaff2.jpeg" },
    ],
    colorLevel: 7,
  },
  {
    id: "ds-certifications",
    year: "2024 - 2025",
    title: "Data Science & Technical Certifications",
    organization: "Dicoding, HarvardX & Online Platforms",
    category: "Certification",
    location: "Online / Remote",
    highlights: [
      "Completed professional certification programs in Python programming, Data Science, and AI fundamentals.",
      "Validated core competencies in data analysis, statistical modeling, and algorithmic problem-solving.",
    ],
    skills: ["Python", "Data Analysis", "Machine Learning", "Data Visualization", "SQL"],
    media: [
      { type: "image", url: "/certificates/ds1.jpeg" },
      { type: "image", url: "/certificates/ds2.jpeg" },
      { type: "image", url: "/certificates/ds3.jpeg" },
      { type: "image", url: "/certificates/ds4.jpeg" },
    ],
    colorLevel: 3,
  },
];

/* ══════════════════════════════════════════════════════
   MAIN ROADMAP COMPONENT
══════════════════════════════════════════════════════ */
export default function ExperienceRoadmap() {
  const { ref, inView } = useInView(0.1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // State Galeri Pop-up Lightbox
  const [activeMediaList, setActiveMediaList] = useState<MediaItem[] | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const openGallery = (media: MediaItem[]) => {
    setActiveMediaList(media);
    setCurrentMediaIndex(0);
  };

  const nextMedia = () => {
    if (!activeMediaList) return;
    setCurrentMediaIndex((prev) => (prev + 1) % activeMediaList.length);
  };

  const prevMedia = () => {
    if (!activeMediaList) return;
    setCurrentMediaIndex((prev) => (prev - 1 + activeMediaList.length) % activeMediaList.length);
  };

  return (
    <section
      id="experience"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: "linear-gradient(180deg, #070814 0%, #0c0d21 50%, #070814 100%)",
      }}
    >
      {/* Ambient Backdrop Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-950/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-12">
        <SectionHeading
          eyebrow="Experience & Activities"
          title="My Activities & Achievements."
          subtitle="Leadership, community, and the work that happens when you step away from the screen."
        />

        {/* ── ROADMAP CONTAINER ── */}
        <div ref={ref} className="relative mt-16">
          {/* Garis Tengah Gradasi Ungu Tua -> Lilac Terang */}
          <div
            className="absolute left-4 top-2 h-[calc(100%-16px)] w-[2px] -translate-x-1/2 md:left-1/2"
            style={{
              background:
                "linear-gradient(180deg, #3b0764 0%, #581c87 20%, #7e22ce 40%, #8b5cf6 60%, #a855f7 80%, #e9d5ff 100%)",
            }}
          />

          {/* List Pengalaman Zig-Zag */}
          <div className="space-y-8 md:space-y-10">
            {ROADMAP_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              const isOpen = expandedId === item.id;
              const theme = PURPLE_GRADIENT_MAP[item.colorLevel];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Dot Node pada Garis Tengah */}
                  <div className="absolute left-4 top-6 z-20 flex -translate-x-1/2 items-center justify-center md:left-1/2">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className={`h-5 w-5 rounded-full border-2 border-slate-950 transition-all duration-300 ${theme.dot
                        } ${isOpen ? "scale-125 ring-4" : "hover:scale-110"}`}
                      aria-label="Toggle details"
                    />
                  </div>

                  {/* Kotak Pengalaman */}
                  <div
                    className={`ml-10 w-[calc(100%-2.5rem)] md:ml-0 md:w-1/2 ${isEven ? "md:pr-8" : "md:pl-8"
                      }`}
                  >
                    <div
                      className={`group relative overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-300 bg-slate-900/75 hover:bg-slate-900/95 p-5 md:p-6 ${isOpen ? theme.borderActive : theme.border
                        }`}
                    >
                      {/* Top Row: Badge & Year */}
                      <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider border ${theme.badge}`}
                        >
                          <Sparkles className="h-2.5 w-2.5" />
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                          <Calendar className="h-3 w-3" />
                          {item.year}
                        </span>
                      </div>

                      {/* Judul & Organisasi */}
                      <h3 className="text-base font-bold text-white md:text-lg leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                        <span className={`font-semibold ${theme.text}`}>
                          {item.organization}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <MapPin className="h-3 w-3 text-slate-500" />
                          {item.location}
                        </span>
                      </p>

                      {/* Tombol Center: Lihat Detail */}
                      <div className="mt-4 flex justify-center w-full border-t border-white/5 pt-3">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 border shadow-md ${theme.button} hover:scale-105`}
                        >
                          <span>{isOpen ? "Sembunyikan Detail" : "Lihat Detail"}</span>
                          {isOpen ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Detail Pengalaman saat terbuka */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 border-t border-white/10 pt-4">
                              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                                Key Highlights:
                              </p>
                              <ul className="mb-4 space-y-2">
                                {item.highlights.map((h, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-xs leading-relaxed text-slate-300"
                                  >
                                    <CheckCircle2
                                      className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${theme.text}`}
                                    />
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Skill Tags */}
                              <div className="mb-4 flex flex-wrap gap-1.5">
                                {item.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="rounded-md bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10px] text-slate-300 border border-white/[0.08]"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>

                              {/* Tombol Galeri Media */}
                              {item.media && item.media.length > 0 && (
                                <div className="flex justify-center pt-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openGallery(item.media || []);
                                    }}
                                    className="inline-flex items-center gap-2 rounded-lg bg-white/[0.08] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/15 transition border border-white/10 shadow-md"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    Lihat Dokumentasi ({item.media.length} File)
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── LIGHTBOX GALERI POP-UP (MENDUKUNG FOTO & VIDEO) ── */}
        <AnimatePresence>
          {activeMediaList && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMediaList(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 p-3 shadow-2xl"
              >
                {/* Header Modal & Close Button */}
                <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
                  <span className="rounded-full bg-slate-950/80 px-3 py-1 font-mono text-xs text-slate-300 border border-slate-700">
                    {currentMediaIndex + 1} / {activeMediaList.length}
                  </span>
                  <button
                    onClick={() => setActiveMediaList(null)}
                    className="rounded-full bg-slate-950/80 p-2 text-white hover:bg-slate-800 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Media Container (Gambar atau Video) */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
                  {activeMediaList[currentMediaIndex].type === "video" ? (
                    <video
                      key={activeMediaList[currentMediaIndex].url}
                      src={activeMediaList[currentMediaIndex].url}
                      controls
                      autoPlay
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <img
                      key={activeMediaList[currentMediaIndex].url}
                      src={activeMediaList[currentMediaIndex].url}
                      alt="Dokumentasi Kegiatan"
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="p-8 text-center text-slate-400">
                            <p class="font-bold text-lg text-white mb-2">📷 File Tidak Ditemukan</p>
                            <p class="text-xs">Pastikan file tersimpan di folder <code>public/certificates/</code>.</p>
                          </div>`;
                        }
                      }}
                    />
                  )}

                  {/* Tombol Navigasi Kiri / Kanan Jika Media Lebih Dari 1 */}
                  {activeMediaList.length > 1 && (
                    <>
                      <button
                        onClick={prevMedia}
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white hover:bg-slate-800 transition border border-white/10"
                        aria-label="Previous media"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextMedia}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/70 p-2 text-white hover:bg-slate-800 transition border border-white/10"
                        aria-label="Next media"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Indicator Dots (Navigasi Bawah) */}
                {activeMediaList.length > 1 && (
                  <div className="mt-3 flex justify-center items-center gap-2">
                    {activeMediaList.map((m, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentMediaIndex(idx)}
                        className={`h-2 rounded-full transition-all ${idx === currentMediaIndex
                          ? "w-6 bg-purple-500"
                          : "w-2 bg-slate-700 hover:bg-slate-500"
                          }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}