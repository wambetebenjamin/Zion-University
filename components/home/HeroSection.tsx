"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Users, BookOpen, Award, GraduationCap } from "lucide-react";
import HeroCanvas from "./HeroCanvas";

interface HeroProps {
  onOpenProspectus: () => void;
}

export default function HeroSection({ onOpenProspectus }: HeroProps) {
  const headlineWords = ["Shape", "the", "Future.", "Study", "at", "Zion", "University."];
  const [subtextVisible, setSubtextVisible] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Stats count-up values
  const [studentsCount, setStudentsCount] = useState(0);
  const [programmesCount, setProgrammesCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);

  useEffect(() => {
    // Show subtext after headline finishes entering (~700ms)
    const timer = setTimeout(() => {
      setSubtextVisible(true);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsInView) return;

    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setStudentsCount(12000);
      setProgrammesCount(80);
      setStaffCount(500);
      setYearsCount(30);
      return;
    }

    // Animate count-up
    const duration = 1800; // 1.8 seconds
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease-out quad
      const factor = 1 - (1 - progress) * (1 - progress);

      setStudentsCount(Math.floor(factor * 12000));
      setProgrammesCount(Math.floor(factor * 80));
      setStaffCount(Math.floor(factor * 500));
      setYearsCount(Math.floor(factor * 30));

      if (step >= steps) {
        clearInterval(interval);
        setStudentsCount(12000);
        setProgrammesCount(80);
        setStaffCount(500);
        setYearsCount(30);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [statsInView]);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 md:pt-32 pb-12 overflow-hidden bg-[#0c1228]">
      {/* Background Campus Photo with Clean East African Lighting */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-campus.jpg"
          alt="East African University students studying together on Zion University campus grounds in Kenya"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
          sizes="100vw"
        />
        {/* Subtle cinematic overlay - photo remains crisp and clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1228] via-[#162239]/70 to-[#162239]/80" />
      </div>

      {/* Three.js Floating Particle System */}
      <HeroCanvas />

      {/* Main Hero Caption */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
        {/* Sub-heading / Pre-title */}
        <div className="inline-block mb-3 px-3.5 py-1 bg-[#18233a]/80 border border-[#f5a425]/40 rounded-none shadow">
          <span className="text-xs uppercase tracking-widest text-[#f5a425] font-extrabold">
            Admissions Open for 2026/2027 Academic Year
          </span>
        </div>

        {/* Word-by-Word Smooth Animated Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-tight md:leading-none my-4">
          {headlineWords.map((word, idx) => {
            const isZion = word === "Zion";
            return (
              <span
                key={idx}
                className={`inline-block mr-2.5 sm:mr-3.5 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isZion ? "text-[#f5a425] italic font-black" : ""
                }`}
                style={{
                  animation: `wordEntrance 0.7s cubic-bezier(0.25, 1, 0.5, 1) ${
                    idx * 0.1
                  }s both`,
                }}
              >
                {word}
              </span>
            );
          })}
        </h1>

        {/* Subtext Fading in After Headline Completes */}
        <p
          className={`text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-normal leading-relaxed mt-4 transition-all duration-700 ease-out ${
            subtextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          Nairobi and Mombasa. Accredited programmes. World-class research. Scholarships available.
        </p>

        {/* Hero CTAs: Apply Now & Download Prospectus */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 mt-8 transition-all duration-700 delay-300 ${
            subtextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/apply"
            className="btn-zion shadow-gold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={onOpenProspectus}
            className="btn-zion-outline text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 bg-[#162239]/60 backdrop-blur-sm"
          >
            <Download className="w-4 h-4 text-[#f5a425]" />
            <span>Download Prospectus</span>
          </button>
        </div>
      </div>

      {/* Animated Stats Strip */}
      <div
        ref={statsRef}
        className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 md:p-6 bg-[#162239]/90 backdrop-blur-md border border-white/10 shadow-2xl">
          {/* Stat 1: Students */}
          <div className="flex items-center gap-3.5 p-2 border-r-0 md:border-r border-white/10 last:border-none">
            <div className="p-3 bg-white/5 border border-[#f5a425]/30 shrink-0">
              <Users className="w-6 h-6 text-[#f5a425]" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {studentsCount.toLocaleString()}+
              </div>
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                Enrolled Students
              </div>
            </div>
          </div>

          {/* Stat 2: Programmes */}
          <div className="flex items-center gap-3.5 p-2 border-r-0 md:border-r border-white/10 last:border-none">
            <div className="p-3 bg-white/5 border border-[#f5a425]/30 shrink-0">
              <BookOpen className="w-6 h-6 text-[#f5a425]" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {programmesCount}+
              </div>
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                Accredited Programmes
              </div>
            </div>
          </div>

          {/* Stat 3: Faculty */}
          <div className="flex items-center gap-3.5 p-2 border-r-0 md:border-r border-white/10 last:border-none">
            <div className="p-3 bg-white/5 border border-[#f5a425]/30 shrink-0">
              <GraduationCap className="w-6 h-6 text-[#f5a425]" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {staffCount}+
              </div>
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                Academic Staff & Deans
              </div>
            </div>
          </div>

          {/* Stat 4: Years of Excellence */}
          <div className="flex items-center gap-3.5 p-2">
            <div className="p-3 bg-white/5 border border-[#f5a425]/30 shrink-0">
              <Award className="w-6 h-6 text-[#f5a425]" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">
                {yearsCount} Years
              </div>
              <div className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                Academic Excellence
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wordEntrance {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
