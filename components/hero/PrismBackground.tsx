"use client";
/* eslint-disable react/no-unknown-property */
// @ts-nocheck
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PrismBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. SETUP SCENE & CAMERA 3D AKTIF
    const scene = new THREE.Scene();
    
    // Menggunakan PerspectiveCamera agar efek kedalaman 3D terasa nyata saat bergerak
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. MEMBUAT PARTIKEL GEOMETRI GELOMBANG 3D
    const count = 60; // Jumlah baris partikel
    const sep = 1.5;   // Jarak antar partikel
    const amountX = count;
    const amountY = count;

    const numParticles = amountX * amountY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0, j = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        positions[i] = ix * sep - (amountX * sep) / 2; // Posisi X
        positions[i + 1] = 0;                          // Posisi Y (Nanti dianimasikan menjadi ombak)
        positions[i + 2] = iy * sep - (amountY * sep) / 2; // Posisi Z (Kedalaman)

        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // 3. MATERIAL SHADER (Warna Ungu & Cyan sesuai Palet Fio)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color("#9E4ABB") }, // Ungu murni dari Gambar 3
        color2: { value: new THREE.Color("#00ffff") }, // Aksentuasi Cyan
        iTime: { value: 0 },
        iMouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        attribute float scale;
        uniform float iTime;
        uniform vec2 iMouse;
        varying vec3 vPosition;
        varying float vDist;
        
        void main() {
          vec3 p = position;
          
          // Membuat efek ombak 3D bergelombang seiring waktu
          p.y += sin((p.x * 0.1) + iTime) * 2.5;
          p.y += cos((p.z * 0.1) + iTime) * 2.5;
          
          // Efek interaktivitas interaksi kursor mouse terhadap partikel terdekat
          vec2 mousePlane = iMouse * 40.0;
          float dist = distance(p.xz, mousePlane);
          if (dist < 15.0) {
            float push = (15.0 - dist) * 0.4;
            p.y += push; // Partikel terangkat naik/terdorong saat dilewati kursor
          }
          
          vPosition = p;
          vDist = dist;
          
          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Ukuran partikel mengecil sesuai jarak kamera (Perspektif)
          gl_PointSize = scale * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vPosition;
        varying float vDist;
        
        void main() {
          // Membuat partikel berbentuk bulat mulus sempurna (anti kotak)
          if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
          
          // Gradasi warna dinamis berdasarkan tinggi ombak partikel
          float mixStrength = clamp((vPosition.y + 2.5) / 5.0, 0.0, 1.0);
          vec3 finalColor = mix(color1, color2, mixStrength);
          
          // Memberikan kilau ekstra jika partikel dekat dengan kursor
          if (vDist < 12.0) {
            finalColor += vec3(0.3, 0.1, 0.4) * (1.0 - (vDist / 12.0));
          }
          
          gl_FragColor = vec4(finalColor, 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Sedikit rotasi miring kamera agar grid 3D tampak dramatis dari sudut atas
    particles.rotation.x = 0.6; 

    // 4. MOUSE EVENT HANDLERS
    const targetMouse = new THREE.Vector2(0, 0);
    const currentMouse = new THREE.Vector2(0, 0);

    const onMouseMove = (event: MouseEvent) => {
      // Normalisasi posisi kursor dari rentang -1 hingga 1
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 5. ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      material.uniforms.iTime.value = elapsed;

      // Lerp interpolasi gerakan agar pergeseran respons kursor terasa smooth/lembut (bouncy)
      currentMouse.lerp(targetMouse, 0.05);
      material.uniforms.iMouse.value.copy(currentMouse);

      // Rotasi background berputar perlahan secara otomatis
      particles.rotation.z = elapsed * 0.02;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // CLEANUP RESOURSES
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-screen opacity-70" />;
}