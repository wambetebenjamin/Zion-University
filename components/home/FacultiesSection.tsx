"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, GraduationCap, Award } from "lucide-react";
import { faculties } from "@/lib/data";

export default function FacultiesSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="faculties"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#172238] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading matching template */}
        <div className="section-heading">
          <h2>Academic Faculties & Schools</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 mt-4">
            Discover our six specialized schools offering globally competitive undergraduate,
            master's, doctorate, and diploma curricula rooted in African innovation.
          </p>
        </div>

        {/* 6 Faculty Cards in 3-col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculties.map((faculty, idx) => {
            return (
              <div
                key={faculty.slug}
                className={`group relative bg-[#18233a] border border-white/10 transition-all duration-250 ease-out hover:border-[#f5a425] hover:shadow-glow flex flex-col justify-between overflow-hidden ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${idx * 80}ms`,
                  transitionDuration: "250ms",
                }}
              >
                {/* Faculty Photo */}
                <div className="relative h-56 w-full overflow-hidden bg-[#0c1228]">
                  <Image
                    src={faculty.photo}
                    alt={faculty.name}
                    fill
                    className="object-cover transition-transform duration-250 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18233a] via-transparent to-black/30" />

                  {/* Programme Count Badge */}
                  <div className="absolute top-3 right-3 bg-[#0c1228]/90 border border-[#f5a425]/60 text-[#f5a425] text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow">
                    {faculty.programmeCount} Programmes
                  </div>
                </div>

                {/* Faculty Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#f5a425] transition-colors leading-snug mb-2">
                      {faculty.name}
                    </h3>

                    {/* Dean info */}
                    <div className="flex items-start gap-2 text-xs text-white/70 mb-4 pb-4 border-b border-white/10">
                      <GraduationCap className="w-4 h-4 text-[#f5a425] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white/90">Dean:</span> {faculty.deanName}
                      </div>
                    </div>

                    <p className="text-xs text-white/70 line-clamp-3 leading-relaxed mb-6">
                      {faculty.mission}
                    </p>
                  </div>

                  {/* View Programmes Link */}
                  <Link
                    href={`/faculties/${faculty.slug}`}
                    className="w-full btn-zion-outline group-hover:bg-[#f5a425] group-hover:text-[#0c1228] text-xs font-bold tracking-wider py-3 flex items-center justify-between"
                  >
                    <span>View Programmes</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-14 text-center">
          <Link
            href="/admissions"
            className="btn-zion shadow-gold text-xs uppercase tracking-wider px-8 py-4 inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore All 80+ Degrees & Requirements</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
