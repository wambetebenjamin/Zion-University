"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FlaskConical, ArrowRight, BookOpen, Users, CheckCircle } from "lucide-react";
import { researchCentres } from "@/lib/data";

export default function ResearchSection() {
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
      id="research"
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#162239] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Pan-African Research Centres</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 mt-4">
            Transforming African economies through cutting-edge laboratories, AI development,
            epidemiological breakthroughs, and sustainable geothermal technologies.
          </p>
        </div>

        {/* 6 Research Centre Cards with Alternating Left/Right Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchCentres.map((centre, idx) => {
            const isEven = idx % 2 === 0;
            const animClass = inView
              ? "opacity-100 translate-x-0"
              : isEven
              ? "opacity-0 -translate-x-12"
              : "opacity-0 translate-x-12";

            return (
              <div
                key={centre.slug}
                className={`bg-[#18233a] border border-white/10 hover:border-[#f5a425] transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden group shadow-xl ${animClass}`}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                {/* Photo & Publications Badge */}
                <div className="relative h-60 w-full overflow-hidden bg-[#0c1228]">
                  <Image
                    src={centre.photo}
                    alt={centre.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18233a] via-[#18233a]/40 to-transparent" />

                  <div className="absolute top-3 left-3 bg-[#0c1228]/90 border border-[#f5a425]/50 px-3 py-1 flex items-center gap-1.5 text-[#f5a425] text-xs font-bold uppercase tracking-wider">
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>{centre.shortName}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-[#f5a425] text-[#0c1228] px-3 py-1 text-xs font-black uppercase tracking-wider shadow">
                    {centre.publicationsCount}+ Publications
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#f5a425] transition-colors mb-3">
                      {centre.name}
                    </h3>

                    <div className="text-xs text-[#f5a425] font-semibold mb-3 flex items-center gap-1.5">
                      <span className="text-white/60">Focus:</span> {centre.focusArea}
                    </div>

                    <div className="text-xs text-white/70 mb-4 pb-4 border-b border-white/10 flex items-start gap-2">
                      <Users className="w-4 h-4 text-[#f5a425] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">Lead Investigator:</span> {centre.leadResearcher}
                      </div>
                    </div>

                    <p className="text-xs text-white/80 line-clamp-3 leading-relaxed mb-6">
                      {centre.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={`/research/${centre.slug}`}
                    className="btn-zion-outline group-hover:bg-[#f5a425] group-hover:text-[#0c1228] w-full text-xs font-bold uppercase tracking-wider py-3 flex items-center justify-between"
                  >
                    <span>View Research Projects & Publications</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Research Partners Bar */}
        <div className="mt-16 bg-[#18233a]/80 border border-white/10 p-6 md:p-8 text-center">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">
            Institutional Research & Grant Partners
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-bold text-white/80">
            <span className="hover:text-[#f5a425] transition-colors">World Health Organization (WHO)</span>
            <span className="text-[#f5a425]">•</span>
            <span className="hover:text-[#f5a425] transition-colors">African Development Bank (AfDB)</span>
            <span className="text-[#f5a425]">•</span>
            <span className="hover:text-[#f5a425] transition-colors">Google Research Africa</span>
            <span className="text-[#f5a425]">•</span>
            <span className="hover:text-[#f5a425] transition-colors">Wellcome Trust</span>
            <span className="text-[#f5a425]">•</span>
            <span className="hover:text-[#f5a425] transition-colors">KenGen Kenya</span>
            <span className="text-[#f5a425]">•</span>
            <span className="hover:text-[#f5a425] transition-colors">KEMRI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
