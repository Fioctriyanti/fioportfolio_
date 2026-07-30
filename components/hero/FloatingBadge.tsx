/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

interface FloatingBadgeProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string;
  backImage?: string;
  imageFit?: 'contain' | 'cover';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

export default function FloatingBadge({
  position = [0, 0, 18],
  gravity = [0, -20, 0],
  fov = 22,
  transparent = true,
  frontImage = '/images/front-lanyard.png',
  backImage = '/images/back-lanyard.jpeg',
  imageFit = 'contain',
  lanyardImage = null,
  lanyardWidth = 1.3
}: FloatingBadgeProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      <Canvas
        className="pointer-events-auto w-full h-full"
        camera={{ position: [position[0], position[1], position[2]], fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={1.7} />

        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'contain' | 'cover';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

function Band({
  maxSpeed = 20,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'contain',
  lanyardImage = null,
  lanyardWidth = 1
}: BandProps) {
  const band = useRef<THREE.Mesh>(null),
    fixed = useRef<any>(null),
    j1 = useRef<any>(null),
    j2 = useRef<any>(null),
    j3 = useRef<any>(null),
    j4 = useRef<any>(null),
    card = useRef<any>(null);

  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();

  // Damping fisika lebih tinggi (4.0) agar gerakan tali tenang dan tidak bergejolak/melipat
  const segmentProps: any = { 
    type: 'dynamic', 
    canSleep: false, 
    colliders: false, 
    angularDamping: 4.0, 
    linearDamping: 4.0 
  };

  const gltf = useGLTF('/assets/card.glb') as any;
  const nodes = gltf.nodes as { [key: string]: THREE.Mesh };
  const materials = gltf.materials as { [key: string]: THREE.Material & { map?: THREE.Texture } };
  const texture = useTexture(lanyardImage || '/assets/lanyard.png');
  
  useEffect(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }, [texture]);

  const frontTex = useTexture(frontImage || '/images/front-lanyard.png');
  const backTex = useTexture(backImage || '/images/back-lanyard.jpeg');

  const cardMap = useMemo(() => {
    const baseMap = materials.base?.map as THREE.Texture;
    if (!frontImage && !backImage) return baseMap;
    if (!baseMap) return null;

    const baseImg = baseMap.image as HTMLImageElement;
    const W = baseImg?.width || 1024;
    const H = baseImg?.height || 1024;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img: any, rect: any) => {
      if (!img) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      ctx.clearRect(rx, ry, rw, rh);
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontTex.image) drawFitted(frontTex.image, { x: 0, y: 0, w: 0.5, h: 0.755 });
    if (backTex.image) drawFitted(backTex.image, { x: 0.5, y: 0, w: 0.5, h: 0.757 });

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base?.map]);

  // Curve dipersingkat menjadi 5 titik kontrol ( fixed + 4 segmen )
  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3(Array(5).fill(null).map(() => new THREE.Vector3()));
    c.curveType = 'chordal';
    return c;
  });
  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState(false);

  // Sambungan tali dibuat lebih tegang dengan panjang segmen 0.22 unit
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.22]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.22]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.22]);
  useRopeJoint(j3, j4, [[0, 0, 0], [0, 0, 0], 0.22]);
  
  useSphericalJoint(j4, card, [[0, 0, 0], [0, 1.43, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.033);
    const t = state.clock.getElapsedTime();

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, j4, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    } else if (card.current) {
      // Dorongan ayunan sepoi-sepoi halus agar mengayun alami tanpa merusak bentuk tali
      const windX = Math.sin(t * 1.5) * 0.0004;
      const windZ = Math.cos(t * 1.2) * 0.0003;
      card.current.applyImpulse({ x: windX, y: 0, z: windZ }, true);
    }

    if (fixed.current && card.current && j4.current) {
      [j1, j2, j3].forEach(ref => {
        if (!ref.current) return;
        
        const trans = ref.current.translation();
        if (!trans || isNaN(trans.x)) return;

        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(trans);
        }

        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(trans)));
        const lerpAlpha = Math.min(0.8, safeDelta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
        ref.current.lerped.lerp(trans, lerpAlpha);
      });

      if (j4.current && j3.current?.lerped && j2.current?.lerped && j1.current?.lerped && fixed.current) {
        curve.points[0].copy(j4.current.translation());
        curve.points[1].copy(j3.current.lerped);
        curve.points[2].copy(j2.current.lerped);
        curve.points[3].copy(j1.current.lerped);
        curve.points[4].copy(fixed.current.translation());
      }

      if (band.current) {
        (band.current.geometry as any).setPoints(curve.getPoints(isMobile ? 20 : 36));
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      {/* 
        POSISI RAPI DENGAN KALKULASI TEGANG PANJANG TALI:
        Anchor X = -3.8 (Samping kiri atas)
        Anchor Y = 3.6 (Ujung atas layar browser)
        Setiap segmen tali turun 0.22 unit:
        j1: -0.22
        j2: -0.44
        j3: -0.66
        j4: -0.88
        Card center: y = -0.88 - 1.43 = -2.31 (Tepat tegang 100% dari frame pertama)
      */}
      <group position={isMobile ? [-1.8, 3.2, 0] : [-3.8, 3.6, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, -0.22, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0, -0.44, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0, -0.66, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0, -0.88, 0]} ref={j4} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>

        <RigidBody position={[0, -2.31, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.15}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              if (e.target && typeof e.target.releasePointerCapture === 'function') {
                e.target.releasePointerCapture(e.pointerId);
              }
              drag(false);
            }}
            onPointerDown={(e: any) => {
              if (e.target && typeof e.target.setPointerCapture === 'function') {
                e.target.setPointerCapture(e.pointerId);
              }
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshStandardMaterial
                map={cardMap}
                map-anisotropy={16}
                roughness={1.0}
                metalness={0.0}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-10, 1]}
          lineWidth={0.3}
        />
      </mesh>
    </>
  );
}