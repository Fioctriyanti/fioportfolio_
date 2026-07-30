"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  download?: boolean;
  icon?: ReactNode;
}

export default function MagneticButton({
  href,
  onClick,
  children,
  variant = "primary",
  download,
  icon,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  function handlePointerMove(e: React.PointerEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  const baseClass =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-shadow duration-300";

  const variantClass = {
    primary:
      "text-white shadow-[0_4px_24px_rgba(74,124,247,0.4)] hover:shadow-[0_6px_32px_rgba(139,92,246,0.55)]",
    secondary:
      "border border-white/25 text-white hover:border-white/45 hover:bg-white/5",
    ghost: "text-white/70 hover:text-white",
  }[variant];

  const gradientStyle =
    variant === "primary"
      ? { background: "linear-gradient(135deg, #00c8f0, #4a7cf7, #8b5cf6)" }
      : undefined;

  const content = (
    <motion.span
      style={{ x: springX, y: springY, ...gradientStyle }}
      className={`${baseClass} ${variantClass}`}
    >
      {children}
      {icon}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="inline-block rounded-full"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="inline-block rounded-full"
    >
      {content}
    </button>
  );
}
