"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PrismBackground from "./PrismBackground";
import HeroMarquee from "./HeroMarquee";

const roleTags = [
  "Data Science Undergraduate",
  "AI & ML Enthusiast",
  "Google Student Ambassador",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const prismOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden z-20"
      style={{
        backgroundColor: "#EBE6EF",
      }}
    >
      {/* Latar Belakang Shader / Polkadot Canvas */}
      <motion.div style={{ opacity: prismOpacity }} className="absolute inset-0 z-0">
        <PrismBackground />
      </motion.div>

      {/* MARQUEE ATAS */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-20 bg-transparent py-4">
        <HeroMarquee />
      </div>

      {/* Kontainer Grid Utama Konten */}
      <motion.div
        style={{ opacity: heroOpacity, y: contentY }}
        className="container relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pt-36 pb-24 lg:grid-cols-12 w-full my-auto overflow-visible pointer-events-none"
      >
        {/* SISI KIRI: Teks Deskripsi */}
        <div className="relative flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left justify-center overflow-visible pointer-events-auto p-2 sm:p-4 rounded-3xl">

          {/* 🌟 1. STEALTH RADIAL BLUR & AURA HALO BACKGROUND 🌟 */}
          <div
            className="absolute -inset-6 sm:-inset-10 rounded-[4rem] pointer-events-none -z-10 backdrop-blur-[8px]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(235, 230, 239, 0.92) 20%, rgba(235, 230, 239, 0.65) 60%, rgba(235, 230, 239, 0) 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 45%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse at center, black 45%, transparent 100%)',
            }}
          />

          <div className="flex flex-col items-center lg:items-start space-y-6 w-full">

            {/* Tag 1: Available Badge */}
            <div
              className="inline-flex items-center rounded-full border border-[#3A004D]/20 px-4 py-1.5 text-xs font-semibold shadow-[0_4px_20px_rgba(255,255,255,0.9)]"
              style={{
                backgroundColor: "#3A004D",
                color: "#FFFFFF",
              }}
            >
              Available for Internships & Projects
            </div>

            {/* Title dengan White Ambient Halo */}
            <h1
              className="font-[family-name:var(--font-safira-style)] italic font-medium text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.1] text-[#3A004D]"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.95), 0 0 35px rgba(255, 255, 255, 0.8), 0 2px 10px rgba(255, 255, 255, 1)'
              }}
            >
              Hi, I&apos;m Fio <br />
              Octriyanti
            </h1>

            {/* Role Tags */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {roleTags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3.5 py-1.5 bg-[#3A004D] text-white font-medium rounded-full shadow-[0_2px_12px_rgba(255,255,255,0.8)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description dengan Ambient White Halo */}
            <p
              className="max-w-2xl text-base text-[#3A004D] md:text-lg font-medium leading-relaxed"
              style={{
                textShadow: '0 0 14px rgba(255, 255, 255, 0.95), 0 0 28px rgba(255, 255, 255, 0.7)'
              }}
            >
              Data Science undergraduate at Universitas Negeri Surabaya. Aspiring Data Analyst passionate about uncovering insights through data visualization and machine learning.
            </p>

            {/* Tombol Aksi Utama */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 lg:justify-start relative z-30">
              {/* Button 1: View Work */}
              <Link
                href="#projects"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#3A004D] px-6 font-semibold text-white transition-all hover:bg-[#8B4F67] pointer-events-auto shadow-[0_4px_20px_rgba(255,255,255,0.85)] hover:shadow-xl"
              >
                View Work <ArrowRight className="ml-2 h-4 w-4 text-white" />
              </Link>

              {/* Button 2: Download CV */}
              <a
                href="/Fio Octriyanti_DataAnalyst.CV.pdf"
                download="Fio_Octriyanti_CV.pdf"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#3A004D] bg-white px-6 font-semibold text-[#3A004D] transition-all hover:bg-gray-100 cursor-pointer pointer-events-auto shadow-[0_4px_20px_rgba(255,255,255,0.85)] hover:shadow-xl"
              >
                Download CV <Download className="ml-2 h-4 w-4 text-[#3A004D]" />
              </a>
            </div>
          </div>
        </div>

        {/* SISI KANAN: Foto Panggung */}
        <div className="relative lg:col-span-5 w-full flex items-center justify-center pointer-events-auto">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl p-1 bg-gradient-to-tr from-[#3A004D]/30 via-[#8B4F67]/30 to-[#9E4ABB]/30 shadow-xl backdrop-blur-md border border-[#3A004D]/10">
            <div className="w-full h-full rounded-xl overflow-hidden bg-white relative">
              <Image
                src="/images/fio-latest.jpeg"
                alt="Fio Octriyanti Portrait"
                fill
                priority
                className="object-cover object-center scale-100"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#9E4ABB] to-[#8B4F67] opacity-15 blur-xl -z-10" />
          </div>
        </div>
      </motion.div>

      {/* MARQUEE BAWAH */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20 bg-transparent py-4">
        <HeroMarquee />
      </div>
    </section>
  );
}