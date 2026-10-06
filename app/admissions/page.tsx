import React from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle,
  Clock,
  ArrowRight,
  Award,
  DollarSign,
  Download,
} from "lucide-react";
import AdmissionsSection from "@/components/home/AdmissionsSection";
import ScholarshipsSection from "@/components/home/ScholarshipsSection";

export const metadata = {
  title: "Admissions & Entry Requirements 2026/2027 | Zion University Kenya",
  description:
    "Join Zion University in Nairobi or Mombasa. Explore undergraduate and postgraduate admission requirements, fees in KES, scholarships, and our 5-step online application.",
};

export default function AdmissionsPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">Admissions</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#162239] border border-white/10 p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl z-10 relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#f5a425]">
              Intake 2026/2027 Open
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4">
              Your Journey Starts at Zion University
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              We welcome ambitious students from Kenya, East Africa, and across the globe. Explore our diverse entry pathways, transparent fee structures, and merit scholarships.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/apply" className="btn-zion shadow-gold text-xs uppercase font-bold py-3.5 px-6">
                <span>Start Application</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/254112272061?text=Hello!%20I%20would%20like%20to%20enquire%20about%20studying%20at%20Zion%20University."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-zion-outline text-xs uppercase font-bold py-3.5 px-6"
              >
                <span>Ask Admissions Advisor</span>
              </a>
            </div>
          </div>
        </div>

        {/* Step-by-Step & Requirements Table */}
        <AdmissionsSection />

        {/* Scholarships & Bursaries Strip */}
        <div className="mt-12">
          <ScholarshipsSection />
        </div>
      </div>
    </div>
  );
}
