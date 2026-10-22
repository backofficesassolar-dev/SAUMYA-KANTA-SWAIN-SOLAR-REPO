import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SolarParticleSphereProps {
  className?: string;
  irradianceLabel?: string;
}

export const SolarParticleSphere: React.FC<SolarParticleSphereProps> = ({
  className = 'w-full h-72 sm:h-80 mx-auto',
  irradianceLabel = 'Odisha Sun Irradiance: 5.4 kWh/m²/day',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Particle parameters
    const particleCount = 2800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const colorEmerald = new THREE.Color(0x10b981);
    const colorGold = new THREE.Color(0xf59e0b);
    const colorWhite = new THREE.Color(0xf8fafc);
    const colorTeal = new THREE.Color(0x34d399);

    const radius = 1.15;

    for (let i = 0; i < particleCount; i++) {
      // Golden ratio sphere distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Color mix: solar green, white and solar gold touches
      let c = colorWhite;
      const rand = Math.random();
      if (rand < 0.55) {
        c = colorEmerald;
      } else if (rand < 0.75) {
        c = colorTeal;
      } else if (rand < 0.88) {
        c = colorGold;
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture with radial glow
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(16,185,129,0.85)');
      grad.addColorStop(1, 'rgba(16,185,129,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSphere = new THREE.Points(geometry, material);
    scene.add(particleSphere);

    // Orbital Energy Ring 1 (Emerald)
    const ringGeo1 = new THREE.BufferGeometry();
    const ringPoints1: number[] = [];
    const ringSegments = 140;
    for (let i = 0; i <= ringSegments; i++) {
      const theta = (i / ringSegments) * Math.PI * 2;
      ringPoints1.push(Math.cos(theta) * 1.5, Math.sin(theta) * 1.5, 0);
    }
    ringGeo1.setAttribute('position', new THREE.Float32BufferAttribute(ringPoints1, 3));
    const ringMat1 = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.45 });
    const ring1 = new THREE.Line(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    scene.add(ring1);

    // Orbital Ring 2 (Golden Solar Angle)
    const ringGeo2 = new THREE.BufferGeometry();
    const ringPoints2: number[] = [];
    for (let i = 0; i <= ringSegments; i++) {
      const theta = (i / ringSegments) * Math.PI * 2;
      ringPoints2.push(Math.cos(theta) * 1.7, 0, Math.sin(theta) * 1.7);
    }
    ringGeo2.setAttribute('position', new THREE.Float32BufferAttribute(ringPoints2, 3));
    const ringMat2 = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Line(ringGeo2, ringMat2);
    ring2.rotation.z = Math.PI * 0.22;
    scene.add(ring2);

    // Mouse & Touch interactions
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isDispersed = false;

    function onPointerMove(e: MouseEvent | TouchEvent) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((clientY - rect.top) / rect.height) * 2 + 1;
      targetRotY = mouseX * 0.8;
      targetRotX = -mouseY * 0.6;
    }

    function onClick() {
      isDispersed = !isDispersed;
    }

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    container.addEventListener('click', onClick);

    function onResize() {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation
      particleSphere.rotation.y += 0.0035 + (targetRotY - particleSphere.rotation.y) * 0.04;
      particleSphere.rotation.x += (targetRotX - particleSphere.rotation.x) * 0.04;

      ring1.rotation.z += 0.005;
      ring2.rotation.y += 0.004;

      const posAttr = particleSphere.geometry.attributes.position;
      const posArray = posAttr.array as Float32Array;

      // Dispersion effect or wave undulation
      const factor = isDispersed ? 1.55 : 1.0;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        const oz = originalPositions[idx + 2];

        const wave = Math.sin(elapsedTime * 2.5 + ox * 4.0 + oy * 3.0) * 0.025;
        const targetScale = factor + wave;

        posArray[idx] += (ox * targetScale - posArray[idx]) * 0.08;
        posArray[idx + 1] += (oy * targetScale - posArray[idx + 1]) * 0.08;
        posArray[idx + 2] += (oz * targetScale - posArray[idx + 2]) * 0.08;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          cancelAnimationFrame(animationFrameId);
        } else {
          clock.start();
          animate();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('touchmove', onPointerMove);
      container.removeEventListener('click', onClick);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center my-2">
      <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />
      {/* Floating live telemetry chip */}
      <div className="absolute bottom-2 bg-[#262a2e]/90 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md flex items-center gap-2 border border-white/5 cursor-pointer select-none">
        <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
        <span className="font-label-sm text-[#4edea3] uppercase tracking-wider font-semibold">
          {irradianceLabel}
        </span>
      </div>
    </div>
  );
};
