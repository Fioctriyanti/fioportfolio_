"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// Sample data milestone/sertifikat
const milestones = [
  {
    id: 1,
    year: "'25",
    title: "Google Student Ambassador",
    description: "Represented Google Gemini Indonesia, promoting AI literacy & digital innovation.",
    image: "/images/cert-google.jpeg"
  },
  {
    id: 2,
    year: "'25",
    title: "1st Runner-Up PPAD",
    description: "National Data Science 2025 competition runner-up with machine learning models.",
    image: "/images/cert-runnerup.jpeg"
  },
  // Tambahkan item sesuai data milikmu
];

export default function MilestonesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoTour, setIsAutoTour] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % milestones.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + milestones.length) % milestones.length);
  };

  return (
    <section 
      id="certificates"
      className="relative min-h-screen w-full flex flex-col justify-between items-center py-20 px-4 overflow-hidden"
      style={{ backgroundColor: '#EBE6EF' }} // Color palette utama terang
    >
      {/* 1. AMBIENT LIGHTING BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft Radial Ambient Glow di Tengah */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-60 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(158, 74, 187, 0.25) 0%, rgba(235, 230, 239, 0) 70%)' }}
        />
        {/* Grid Dots Pattern Halus */}
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#3A004D_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* 2. HEADER SECTION (FEATURED HIGHLIGHTS & TITLE) */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-3 max-w-2xl">
        {/* Badge Header Terang */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#3A004D]/20 shadow-[0_4px_15px_rgba(58,0,77,0.08)] backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#9E4ABB]" />
          <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-[#3A004D]">
            Featured Highlights
          </span>
        </div>

        {/* Title Utama Warna Deep Purple */}
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#3A004D] tracking-tight font-sans"
          style={{ textShadow: '0 2px 10px rgba(255, 255, 255, 0.8)' }}
        >
          Milestones & Achievements
        </h2>
      </div>

      {/* 3. 3D CAROUSEL / HIGHLIGHT CARDS CONTAINER */}
      <div className="relative z-10 w-full max-w-5xl my-auto py-10 flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-[3/4] sm:aspect-[4/3] flex items-center justify-center">
          {milestones.map((item, index) => {
            const isSelected = index === currentIndex;
            const offset = index - currentIndex;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  scale: isSelected ? 1 : 0.82,
                  x: offset * 180,
                  z: isSelected ? 0 : -100,
                  opacity: Math.abs(offset) > 1 ? 0 : isSelected ? 1 : 0.5,
                  rotateY: offset * -15,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute w-72 sm:w-80 rounded-3xl p-4 bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(58,0,77,0.12)] flex flex-col justify-between overflow-hidden ${
                  isSelected ? 'z-20 ring-2 ring-[#9E4ABB]/40 shadow-[0_25px_60px_rgba(158,74,187,0.25)]' : 'z-10'
                }`}
              >
                {/* Image Container */}
                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-slate-100 border border-black/5">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  {/* Badge Tahun */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#3A004D] text-white text-[10px] font-mono font-bold shadow-md">
                    {item.year}
                  </span>
                </div>

                {/* Card Content Text */}
                <div className="pt-4 pb-1 space-y-1 text-left">
                  <h3 className="text-lg font-bold text-[#3A004D] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#3A004D]/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. BOTTOM NAVIGATION CONTROL BAR (LIGHT GLASSMORPHISM) */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-white/80 border border-[#3A004D]/20 shadow-[0_10px_30px_rgba(58,0,77,0.1)] backdrop-blur-xl">
          {/* Previous Button */}
          <button 
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-[#3A004D]/10 text-[#3A004D] transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Current Label */}
          <span className="text-xs sm:text-sm font-bold text-[#3A004D] min-w-[160px] text-center font-sans">
            {milestones[currentIndex]?.title}
          </span>

          {/* Auto Tour Toggle Button */}
          <button 
            onClick={() => setIsAutoTour(!isAutoTour)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3A004D] text-white text-xs font-semibold hover:bg-[#8B4F67] transition-all shadow-sm"
          >
            {isAutoTour ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            <span>AUTO TOUR</span>
          </button>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-[#3A004D]/10 text-[#3A004D] transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </section>
  );
}