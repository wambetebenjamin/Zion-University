"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });

    // Limit DPR to 1.5 per specification
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Subtle floating particles - small circular dots drifting upward
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120; // x spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80; // y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40; // z spread
      speeds[i] = 0.04 + Math.random() * 0.06; // upward drift speed
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle material (subtle white circular dots at 0.2 opacity)
    // Create a circular canvas texture for soft round dots without harsh squares
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.4)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.8,
      map: texture,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Pause rendering when hero is out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Drift upward
        posArray[i * 3 + 1] += speeds[i];

        // Reset if drifted beyond top
        if (posArray[i * 3 + 1] > 40) {
          posArray[i * 3 + 1] = -40;
          posArray[i * 3] = (Math.random() - 0.5) * 120;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Slight gentle pan
      particles.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden md:block absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}
