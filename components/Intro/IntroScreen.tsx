"use client";

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import DashboardNav from './DashboardNav';
import { 
  BarChart3, 
  BrainCircuit, 
  Database, 
  Terminal, 
  TrendingUp, 
  Sparkles,
  Cpu,
  Activity,
  GitBranch
} from 'lucide-react';

// Dynamic import FloatingBadge tanpa SSR agar tidak error saat load WebGL
const FloatingBadge = dynamic(() => import('@/components/hero/FloatingBadge'), {
  ssr: false,
});

const IntroScreen = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between items-center font-sans select-none z-[100] pb-8 bg-[#f6f2fb]">
      
      {/* 1. CUSTOM BACKGROUND IMAGE WITH BRIGHT GLASS OVERLAY */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-intronew.jpeg')" }}
      >
        {/* Bright Frosted Overlay */}
        <div className="absolute inset-0 bg-white/35 backdrop-blur-[3px]" />
        
        {/* Radial Ambient Light Glows for Glassmorphism Depth */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-300/25 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Soft Canvas Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.2] bg-[radial-gradient(#6b21a8_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* 2. AMBIENT NEURAL DATA NODES */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.15, 0.9] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-1/3 left-12 w-2.5 h-2.5 rounded-full bg-purple-600 shadow-[0_0_15px_#9333ea]"
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 right-1/4 w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-[0_0_18px_#6366f1]"
        />
        <motion.div 
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_16px_#ec4899]"
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/4 right-16 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]"
        />
      </div>

      {/* 3. 3D FLOATING BADGE LAYER */}
      <FloatingBadge 
        frontImage="/images/front-lanyard.png"
        backImage="/images/back-lanyard.jpeg"
      />

      {/* 4. TOP DASHBOARD NAVIGATION */}
      <DashboardNav />

      {/* ========================================================= */}
      {/* 🌟 BRIGHT GLASS FLOATING WIDGETS 🌟 */}
      {/* ========================================================= */}

      {/* WIDGET 1: DATA ANALYTICS & VISUALIZATION (KANAN ATAS) */}
      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute right-6 sm:right-16 top-24 sm:top-28 z-20 hidden md:flex items-center gap-3 p-3.5 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-[0_15px_30px_rgba(100,116,139,0.12)] hover:scale-105 transition-transform"
      >
        <div className="p-2.5 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl text-white shadow-md">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-900 font-bold flex items-center gap-1">
            Data Science <TrendingUp className="w-3 h-3 text-emerald-600" />
          </span>
          <span className="text-xs font-extrabold text-slate-800 tracking-wide">Data Visualization</span>
        </div>
      </motion.div>

      {/* CHIP MINI 1A: ACCURACY METRIC */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }}
        className="absolute right-8 sm:right-20 top-48 sm:top-52 z-20 hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-white/70 backdrop-blur-xl border border-white/90 rounded-full shadow-md"
      >
        <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span className="text-[11px] font-mono font-semibold text-slate-800">Model Acc: <span className="text-emerald-600 font-extrabold">98.4%</span></span>
      </motion.div>


      {/* WIDGET 2: AI & MACHINE LEARNING (KIRI BAWAH) */}
      <motion.div 
        animate={{ y: [0, 14, 0], rotate: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
        className="absolute left-6 sm:left-12 bottom-24 sm:bottom-28 z-20 hidden md:flex items-center gap-3 p-3.5 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-[0_15px_30px_rgba(100,116,139,0.12)] hover:scale-105 transition-transform"
      >
        <div className="p-2.5 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-xl text-white shadow-md">
          <BrainCircuit className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-wider text-pink-900 font-bold flex items-center gap-1">
            Informatics <Sparkles className="w-3 h-3 text-amber-500" />
          </span>
          <span className="text-xs font-extrabold text-slate-800 tracking-wide">AI & Machine Learning</span>
        </div>
      </motion.div>

      {/* CHIP MINI 2A: TENSORFLOW / PYTORCH */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.2 }}
        className="absolute left-8 sm:left-16 bottom-48 sm:bottom-52 z-20 hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-white/70 backdrop-blur-xl border border-white/90 rounded-full shadow-md"
      >
        <Cpu className="w-3.5 h-3.5 text-purple-700" />
        <span className="text-[11px] font-mono text-slate-800 font-semibold">TensorFlow & PyTorch</span>
      </motion.div>


      {/* WIDGET 3: DATABASE & BIG DATA */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        className="absolute left-6 sm:left-10 top-1/2 -translate-y-12 z-20 hidden lg:flex items-center gap-3 p-3 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-md hover:scale-105 transition-transform"
      >
        <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg text-white">
          <Database className="w-4 h-4" />
        </div>
        <div className="flex flex-col pr-1">
          <span className="text-[9px] font-mono uppercase text-cyan-900 font-bold">Engineering</span>
          <span className="text-xs font-extrabold text-slate-800">SQL & Big Data</span>
        </div>
      </motion.div>


      {/* WIDGET 4: ALGORITHMS & CODE */}
      <motion.div 
        animate={{ y: [0, 12, 0], rotate: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.5 }}
        className="absolute right-6 sm:right-12 bottom-36 sm:bottom-40 z-20 hidden md:flex items-center gap-3 p-3 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-md hover:scale-105 transition-transform"
      >
        <div className="p-2 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-lg text-white">
          <Terminal className="w-4 h-4" />
        </div>
        <div className="flex flex-col pr-1">
          <span className="text-[9px] font-mono uppercase text-emerald-900 font-bold">Scripting</span>
          <span className="text-xs font-extrabold text-slate-800">Python & R Mining</span>
        </div>
      </motion.div>


      {/* CHIP MINI 5: ETL PIPELINES */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut", delay: 0.3 }}
        className="absolute right-8 sm:right-14 top-1/2 -translate-y-16 z-20 hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-white/70 backdrop-blur-xl border border-white/90 rounded-full shadow-md"
      >
        <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
        <span className="text-[11px] font-mono text-slate-800 font-semibold">ETL Pipelines</span>
      </motion.div>

      {/* ========================================================= */}

      {/* 5. TRANSFORM BOUNDING BOX CONTAINER (MY PORTFOLIO) */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, rotate: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: -3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative px-8 py-6 sm:px-12 sm:py-8 border-2 border-white/90 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(100,116,139,0.15)] group z-30 my-auto"
      >
        {/* Anchor Points (Sudut-sudut kotak) */}
        <div className="absolute -top-2 -left-2 w-3.5 h-3.5 bg-white border border-purple-400 shadow-sm rounded-sm" />
        <div className="absolute -top-2 -right-2 w-3.5 h-3.5 bg-white border border-purple-400 shadow-sm rounded-sm" />
        <div className="absolute -bottom-2 -left-2 w-3.5 h-3.5 bg-white border border-purple-400 shadow-sm rounded-sm" />
        <div className="absolute -bottom-2 -right-2 w-3.5 h-3.5 bg-white border border-purple-400 shadow-sm rounded-sm" />

        {/* CENTER ELEMENT: TEXT "MY PORTFOLIO" */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tight drop-shadow-[0_4px_12px_rgba(255,255,255,0.8)] whitespace-nowrap pr-4 sm:pr-8">
          MY PORTFOLIO
        </h1>

        {/* PIXEL CURSOR */}
        <motion.div 
          initial={{ x: -40, y: 40, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="absolute -bottom-5 left-3 sm:-bottom-6 sm:left-6 z-40 pointer-events-none"
        >
          <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md scale-110 sm:scale-125">
            <path d="M4 4V28L10.5 21.5L14.5 30L19 28L15 19.5L24 19L4 4Z" fill="#3b0764" stroke="white" strokeWidth="2"/>
          </svg>
        </motion.div>

        {/* FLOATING CONTEXT MENU (BRIGHT GLASS iOS UI) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute -right-3 sm:-right-8 -bottom-16 sm:-bottom-20 w-36 sm:w-44 bg-white/80 backdrop-blur-2xl rounded-[20px] shadow-[0_15px_35px_rgba(100,116,139,0.18)] border border-white/90 overflow-hidden flex flex-col z-40 text-center"
        >
          {["Data Analyst", "AI & ML Enthusiast", "Data Scientist", "Google Student Ambassador"].map((item, index, arr) => (
            <div 
              key={item}
              className={`py-2 sm:py-2.5 px-3 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-purple-50/80 active:scale-[0.98] transition-all cursor-pointer ${
                index !== arr.length - 1 ? 'border-b border-purple-100/60' : ''
              }`}
            >
              {item}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* 6. BOTTOM BADGE */}
      <div className="z-30">
        <div className="bg-white/85 px-6 py-2 rounded-full shadow-[0_10px_25px_rgba(100,116,139,0.12)] border border-white transition-transform hover:scale-105 cursor-default backdrop-blur-xl">
          <p className="text-slate-800 text-xs sm:text-sm tracking-wide whitespace-nowrap font-semibold">
            Presented by <span className="font-black text-purple-950">Fio Octriyanti</span>
          </p>
        </div>
      </div>

    </section>
  );
};

export default IntroScreen;