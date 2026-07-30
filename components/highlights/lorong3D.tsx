"use client";

import * as THREE from "three";
import { Suspense, useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

// Simple mathematical Seeded PRNG
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// 1. DATA 6 FOTO JOURNEY
const HIGHLIGHT_ITEMS = [
    { id: "gsa", title: "Google Student Ambassador", desc: "Represented Google Gemini Indonesia, promoting AI literacy & digital innovation.", image: "/images/journey/gsa.jpeg", year: "'25", zPos: 0, rotY: 0.08 },
    { id: "ppsd", title: "1st Runner-Up PPSD", desc: "Putra Putri Data Science 2025. Competed in multi-stage national analytics.", image: "/images/journey/ppsd.jpeg", year: "'25", zPos: -7, rotY: -0.08 },
    { id: "gpa", title: "GPA 3.84 / 4.00", desc: "Bachelor of Data Science at UNESA. Specializing in ML & Statistics.", image: "/images/journey/gpa.jpeg", year: "'24", zPos: -14, rotY: 0.06 },
    { id: "international", title: "International Track", desc: "English-medium curriculum at UNESA's Faculty of Mathematics & Sciences.", image: "/images/journey/international.jpeg", year: "'24", zPos: -21, rotY: -0.06 },
    { id: "projects", title: "Data & ML Projects", desc: "Built scalable NLP, analytics dashboards, and predictive models.", image: "/images/journey/projects.jpeg", year: "'24", zPos: -28, rotY: 0.08 },
    { id: "certificates", title: "Certifications & Awards", desc: "Certified in Google Data Analytics, Machine Learning & Cloud Computing.", image: "/images/journey/certificates.jpeg", year: "'24", zPos: -35, rotY: 0 },
];

// 2. TUNNEL PARTICLES (Dekoratif Terang)
function TunnelParticles() {
    const groupRef = useRef<THREE.Group>(null);
    const particles = useMemo(() => {
        const items = [];
        const colors = ["#7c3aed", "#d946ef", "#2563eb", "#059669"];
        for (let i = 0; i < 70; i++) {
            const r1 = seededRandom(i * 12.34);
            const r2 = seededRandom(i * 56.78);
            const r3 = seededRandom(i * 90.12);
            const r4 = seededRandom(i * 34.56);
            const r5 = seededRandom(i * 78.90);
            items.push({ x: (r1 - 0.5) * 16, y: (r2 - 0.5) * 10, z: -r3 * 45, color: colors[Math.floor(r4 * colors.length)], size: 0.03 + r5 * 0.05 });
        }
        return items;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        groupRef.current.children.forEach((mesh, i) => {
            mesh.position.y += Math.sin(t + i) * 0.0015;
        });
    });

    return (
        <group ref={groupRef}>
            {particles.map((p, idx) => (
                <mesh key={idx} position={[p.x, p.y, p.z]}>
                    <sphereGeometry args={[p.size, 8, 8]} />
                    <meshBasicMaterial color={p.color} transparent opacity={0.7} />
                </mesh>
            ))}
        </group>
    );
}

// 3. KOMPONEN KARTU POLAROID (TERANG & GLASSMORPHISM)
function HighlightCard3D({ data, currentZ, onClick }: { data: typeof HIGHLIGHT_ITEMS[0]; currentZ: number; onClick: () => void }) {
    const { viewport } = useThree();
    const isMobile = viewport.width < 7;
    const xPos = isMobile ? 0 : (data.id === "certificates" ? 0 : (data.zPos % 14 === 0 ? -1.8 : 1.8));
    
    const isVisible = Math.abs(data.zPos - (-currentZ)) < 25;

    if (!isVisible) return null;

    return (
        <mesh position={[xPos, 0, data.zPos]} rotation={[0, data.rotY, 0]}>
            <Html transform distanceFactor={2.6} className="pointer-events-none">
                <div 
                    onClick={onClick}
                    className="w-[290px] sm:w-[330px] rounded-2xl overflow-hidden bg-white/80 border border-white/90 p-4 flex flex-col justify-between backdrop-blur-xl shadow-[0_20px_50px_rgba(58,0,77,0.15)] select-none pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:border-purple-300 hover:shadow-[0_15px_40px_rgba(168,85,247,0.25)]"
                >
                    <div className="relative w-full h-[300px] rounded-xl overflow-hidden bg-purple-50/50 border border-purple-100 flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 scale-110 blur-xl pointer-events-none" style={{ backgroundImage: `url(${data.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                        <Image src={data.image} alt={data.title} fill className="object-contain object-center z-10 p-2" sizes="330px" priority />
                        <span className="absolute top-3 right-3 bg-purple-600 text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full shadow-md z-20 font-bold">{data.year}</span>
                    </div>
                    <div className="flex flex-col gap-1 pt-3 pb-1 z-10">
                        <h3 className="text-slate-900 font-bold text-sm tracking-wide line-clamp-1">{data.title}</h3>
                        <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">{data.desc}</p>
                    </div>
                </div>
            </Html>
        </mesh>
    );
}

// 4. KONTROL PERGERAKAN LORONG
const TunnelScene = forwardRef(({ activeIndex, setActiveIndex }: { activeIndex: number; setActiveIndex: (idx: number) => void }, ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const targetZ = useRef(0);
    const [currentZ, setCurrentZ] = useState(0);
    const { scene } = useThree();

    useEffect(() => {
        // Fog terang disesuaikan dengan tone warna bg
        scene.fog = new THREE.Fog("#F3EFF8", 5, 38);
        return () => { scene.fog = null; };
    }, [scene]);

    useImperativeHandle(ref, () => ({
        scrollToIndex: (idx: number) => {
            const item = HIGHLIGHT_ITEMS[idx];
            if (item) {
                targetZ.current = -item.zPos;
                setActiveIndex(idx);
            }
        }
    }));

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        
        groupRef.current.position.z = THREE.MathUtils.lerp(
            groupRef.current.position.z,
            targetZ.current,
            delta * 3
        );
        setCurrentZ(groupRef.current.position.z);
    });

    return (
        <group ref={groupRef}>
            <TunnelParticles />
            {HIGHLIGHT_ITEMS.map((item, idx) => (
                <HighlightCard3D 
                    key={item.id} 
                    data={item} 
                    currentZ={currentZ}
                    onClick={() => {
                        targetZ.current = -item.zPos;
                        setActiveIndex(idx);
                    }}
                />
            ))}
        </group>
    );
});
TunnelScene.displayName = 'TunnelScene';

// 5. MAIN CONTAINER
export default function Lorong3D() {
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const tunnelRef = useRef<any>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % HIGHLIGHT_ITEMS.length;
            tunnelRef.current?.scrollToIndex(nextIndex);
        }, 5000);
        return () => clearInterval(interval);
    }, [isPlaying, activeIndex]);

    if (!mounted) return <div className="w-full h-screen bg-transparent" />;

    const handlePrev = () => {
        if (activeIndex > 0) tunnelRef.current?.scrollToIndex(activeIndex - 1);
    };
    const handleNext = () => {
        if (activeIndex < HIGHLIGHT_ITEMS.length - 1) tunnelRef.current?.scrollToIndex(activeIndex + 1);
    };

    return (
        <section id="three-tunnel-section" className="relative w-full h-screen overflow-hidden">
            {/* BACKGROUND TERANG & UNIFIED WALLPAPER */}
            <div 
                className="absolute inset-0 w-full h-full bg-[#F3EFF8] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/bg-intronew.jpeg')" }}
            >
                {/* Soft Light Blur Overlay */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
                
                {/* Soft Grid Accent */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[radial-gradient(#7e22ce_1px,transparent_1px)] [background-size:28px_28px]" />

                {/* Header & Controls UI */}
                <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 text-center z-30 w-full max-w-3xl px-4 pointer-events-none">
                    <div className="inline-block px-6 py-2.5 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
                        <h2 className="text-xs font-mono tracking-[0.25em] text-purple-700 uppercase mb-0.5 font-bold">Featured Highlights</h2>
                        <p className="text-2xl md:text-4xl font-black text-[#2D0041] tracking-tight drop-shadow-sm">Milestones & Achievements</p>
                    </div>
                </div>
                
                {/* BOTTOM NAVIGATION BAR */}
                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-40 w-[92%] max-w-lg">
                    <div className="bg-white/80 border border-white/90 px-5 py-3 rounded-full backdrop-blur-xl flex items-center justify-between gap-5 shadow-[0_15px_35px_rgba(58,0,77,0.12)] w-full">
                        <button 
                            onClick={handlePrev} 
                            disabled={activeIndex === 0}
                            className="p-2 rounded-full bg-purple-100/80 border border-purple-200/80 text-[#3A004D] hover:bg-purple-200 transition-colors disabled:opacity-20 cursor-pointer"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <div className="flex-1 text-center truncate">
                            <span className="text-[#3A004D] text-xs font-extrabold tracking-wide truncate">{HIGHLIGHT_ITEMS[activeIndex].title}</span>
                        </div>
                        
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)} 
                            className={`px-4 py-2 rounded-full flex items-center gap-2 font-bold text-[10px] uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                isPlaying ? "bg-pink-500 shadow-md shadow-pink-500/30" : "bg-[#3A004D] shadow-md shadow-purple-900/20"
                            } text-white`}
                        >
                            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />} 
                            <span className="hidden sm:inline">{isPlaying ? "Pause" : "Auto"} Tour</span>
                        </button>
                        
                        <button 
                            onClick={handleNext} 
                            disabled={activeIndex === HIGHLIGHT_ITEMS.length - 1}
                            className="p-2 rounded-full bg-purple-100/80 border border-purple-200/80 text-[#3A004D] hover:bg-purple-200 transition-colors disabled:opacity-20 cursor-pointer"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* THREE.JS CANVAS */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                        <ambientLight intensity={1.5} />
                        <pointLight position={[0, 0, 5]} intensity={2.0} color="#a855f7" distance={25} />
                        <pointLight position={[5, 5, -10]} intensity={1.5} color="#ec4899" distance={30} />
                        <Suspense fallback={null}>
                            <TunnelScene ref={tunnelRef} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </section>
    );
}