"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, GraduationCap, Users, ArrowRight } from "lucide-react";

export default function FeaturesStrip() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const features = [
    {
      icon: BookOpen,
      title: "All Programmes & Degrees",
      short: "Explore over 80 industry-accredited undergraduate, master's, diploma, and certificate courses.",
      detail:
        "Designed in collaboration with the Commission for University Education (CUE) and international professional boards (EBK, CLE, ICPAK, NCK). Flexible full-time, part-time, and evening cohorts.",
      link: "/faculties",
      btnText: "View All Courses",
    },
    {
      icon: GraduationCap,
      title: "Virtual & Hybrid Classrooms",
      short: "State-of-the-art high-definition live lecture streaming and cloud learning management systems.",
      detail:
        "Seamless digital access from anywhere in East Africa. Interactive lab simulations, 24/7 digital e-library, and recorded lectures allow working professionals to balance work and advanced studies.",
      link: "/admissions",
      btnText: "Explore Hybrid Learning",
    },
    {
      icon: Users,
      title: "World-Class Faculty & Labs",
      short: "Study under Africa's leading professors, senior counsels, engineers, and researchers.",
      detail:
        "Modern robotics studios, clinical nursing skills laboratories, moot courtrooms, and high-performance computing centers at both our Nairobi and Mombasa campuses.",
      link: "/research",
      btnText: "Discover Facilities",
    },
  ];

  return (
    <section className="bg-[#0c1228] border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {features.map((item, index) => {
            const Icon = item.icon;
            const isHovered = activeCard === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative p-8 transition-all duration-300 cursor-pointer ${
                  isHovered ? "bg-[#f5a425] text-[#0c1228]" : "bg-[#0c1228] text-white"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 transition-colors ${
                      isHovered ? "bg-[#0c1228] text-[#f5a425]" : "bg-[#18233a] text-[#f5a425]"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3
                    className={`text-lg font-bold uppercase tracking-wide transition-colors ${
                      isHovered ? "text-[#0c1228]" : "text-white"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                <p
                  className={`text-sm leading-relaxed mb-3 transition-colors ${
                    isHovered ? "text-[#0c1228]/90 font-medium" : "text-white/80"
                  }`}
                >
                  {item.short}
                </p>

                {/* Sliding detail content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isHovered ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      isHovered ? "text-[#0c1228]" : "text-white/70"
                    }`}
                  >
                    {item.detail}
                  </p>
                </div>

                <Link
                  href={item.link}
                  className={`inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider border-b-2 pb-1 transition-all ${
                    isHovered
                      ? "border-[#0c1228] text-[#0c1228] hover:gap-3"
                      : "border-[#f5a425] text-[#f5a425] hover:gap-3"
                  }`}
                >
                  <span>{item.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
