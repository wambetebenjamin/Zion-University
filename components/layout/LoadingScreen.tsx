"use client";

import React, { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress up to 100% within 1.6 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 200);
          return 100;
        }
        return prev + 5;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-hidden={!loading}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0c1228] transition-all duration-500 ease-out ${
        loading ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      style={{
        visibility: loading ? "visible" : "hidden",
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Circular Ring around Crest */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-28 h-28 -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="rgba(250, 250, 250, 0.1)"
              strokeWidth="3"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#f5a425"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray="276"
              strokeDashoffset={276 - (276 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-100 ease-linear"
            />
          </svg>

          {/* University Crest Icon in Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#162239] border border-[#f5a425]/40 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-[#f5a425] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Brand Text */}
        <div className="mt-5 text-center">
          <h2 className="text-xl font-extrabold uppercase tracking-widest text-white">
            <span className="text-[#f5a425]">Zion</span> University
          </h2>
          <p className="text-[11px] uppercase tracking-wider text-white/60 mt-1 font-medium">
            Nairobi • Mombasa
          </p>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-[#f5a425] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
