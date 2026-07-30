"use client";

import React from 'react';
import { motion } from 'framer-motion';

const HeroDesign = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center font-sans select-none">
      {/* 1. BACKGROUND GRADIENT & NOISE */}
      <div className="absolute inset-0 bg-[#0B0F1A] z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#1E3A8A] to-[#DB2777]/30 opacity-80" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-400/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[100px] rounded-full" />
        
        {/* Grain/Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* 2. TRANSFORM / BOUNDING BOX CONTAINER */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, rotate: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: -5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative p-8 border border-white/30 group"
      >
        {/* Anchor Points (Sudut-sudut kotak) */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 shadow-sm" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 shadow-sm" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 shadow-sm" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 shadow-sm" />
        
        {/* Center Point Line (Dekorasi tambahan gaya Figma) */}
        <div className="absolute top-1/2 left-[-20px] w-4 h-[1px] bg-white/30" />
        <div className="absolute top-1/2 right-[-20px] w-4 h-[1px] bg-white/30" />

        {/* CENTER ELEMENT: TEXT "PORTOFOLIO" */}
        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]">
          PORTOFOLIO
        </h1>

        {/* 4. PIXEL CURSOR */}
        <motion.div 
          initial={{ x: 100, y: 100 }}
          animate={{ x: -20, y: -20 }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
          className="absolute -bottom-12 -right-4 z-50 pointer-events-none"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V28L10.5 21.5L14.5 30L19 28L15 19.5L24 19L4 4Z" fill="white" stroke="black" strokeWidth="2"/>
          </svg>
          <div className="ml-6 mt-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-sm font-mono shadow-lg">
            Editor
          </div>
        </motion.div>

        {/* 5. FLOATING CONTEXT MENU (KANAN) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute top-0 -right-48 w-40 bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden flex flex-col z-40"
        >
          {["Data Analyst", "Data Entry", "Data Scientist", "Admin"].map((item, index, arr) => (
            <div 
              key={item}
              className={`px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors ${
                index !== arr.length - 1 ? 'border-b border-slate-200/50' : ''
              }`}
            >
              {item}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* 6. BOTTOM BADGE */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-white px-8 py-3 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.2)] border border-slate-200 transition-transform hover:scale-105 cursor-default">
          <p className="text-slate-900 text-sm md:text-base tracking-wide whitespace-nowrap">
            Presented by <span className="font-bold">Fio Octriyanti</span>
          </p>
        </div>
      </div>

      {/* Grid Overlay (Opsional: Memberikan kesan kanvas desain) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] z-0" />
    </section>
  );
};

export default HeroDesign;
