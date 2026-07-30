// src/components.d.ts
import { Object3DNode, MaterialNode } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}

declare module "./FloatingLines" {
  const FloatingLines: React.ComponentType<any>;
  export default FloatingLines;
}

declare module "./FloatingBadge" {
  const FloatingBadge: React.ComponentType<any>;
  export default FloatingBadge;
}