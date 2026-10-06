import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Award,
  Clock,
  MapPin,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  User,
  ShieldCheck,
} from "lucide-react";
import { faculties, Faculty } from "@/lib/data";

export const revalidate = 600; // ISR 10 minutes

export function generateStaticParams() {
  return faculties.map((faculty) => ({
    slug: faculty.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const faculty = faculties.find((f) => f.slug === params.slug);
  if (!faculty) return { title: "Faculty Not Found | Zion University" };

  return {
    title: `${faculty.name} | Zion University Kenya`,
    description: faculty.overview,
    openGraph: {
      title: `${faculty.name} | Zion University`,
      description: faculty.mission,
      images: [{ url: faculty.photo }],
    },
  };
}

export default function FacultyDetailPage({ params }: { params: { slug: string } }) {
  const faculty = faculties.find((f) => f.slug === params.slug);
  if (!faculty) {
    notFound();
  }

  // Course JSON-LD Schema for SEO
  const courseSchemas = faculty.programmes.map((prog) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": prog.name,
    "description": prog.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Zion University",
      "sameAs": "https://zion.ac.ke"
    },
    "educationalCredentialAwarded": prog.level,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": prog.studyMode,
      "location": prog.campus === "Both Campuses" ? "Nairobi & Mombasa" : prog.campus
    }
  }));

  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      {/* Course JSON-LD Schemas */}
      {courseSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <Link href="/faculties" className="hover:text-[#f5a425]">
            Schools & Faculties
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">{faculty.shortName}</span>
        </div>

        {/* Header Hero Banner */}
        <div className="relative bg-[#162239] border border-white/10 overflow-hidden shadow-2xl mb-12">
          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src={faculty.photo}
              alt={faculty.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#162239] via-[#162239]/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[#f5a425] text-[#0c1228]">
                {faculty.programmeCount} Accredited Programmes
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white mt-3">
                {faculty.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Column: Mission, Departments & Accordion Programmes */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview & Mission */}
            <div className="bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-xl">
              <h2 className="text-xl font-bold uppercase text-white mb-4">
                Faculty Mission & Overview
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                {faculty.overview}
              </p>

              <div className="p-4 bg-[#0c1228] border-l-4 border-[#f5a425] text-xs sm:text-sm text-white/90 italic">
                "{faculty.mission}"
              </div>

              {/* Departments */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#f5a425] mb-3">
                  Academic Departments:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {faculty.departments.map((dept, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#f5a425]" />
                      <span>{dept}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Programmes List */}
            <div className="bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#f5a425]">
                    Curriculum & Tracks
                  </span>
                  <h2 className="text-2xl font-black uppercase text-white">
                    Programmes Offered
                  </h2>
                </div>
                <Link
                  href={`/apply?faculty=${faculty.slug}`}
                  className="btn-zion text-xs font-bold uppercase px-4 py-2"
                >
                  Apply Online
                </Link>
              </div>

              <div className="space-y-6">
                {faculty.programmes.map((prog) => (
                  <div
                    key={prog.id}
                    className="bg-[#162239] border border-white/10 hover:border-[#f5a425] p-6 shadow-md transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 bg-[#f5a425]/20 text-[#f5a425] border border-[#f5a425]/40">
                        {prog.level}
                      </span>
                      <div className="flex items-center gap-4 text-xs text-white/70">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#f5a425]" />
                          {prog.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#f5a425]" />
                          {prog.campus}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {prog.name}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed mb-4">
                      {prog.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/10">
                      {/* Entry Requirements */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5a425] mb-2">
                          Entry Requirements:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-white/70">
                          {prog.entryRequirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#f5a425] shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Career Outcomes */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5a425] mb-2">
                          Career Outcomes:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-white/70">
                          {prog.careerOutcomes.map((co, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Award className="w-3.5 h-3.5 text-[#f5a425] shrink-0 mt-0.5" />
                              <span>{co}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tuition & Apply Action */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 bg-[#0c1228] p-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-white/60">
                          Tuition per Semester:
                        </div>
                        <div className="text-base font-extrabold text-[#f5a425]">
                          KES {prog.tuitionKES.toLocaleString()}
                        </div>
                      </div>

                      <Link
                        href={`/apply?faculty=${faculty.slug}&programme=${prog.id}`}
                        className="btn-zion text-xs font-bold uppercase tracking-wider px-6 py-2.5 w-full sm:w-auto text-center"
                      >
                        <span>Apply for This Programme</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Dean Profile & Quick Actions */}
          <div className="lg:col-span-4 space-y-8">
            {/* Dean Profile Card */}
            <div className="bg-[#18233a] border border-white/10 p-6 shadow-xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#f5a425]">
                Faculty Leadership
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-3">
                Message from the Dean
              </h3>

              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#162239] border border-[#f5a425] flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-[#f5a425]" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{faculty.deanName}</div>
                  <div className="text-[11px] text-[#f5a425]">{faculty.deanTitle}</div>
                </div>
              </div>

              <p className="text-xs text-white/80 leading-relaxed mb-6">
                {faculty.deanBio}
              </p>

              <Link
                href="/contact"
                className="btn-zion-outline w-full justify-center text-xs font-bold uppercase py-2.5"
              >
                <span>Contact Faculty Office</span>
              </Link>
            </div>

            {/* Quick Admissions Assistance */}
            <div className="bg-[#162239] border border-[#f5a425]/40 p-6 shadow-xl">
              <h3 className="text-base font-bold uppercase text-white mb-2">
                Need Guidance?
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Chat directly with our academic admissions advisors to evaluate your KCSE or A-Level results against degree cutoffs.
              </p>

              <div className="space-y-3">
                <a
                  href="https://wa.me/254112272061?text=Hello!%20I%20would%20like%20to%20enquire%20about%20studying%20at%20Zion%20University."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-zion w-full justify-center text-xs uppercase font-bold py-3 bg-[#25D366] text-[#0c1228] hover:bg-[#20b858]"
                >
                  <span>Chat on WhatsApp</span>
                </a>

                <Link
                  href="/apply"
                  className="btn-zion w-full justify-center text-xs uppercase font-bold py-3"
                >
                  <span>Start Online Application</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
