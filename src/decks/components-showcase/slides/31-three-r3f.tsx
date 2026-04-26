// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

/**
 * Pure three.js fallback (we don't have @react-three/fiber installed).
 * Demonstrates the §6 / §17C 3D ecosystem entry point. For a production
 * slide you'd add @react-three/fiber + drei for declarative scenes.
 */
function ThreeScene() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const w = ref.current.clientWidth;
    const h = ref.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    ref.current.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const mat = new THREE.MeshStandardMaterial({ color: 0x74c7e1, wireframe: false, flatShading: true, metalness: 0.3, roughness: 0.6 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wireMat = new THREE.LineBasicMaterial({ color: 0xffcb47, transparent: true, opacity: 0.45 });
    const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), wireMat);
    mesh.add(wire);

    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(2, 3, 4); scene.add(dir);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    let raf: number;
    const tick = () => {
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.008;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      if (!ref.current) return;
      const w2 = ref.current.clientWidth, h2 = ref.current.clientHeight;
      camera.aspect = w2 / h2; camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      ref.current?.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={ref} style={{ width: '100%', height: '100%', minHeight: 240 }} />;
}

export default function ThreeR3FShowcase() {
  return (
    <LibraryShowcase
      category="§6 / §17C · 3D / WebGL"
      library="three (+ @react-three/fiber recommended)"
      npmInstall="npm install three @react-three/fiber @react-three/drei"
      url="threejs.org · r3f.docs.pmnd.rs"
      headline={<>One <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>3D moment</span> per case — molecule, brain, lung.</>}
      subhead="three.js is the engine; @react-three/fiber turns it into a React renderer, @react-three/drei adds helpers (OrbitControls, materials, environment maps)."
      tone="var(--cyan)"
      noteBelow="Below: pure three.js icosahedron with wireframe overlay · in production prefer r3f for declarative JSX scene graphs"
    >
      <Frame title="Variant A · Animated icosahedron (raw three.js)" tone="var(--cyan)">
        <ThreeScene />
      </Frame>
    </LibraryShowcase>
  );
}
