"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { GraduationCap, RotateCcw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error securely server-side without exposing to user
    console.error("Zion University Client Runtime Error:", error);
  }, [error]);

  return (
    <div className="pt-32 pb-24 bg-[#0c1228] min-h-[85vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-[#18233a] border border-white/10 p-8 sm:p-12 text-center shadow-2xl relative">
        <div className="w-16 h-16 rounded-full bg-[#162239] border border-[#f5a425] flex items-center justify-center text-[#f5a425] mx-auto mb-4 shadow">
          <GraduationCap className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#f5a425]">
          System Notice
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-white mt-2 mb-3">
          Something went wrong on our end.
        </h1>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-8 max-w-sm mx-auto">
          Please try again shortly. Our systems engineering team has been notified.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-zion shadow-gold text-xs font-bold uppercase tracking-wider px-6 py-3 inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="btn-zion-outline text-xs font-bold uppercase tracking-wider px-6 py-3 inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
