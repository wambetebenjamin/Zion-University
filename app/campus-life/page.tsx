"use client";

import React, { useState } from "react";
import Link from "next/link";
import CampusLifeSection from "@/components/home/CampusLifeSection";
import VirtualTourModal from "@/components/modals/VirtualTourModal";

export default function CampusLifePage() {
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);

  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">Campus Life & Culture</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#162239] border border-white/10 p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl z-10 relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#f5a425]">
              Nairobi & Mombasa Campuses
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4">
              Vibrant Campus Life & Community
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              At Zion University, learning extends far beyond lecture theaters. Our dynamic student body engages in championship athletics, hackathons, moot court battles, arts festivals, and community volunteerism.
            </p>
          </div>
        </div>

        <CampusLifeSection onOpenVirtualTour={() => setVirtualTourOpen(true)} />

        <VirtualTourModal
          isOpen={virtualTourOpen}
          onClose={() => setVirtualTourOpen(false)}
        />
      </div>
    </div>
  );
}
