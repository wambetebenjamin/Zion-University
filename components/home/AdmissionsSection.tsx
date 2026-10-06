"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle,
  FileText,
  Mail,
  Award,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function AdmissionsSection() {
  const [activeLevel, setActiveLevel] = useState<
    "Undergraduate" | "Postgraduate" | "Diploma" | "Certificate"
  >("Undergraduate");

  const steps = [
    {
      num: "01",
      icon: BookOpen,
      title: "Choose Your Programme",
      desc: "Browse our 80+ accredited degree, diploma, and certificate courses across our 6 faculties.",
    },
    {
      num: "02",
      icon: CheckCircle,
      title: "Meet Entry Requirements",
      desc: "Verify your KCSE mean grade, subject minimums, or diploma/degree equivalents.",
    },
    {
      num: "03",
      icon: FileText,
      title: "Submit Application Online",
      desc: "Fill our secure 5-step application form and upload copies of your academic certificates and ID.",
    },
    {
      num: "04",
      icon: Mail,
      title: "Receive Admission Letter",
      desc: "Get your official Letter of Offer and Fee Structure within 3 to 5 business days.",
    },
    {
      num: "05",
      icon: Award,
      title: "Register & Pay Fees",
      desc: "Clear first-semester tuition, attend freshers' orientation, and obtain your student smartcard.",
    },
  ];

  const requirementsData = {
    Undergraduate: {
      title: "Undergraduate Degree Requirements (Bachelor's)",
      general: "KCSE Mean Grade of C+ (plus) or recognized equivalent credentials.",
      rows: [
        {
          programme: "School of Engineering & Tech (B.Sc. CS / AI / Eng)",
          minGrade: "KCSE C+ (plus)",
          subjectReqs: "C+ in Mathematics, Physics/Chemistry, and English",
          duration: "4 - 5 Years",
          fees: "KES 165,000 - 175,000 / semester",
        },
        {
          programme: "School of Law (LL.B Honors)",
          minGrade: "KCSE B (plain)",
          subjectReqs: "B (plain) in English or Kiswahili; or prior Bachelor's degree",
          duration: "4 Years",
          fees: "KES 195,000 / semester",
        },
        {
          programme: "School of Health Sciences (BScN / BSc Public Health)",
          minGrade: "KCSE C+ (plus)",
          subjectReqs: "C+ in Biology, Chemistry, Mathematics/Physics, English",
          duration: "4 Years",
          fees: "KES 155,000 - 185,000 / semester",
        },
        {
          programme: "School of Business & Economics (BBA / B.Com)",
          minGrade: "KCSE C+ (plus)",
          subjectReqs: "C+ in Mathematics and English / Kiswahili",
          duration: "4 Years",
          fees: "KES 140,000 - 145,000 / semester",
        },
        {
          programme: "School of Education (B.Ed Arts & Science)",
          minGrade: "KCSE C+ (plus)",
          subjectReqs: "C+ in two teaching subjects of choice",
          duration: "4 Years",
          fees: "KES 110,000 - 120,000 / semester",
        },
      ],
    },
    Postgraduate: {
      title: "Postgraduate Degree Requirements (Master's & PhD)",
      general: "Recognized Bachelor's Degree with at least Upper Second Class Honours or relevant executive experience.",
      rows: [
        {
          programme: "Master of Business Administration (MBA Executive)",
          minGrade: "Upper 2nd Class Honours",
          subjectReqs: "Bachelor's degree in any discipline + 2 years work experience",
          duration: "2 Years (Weekend/Evening)",
          fees: "KES 220,000 / semester",
        },
        {
          programme: "Master of Laws (LL.M Commercial & Maritime)",
          minGrade: "LL.B Upper 2nd Class",
          subjectReqs: "CLE-accredited LL.B degree",
          duration: "2 Years",
          fees: "KES 260,000 / semester",
        },
        {
          programme: "M.Sc. Data Science & Artificial Intelligence",
          minGrade: "STEM Bachelor's Upper 2nd",
          subjectReqs: "Degree in Computer Science, Mathematics, Statistics or Eng",
          duration: "2 Years",
          fees: "KES 240,000 / semester",
        },
        {
          programme: "Master of Public Health (MPH)",
          minGrade: "Health / Biological Bachelor's",
          subjectReqs: "MBChB, BScN, Public Health or allied science degree",
          duration: "2 Years",
          fees: "KES 235,000 / semester",
        },
      ],
    },
    Diploma: {
      title: "Diploma Programme Requirements",
      general: "KCSE Mean Grade of C- (minus) or relevant Certificate pass.",
      rows: [
        {
          programme: "Diploma in Business Management",
          minGrade: "KCSE C- (minus)",
          subjectReqs: "D+ in Mathematics and English",
          duration: "2 Years",
          fees: "KES 65,000 / semester",
        },
        {
          programme: "Diploma in Law & Paralegal Studies",
          minGrade: "KCSE C (plain)",
          subjectReqs: "C+ in English or Kiswahili",
          duration: "2 Years",
          fees: "KES 75,000 / semester",
        },
        {
          programme: "Diploma in Information Technology & Web Eng",
          minGrade: "KCSE C- (minus)",
          subjectReqs: "C- in Mathematics and English",
          duration: "2 Years",
          fees: "KES 70,000 / semester",
        },
      ],
    },
    Certificate: {
      title: "Certificate & Foundation Programme Requirements",
      general: "KCSE Mean Grade of D+ (plus) or D (plain).",
      rows: [
        {
          programme: "Certificate in Business Studies",
          minGrade: "KCSE D+ (plus)",
          subjectReqs: "D in English and Mathematics",
          duration: "1 Year",
          fees: "KES 40,000 / semester",
        },
        {
          programme: "Certificate in Computer Applications & IT",
          minGrade: "KCSE D (plain)",
          subjectReqs: "Open to secondary school leavers",
          duration: "6 Months - 1 Year",
          fees: "KES 35,000 / semester",
        },
        {
          programme: "Certificate in Health Records & Administration",
          minGrade: "KCSE D+ (plus)",
          subjectReqs: "D+ in Biology and English",
          duration: "1 Year",
          fees: "KES 42,000 / semester",
        },
      ],
    },
  };

  return (
    <section id="admissions" className="py-20 md:py-28 bg-[#0c1228] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Admissions & Application Process</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 mt-4">
            Follow our streamlined 5-step admission process to secure your enrollment for the upcoming intake in Nairobi or Mombasa.
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="relative bg-[#18233a] border border-white/10 p-6 flex flex-col justify-between hover:border-[#f5a425] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#f5a425]">{st.num}</span>
                    <div className="p-2.5 bg-white/5 border border-white/10 text-[#f5a425] group-hover:bg-[#f5a425] group-hover:text-[#0c1228] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-[#f5a425] transition-colors mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">{st.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-bold text-[#f5a425] flex items-center gap-1">
                  <span>Step {i + 1} of 5</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Requirements Tabbed Table Header */}
        <div className="bg-[#162239] border border-white/10 p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                Entry Requirements & Fee Guidelines
              </h3>
              <p className="text-xs text-white/70 mt-1">
                Select your academic level below to inspect minimum KCSE benchmarks and tuition structures.
              </p>
            </div>

            {/* Level Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-[#0c1228] p-1.5 border border-white/10">
              {(["Undergraduate", "Postgraduate", "Diploma", "Certificate"] as const).map(
                (lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveLevel(lvl)}
                    className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                      activeLevel === lvl
                        ? "bg-[#f5a425] text-[#0c1228] shadow"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {lvl}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Tab Information */}
          <div className="mb-4 text-xs font-semibold text-[#f5a425] flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{requirementsData[activeLevel].general}</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white border border-white/10">
              <thead className="bg-[#18233a] uppercase font-bold text-white/90 border-b border-white/10">
                <tr>
                  <th className="p-3.5">Academic Programme</th>
                  <th className="p-3.5">Min. Qualification</th>
                  <th className="p-3.5">Key Subject Requirements</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Tuition (KES)</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {requirementsData[activeLevel].rows.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold text-white">{row.programme}</td>
                    <td className="p-3.5 text-[#f5a425] font-semibold">{row.minGrade}</td>
                    <td className="p-3.5 text-white/80">{row.subjectReqs}</td>
                    <td className="p-3.5 text-white/70">{row.duration}</td>
                    <td className="p-3.5 font-bold text-white">{row.fees}</td>
                    <td className="p-3.5 text-right">
                      <Link
                        href="/apply"
                        className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#f5a425] hover:text-[#ffb834] underline"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Prompt */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <p className="text-xs text-white/70 m-0 text-center sm:text-left">
              Need credit transfer evaluation from another recognized institution?
              Contact admissions at <span className="text-white font-bold">admissions@zion.ac.ke</span>.
            </p>
            <Link
              href="/apply"
              className="btn-zion shadow-gold text-xs font-bold uppercase tracking-wider px-6 py-3 shrink-0"
            >
              <span>Start Online Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
