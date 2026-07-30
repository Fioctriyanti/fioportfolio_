"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LucideIcon,
  Sparkles, 
  User, 
  Box, 
  Cpu, 
  BarChart3, 
  Briefcase, 
  Award, 
  Send,
  ArrowUpRight
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero', icon: Sparkles },
  { id: 'about', label: 'About', href: '#about', icon: User },
  { id: '3d-tour', label: '3D Tour', href: '#three-tunnel-section', icon: Box, badge: '3D' },
  { id: 'skills', label: 'Skills', href: '#tools-skills', icon: Cpu },
  { id: 'projects', label: 'Projects', href: '#projects', icon: BarChart3 },
  { id: 'experience', label: 'Experience', href: '#experience', icon: Briefcase },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Send },
];

export default function DashboardNav() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full z-50 px-3 sm:px-6 pt-4"
    >
      {/* Top Bar Container Glassmorphism */}
      <div className="relative w-full rounded-2xl sm:rounded-full bg-slate-950/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 p-2 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 overflow-hidden">
        
        {/* Ambient Purple Glow */}
        <div className="absolute -top-10 left-1/4 w-1/2 h-20 bg-purple-500/20 blur-3xl pointer-events-none rounded-full" />
        
        {/* Specular Light Reflection Line */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* SISI KIRI: Navigasi Rata Kiri dengan Sliding Pill Highlight */}
        <nav 
          className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-1 max-w-[75%] sm:max-w-none"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredTab === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHoveredTab(item.id)}
                onClick={(e) => handleScroll(e, item.href)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 shrink-0 select-none group"
              >
                {/* Sliding Animated Background Pill */}
                {isHovered && (
                  <motion.div
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-inner"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <Icon className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${isHovered ? 'text-purple-300' : 'text-white/70'}`} />

                {/* Text Label */}
                <span className="relative z-10 tracking-wide font-sans">{item.label}</span>

                {/* Badge Optional */}
                {item.badge && (
                  <span className="relative z-10 text-[9px] font-mono px-1.5 py-0.2 rounded-md bg-purple-500/40 text-purple-200 border border-purple-400/40 uppercase tracking-widest ml-0.5">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* SISI KANAN: Logo FIO & Status Badge */}
        <div className="shrink-0 flex items-center gap-3 pr-2">
          {/* Status Badge Live */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300/90 font-medium">
              Available
            </span>
          </div>

          {/* Logo Button FIO */}
          <a 
            href="#hero" 
            onClick={(e) => handleScroll(e, '#hero')}
            className="relative group flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 via-white/10 to-purple-600/20 border border-white/30 hover:border-purple-400/60 transition-all duration-300 shadow-md hover:shadow-purple-500/20"
          >
            <span className="font-extrabold text-sm sm:text-base tracking-widest text-white font-sans group-hover:scale-105 transition-transform flex items-center gap-0.5">
              FIO
              <span className="text-purple-400 animate-pulse">.</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

      </div>
    </motion.header>
  );
}