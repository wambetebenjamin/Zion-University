"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Compass,
  Check,
  Play,
  HeartHandshake,
  Trophy,
  Home,
  ArrowRight,
} from "lucide-react";
import {
  studentClubs,
  accommodationOptions,
  sportsFacilities,
  studentServices,
} from "@/lib/data";

interface CampusLifeProps {
  onOpenVirtualTour: () => void;
}

export default function CampusLifeSection({ onOpenVirtualTour }: CampusLifeProps) {
  const [activeTab, setActiveTab] = useState<"clubs" | "hostels" | "sports" | "services">("clubs");

  return (
    <section id="campus-life" className="py-20 md:py-28 bg-[#0c1228] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Campus Life & Vibrant Student Culture</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 mt-4">
            A dynamic collegiate community fostering leadership, creative expression, athletic prowess,
            and lifelong African brotherhood across Nairobi and Mombasa.
          </p>
        </div>

        {/* Virtual Campus Tour Banner */}
        <div className="relative mb-14 bg-[#162239] border border-[#f5a425]/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-4 z-10">
            <div className="p-4 bg-[#f5a425] text-[#0c1228] shrink-0 shadow">
              <Compass className="w-8 h-8 animate-spin-slow" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#f5a425]">
                Interactive Experience
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                Virtual 360° Campus Tour
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                Explore our lecture theaters, moot courtroom, high-tech robotics studios, and oceanside student residences from any device.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenVirtualTour}
            className="btn-zion shadow-gold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 z-10 shrink-0 inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Virtual Tour</span>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab("clubs")}
            className={`px-5 py-3 text-xs uppercase font-bold tracking-wider transition-all min-h-[44px] ${
              activeTab === "clubs"
                ? "bg-[#f5a425] text-[#0c1228]"
                : "bg-[#18233a] text-white/80 hover:text-white border border-white/10"
            }`}
          >
            Clubs & Societies
          </button>
          <button
            onClick={() => setActiveTab("hostels")}
            className={`px-5 py-3 text-xs uppercase font-bold tracking-wider transition-all min-h-[44px] ${
              activeTab === "hostels"
                ? "bg-[#f5a425] text-[#0c1228]"
                : "bg-[#18233a] text-white/80 hover:text-white border border-white/10"
            }`}
          >
            Accommodation & Hostels
          </button>
          <button
            onClick={() => setActiveTab("sports")}
            className={`px-5 py-3 text-xs uppercase font-bold tracking-wider transition-all min-h-[44px] ${
              activeTab === "sports"
                ? "bg-[#f5a425] text-[#0c1228]"
                : "bg-[#18233a] text-white/80 hover:text-white border border-white/10"
            }`}
          >
            Sports & Athletics
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-5 py-3 text-xs uppercase font-bold tracking-wider transition-all min-h-[44px] ${
              activeTab === "services"
                ? "bg-[#f5a425] text-[#0c1228]"
                : "bg-[#18233a] text-white/80 hover:text-white border border-white/10"
            }`}
          >
            Student Wellness & Support
          </button>
        </div>

        {/* Tab 1: Clubs & Societies */}
        {activeTab === "clubs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {studentClubs.map((club, idx) => (
              <div
                key={idx}
                className="bg-[#18233a] border border-white/10 p-6 flex flex-col justify-between hover:border-[#f5a425] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a425] bg-white/5 px-2 py-0.5 border border-white/10">
                      {club.category}
                    </span>
                    <span className="text-xs text-white/60 font-semibold">{club.members}+ Members</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#f5a425] transition-colors mb-2">
                    {club.name}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">{club.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#f5a425] font-bold">
                  <span>Student Guild Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Accommodation */}
        {activeTab === "hostels" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
            {accommodationOptions.map((opt, idx) => (
              <div
                key={idx}
                className="bg-[#18233a] border border-white/10 overflow-hidden flex flex-col justify-between group shadow-xl"
              >
                <div className="relative h-64 w-full bg-[#0c1228]">
                  <Image
                    src={opt.image}
                    alt={opt.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18233a] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3 bg-[#0c1228]/90 text-[#f5a425] border border-[#f5a425]/50 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {opt.campus} Campus
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#f5a425] text-[#0c1228] px-3 py-1 text-xs font-black uppercase">
                    {opt.feePerSemester}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{opt.name}</h3>
                  <div className="text-xs text-white/70 mb-4">
                    <span className="font-semibold text-white">Room Configurations:</span> {opt.roomTypes}
                  </div>

                  <div className="space-y-1.5 mb-6">
                    {opt.amenities.map((am, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                        <Check className="w-3.5 h-3.5 text-[#f5a425]" />
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/apply"
                    className="btn-zion w-full justify-center text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Reserve Hostel Room</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Sports & Recreation */}
        {activeTab === "sports" && (
          <div className="bg-[#18233a] border border-white/10 p-6 md:p-10 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 text-[#f5a425] mb-2 font-bold text-xs uppercase tracking-wider">
                  <Trophy className="w-4 h-4" />
                  <span>Championship Athletic Traditions</span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-4">
                  Home of Collegiate Champions
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                  Zion University athletes compete at the highest national and East African university games. We provide professional coaching, Olympic-standard facilities, and dedicated sports performance physiotherapists.
                </p>

                <div className="space-y-3">
                  {sportsFacilities.map((fac, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-[#f5a425]/20 text-[#f5a425] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-white/90">{fac}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-80 w-full bg-[#0c1228] border border-white/10 overflow-hidden shadow-2xl">
                <Image
                  src="/images/campus/sports.jpg"
                  alt="Zion University Athletics Facilities"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Student Services */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
            {studentServices.map((srv, idx) => (
              <div
                key={idx}
                className="bg-[#18233a] border border-white/10 p-6 sm:p-7 flex items-start gap-4 hover:border-[#f5a425] transition-all"
              >
                <div className="p-3 bg-white/5 border border-white/10 text-[#f5a425] shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed">{srv.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
