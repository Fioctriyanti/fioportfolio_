"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { MapPin } from "lucide-react";

const PARAGRAPHS = [
  {
    id: "who",
    eyebrow: "Who I am",
    text: "I'm Fio Octriyanti, a Data Science undergraduate (International Track) at UNESA with a GPA of 3.84. I transform curiosity into a rigorous framework, using data to ask precise questions and find reliable, impactful answers.",
  },
  {
    id: "motivates",
    eyebrow: "What motivates me",
    text: "I bridge the gap between complex raw data and actionable decisions. Driven by finding structure in noise, I specialize in Machine Learning and NLP, and have promoted AI literacy nationwide as a selected Google Student Ambassador.",
  },
  {
    id: "builds",
    eyebrow: "What I enjoy building",
    text: "I build projects that solve real-world complexities: analyzing 7,000+ social media posts using IndoBERT & LDA, developing interpretable customer churn models, and designing CNNs for low-resource audio classification.",
  },
  {
    id: "aspires",
    eyebrow: "Where I'm heading",
    text: "Aiming for a Data Analyst or Data Scientist role where technical rigor meets clear communication. My foundation in Python, SQL, and TensorFlow is backed by certifications from HarvardX, Google, and Dicoding.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function AboutStory() {
  const { ref, inView } = useInView(0.1);

  return (
    <div ref={ref} className="flex flex-col justify-center">
      {PARAGRAPHS.map((para, i) => (
        <motion.div
          key={para.id}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease, delay: 0.1 + i * 0.12 }}
          className="mb-8 last:mb-0"
        >
          {/* Eyebrow */}
          <div className="mb-2 flex items-center gap-2">
            <div
              className="h-px w-6 rounded-full"
              style={{
                background: "linear-gradient(90deg, #3A004D, #8B4F67)",
              }}
              aria-hidden="true"
            />
            {/* Mengubah warna teks judul kecil menjadi Muted Plum */}
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8B4F67] font-semibold">
              {para.eyebrow}
            </span>
          </div>

          {/* Paragraph */}
          {/* Mengubah warna paragraf utama menjadi Ungu Gelap Medium agar terbaca di background terang */}
          <p
            className="text-[15px] leading-[1.85] text-[#51385c]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {para.text}
          </p>
        </motion.div>
      ))}

      {/* Availability + location */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease, delay: 0.6 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        {/* BADGE: Dikunci ke Dark Violet (#3A004D) & Teks Lilac Cerah (#EBE6EF) */}
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold shadow-sm"
          style={{
            backgroundColor: "#3A004D",
            color: "#EBE6EF",
            border: "1px solid rgba(58, 0, 77, 0.1)",
          }}
        >
          <span
            className="h-2 w-2 animate-pulse rounded-full"
            style={{ background: "#EBE6EF" }} /* Dot indikator menjadi Lilac Cerah mengikuti teks */
            aria-hidden="true"
          />
          Open to internships &amp; entry-level roles
        </span>

        {/* Text Location: Surabaya, Indonesia */}
        <span className="flex items-center gap-1.5 text-[12px] text-[#3A004D]/60 font-medium">
          <MapPin className="h-3.5 w-3.5 text-[#8B4F67]" strokeWidth={2} />
          Surabaya, Indonesia
        </span>
      </motion.div>
    </div>
  );
}