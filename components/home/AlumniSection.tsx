"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, Award, ArrowRight, Quote } from "lucide-react";
import { alumniProfiles } from "@/lib/data";

interface AlumniProps {
  onOpenAlumniModal: () => void;
}

export default function AlumniSection({ onOpenAlumniModal }: AlumniProps) {
  return (
    <section id="alumni" className="py-20 md:py-28 bg-[#0c1228] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Join 50,000 Zion University Alumni Worldwide</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 mt-4">
            From cabinet secretaries and chief justices to tech founders and global health leaders,
            our alumni network spans 45 countries driving sustainable African progress.
          </p>
        </div>

        {/* Notable Alumni Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {alumniProfiles.map((alumnus) => (
            <div
              key={alumnus.id}
              className="bg-[#18233a] border border-white/10 hover:border-[#f5a425] p-6 flex flex-col justify-between group shadow-xl transition-all"
            >
              <div>
                {/* Photo & Graduation Badge */}
                <div className="relative h-48 w-full mb-4 bg-[#0c1228] overflow-hidden">
                  <Image
                    src={alumnus.image}
                    alt={alumnus.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-2 right-2 bg-[#0c1228]/90 text-[#f5a425] border border-[#f5a425]/50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                    Class of {alumnus.gradYear}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#f5a425] transition-colors">
                  {alumnus.name}
                </h3>
                <div className="text-xs font-semibold text-[#f5a425] mb-1">
                  {alumnus.currentRole}
                </div>
                <div className="text-[11px] text-white/60 mb-3 pb-3 border-b border-white/10">
                  {alumnus.organization}
                </div>

                <p className="text-xs text-white/80 italic leading-relaxed relative pl-4">
                  <Quote className="w-3 h-3 text-[#f5a425] absolute left-0 top-0 opacity-70" />
                  "{alumnus.quote}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-white/50">
                <span className="font-semibold text-white/70">Degree:</span> {alumnus.degree}
              </div>
            </div>
          ))}
        </div>

        {/* Alumni Registration CTA Banner */}
        <div className="bg-[#162239] border border-[#f5a425]/40 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 border border-white/10 text-[#f5a425] shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase text-white">
                Are you a Zion University Alumnus?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                Update your professional contacts, access exclusive alumni mentorship perks, and join our Nairobi and Diaspora chapters.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAlumniModal}
            className="btn-zion shadow-gold text-xs uppercase tracking-wider px-7 py-3.5 shrink-0 inline-flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Join Alumni Directory</span>
          </button>
        </div>
      </div>
    </section>
  );
}
