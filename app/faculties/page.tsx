import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, ArrowRight, BookOpen } from "lucide-react";
import { faculties } from "@/lib/data";

export const metadata = {
  title: "Schools & Faculties | Zion University Kenya",
  description:
    "Explore Zion University's 6 academic schools offering 80+ accredited undergraduate, postgraduate, diploma, and certificate programmes.",
};

export default function FacultiesIndexPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">Schools & Faculties</span>
        </div>

        {/* Header Banner */}
        <div className="bg-[#162239] border border-white/10 p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl z-10 relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#f5a425]">
              Academic Disciplines
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4">
              Schools & Academic Faculties
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Zion University offers over 80 degree and diploma programmes across six renowned schools. Each faculty combines world-class pedagogy with deep African market relevance, state-of-the-art laboratory infrastructure, and CUE accreditation.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
            <GraduationCap className="w-96 h-96 text-white" />
          </div>
        </div>

        {/* Faculties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculties.map((faculty) => (
            <div
              key={faculty.slug}
              className="bg-[#18233a] border border-white/10 hover:border-[#f5a425] flex flex-col justify-between overflow-hidden group shadow-xl transition-all"
            >
              <div>
                <div className="relative h-60 w-full bg-[#0c1228] overflow-hidden">
                  <Image
                    src={faculty.photo}
                    alt={faculty.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18233a] via-transparent to-black/30" />
                  <div className="absolute top-3 right-3 bg-[#0c1228]/90 text-[#f5a425] border border-[#f5a425]/50 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {faculty.programmeCount} Programmes
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-white group-hover:text-[#f5a425] transition-colors mb-2">
                    {faculty.name}
                  </h2>
                  <div className="text-xs text-white/70 mb-3 pb-3 border-b border-white/10">
                    <span className="font-semibold text-white">Dean:</span> {faculty.deanName}
                  </div>
                  <p className="text-xs text-white/80 line-clamp-3 leading-relaxed mb-4">
                    {faculty.overview}
                  </p>

                  <div className="space-y-1 mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                      Departments:
                    </div>
                    {faculty.departments.slice(0, 3).map((dept, i) => (
                      <div key={i} className="text-xs text-white/70">
                        • {dept}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/faculties/${faculty.slug}`}
                  className="btn-zion w-full justify-between text-xs font-bold uppercase tracking-wider"
                >
                  <span>Explore School & Programmes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
