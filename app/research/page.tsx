import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FlaskConical, ArrowRight, BookOpen, Users } from "lucide-react";
import { researchCentres } from "@/lib/data";

export const metadata = {
  title: "Research Centres & Pan-African Innovation | Zion University Kenya",
  description:
    "Explore Zion University's 6 leading research centres in AI, Epidemiology, Renewable Energy, Legal Studies, AgriTech, and Financial Inclusion.",
};

export default function ResearchIndexPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">Research & Innovation</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#162239] border border-white/10 p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl z-10 relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#f5a425]">
              Frontline African Scholarship
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4">
              Research & Innovation Centres
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Zion University's research ecosystem is dedicated to solving Africa's grand challenges in climate resilience, infectious disease surveillance, sovereign artificial intelligence, and inclusive continental commerce.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
            <FlaskConical className="w-96 h-96 text-white" />
          </div>
        </div>

        {/* Research Centres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchCentres.map((centre) => (
            <div
              key={centre.slug}
              className="bg-[#18233a] border border-white/10 hover:border-[#f5a425] flex flex-col justify-between overflow-hidden group shadow-xl transition-all"
            >
              <div>
                <div className="relative h-60 w-full bg-[#0c1228] overflow-hidden">
                  <Image
                    src={centre.photo}
                    alt={centre.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18233a] via-transparent to-black/30" />
                  <div className="absolute top-3 right-3 bg-[#f5a425] text-[#0c1228] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {centre.publicationsCount}+ Publications
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-white group-hover:text-[#f5a425] transition-colors mb-2">
                    {centre.name}
                  </h2>
                  <div className="text-xs text-[#f5a425] font-semibold mb-3">
                    Focus: {centre.focusArea}
                  </div>
                  <div className="text-xs text-white/70 mb-4 pb-3 border-b border-white/10">
                    <span className="font-semibold text-white">Lead Investigator:</span> {centre.leadResearcher}
                  </div>
                  <p className="text-xs text-white/80 line-clamp-3 leading-relaxed mb-4">
                    {centre.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/research/${centre.slug}`}
                  className="btn-zion w-full justify-between text-xs font-bold uppercase tracking-wider"
                >
                  <span>View Projects & Research Team</span>
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
