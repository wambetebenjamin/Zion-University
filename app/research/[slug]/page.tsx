import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FlaskConical,
  Users,
  CheckCircle,
  FileText,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { researchCentres } from "@/lib/data";

export const revalidate = 600;

export function generateStaticParams() {
  return researchCentres.map((centre) => ({
    slug: centre.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const centre = researchCentres.find((c) => c.slug === params.slug);
  if (!centre) return { title: "Research Centre Not Found | Zion University" };

  return {
    title: `${centre.name} | Zion University Kenya`,
    description: centre.description,
    openGraph: {
      title: `${centre.name} | Zion University`,
      description: centre.description,
      images: [{ url: centre.photo }],
    },
  };
}

export default function ResearchDetailPage({ params }: { params: { slug: string } }) {
  const centre = researchCentres.find((c) => c.slug === params.slug);
  if (!centre) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <Link href="/research" className="hover:text-[#f5a425]">
            Research
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">{centre.shortName}</span>
        </div>

        {/* Hero Banner */}
        <div className="relative bg-[#162239] border border-white/10 overflow-hidden shadow-2xl mb-12">
          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src={centre.photo}
              alt={centre.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#162239] via-[#162239]/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[#f5a425] text-[#0c1228]">
                {centre.publicationsCount}+ Peer-Reviewed Publications
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white mt-3">
                {centre.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview & Strategic Mandate */}
            <div className="bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-xl">
              <h2 className="text-xl font-bold uppercase text-white mb-4">
                Centre Overview & Mandate
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                {centre.description}
              </p>

              <h3 className="text-xs font-bold uppercase tracking-wider text-[#f5a425] mb-3">
                Key Strategic Priorities:
              </h3>
              <div className="space-y-2.5">
                {centre.strategicGoals.map((goal, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/90">
                    <CheckCircle className="w-4 h-4 text-[#f5a425] shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Active Grant Projects */}
            <div className="bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-xl">
              <h2 className="text-xl font-bold uppercase text-white mb-6">
                Active Research Grants & Field Projects
              </h2>
              <div className="space-y-4">
                {centre.currentProjects.map((proj, i) => (
                  <div
                    key={i}
                    className="p-5 bg-[#162239] border border-white/10 hover:border-[#f5a425] transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-[#f5a425]/20 text-[#f5a425]">
                        {proj.grantValue}
                      </span>
                      <span className="text-xs text-white/60">{proj.lead}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{proj.title}</h3>
                    <div className="text-xs text-white/70">
                      <span className="text-white/50">Institutional Partner:</span> {proj.partner}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Publications */}
            <div className="bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-xl">
              <h2 className="text-xl font-bold uppercase text-white mb-6">
                Recent Peer-Reviewed Publications
              </h2>
              <div className="space-y-4">
                {centre.recentPublications.map((pub, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#162239] border border-white/10 flex items-start gap-3"
                  >
                    <FileText className="w-5 h-5 text-[#f5a425] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{pub.title}</h4>
                      <div className="text-xs text-[#f5a425] font-semibold">
                        {pub.journal} ({pub.year})
                      </div>
                      <div className="text-[11px] text-white/60 mt-1">
                        Authors: {pub.authors} • DOI: {pub.doi}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Leadership */}
            <div className="bg-[#18233a] border border-white/10 p-6 shadow-xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#f5a425]">
                Principal Investigator
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-3">
                Research Leadership
              </h3>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#162239] border border-[#f5a425] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#f5a425]" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{centre.leadResearcher}</div>
                  <div className="text-[11px] text-[#f5a425]">{centre.leadTitle}</div>
                </div>
              </div>
            </div>

            {/* Partner Organizations */}
            <div className="bg-[#18233a] border border-white/10 p-6 shadow-xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#f5a425]">
                Collaborating Partners
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-4">
                Strategic Grant Alliances
              </h3>
              <div className="space-y-2">
                {centre.partners.map((partner, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80 p-2 bg-white/5 border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#f5a425]" />
                    <span>{partner}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Join Research Group CTA */}
            <div className="bg-[#162239] border border-[#f5a425]/40 p-6 shadow-xl">
              <h3 className="text-base font-bold uppercase text-white mb-2">
                Postgraduate Research Fellowships
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Fully funded master's and PhD research studentships available for qualifying STEM and policy applicants.
              </p>
              <Link
                href="/apply?type=postgraduate_research"
                className="btn-zion w-full justify-center text-xs uppercase font-bold py-3"
              >
                <span>Apply for Research Fellowship</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
