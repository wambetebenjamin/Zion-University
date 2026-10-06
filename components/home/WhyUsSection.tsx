"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Award, ShieldCheck, Globe } from "lucide-react";

export default function WhyUsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: "best-education",
      label: "Accredited Excellence",
      title: "CUE & Internationally Accredited Curricula",
      image: "/images/bg/choose-us-image-01.png",
      content: [
        "Zion University is fully chartered by the Commission for University Education (CUE) of Kenya and holds tier-1 accreditations from statutory professional bodies including the Engineers Board of Kenya (EBK), Council of Legal Education (CLE), Nursing Council of Kenya (NCK), and ICPAK.",
        "Our graduates enjoy a 94% employment and venture creation rate within 6 months of graduation, propelled by compulsory industry attachments, executive mentorship, and practical capstone projects.",
      ],
      points: [
        "100% CUE and professional board compliance",
        "Dual campus advantage in Nairobi and Mombasa",
        "Direct credit exemptions for CPA, ACCA, and CIArb tracks",
        "Generous scholarships and flexible tuition installment plans",
      ],
    },
    {
      id: "top-research",
      label: "Pan-African Research",
      title: "Frontline Research Impacting Kenya & Africa",
      image: "/images/bg/choose-us-image-02.png",
      content: [
        "With six high-impact research centres in Artificial Intelligence, Infectious Disease Epidemiology, Renewable Energy, and Continental Trade Law, Zion University generates solutions tailored for African socio-economic realities.",
        "Over $12 million in active international research grants from USAID, Gates Foundation, AfDB, Wellcome Trust, and the African Union directly empower our faculty and graduate students.",
      ],
      points: [
        "Leading African NLP and Swahili medical translation models",
        "Next-generation geothermal and solar microgrid prototypes",
        "Active coastal marine biology and public health clinics",
        "Over 300 peer-reviewed journal papers published annually",
      ],
    },
    {
      id: "modern-facilities",
      label: "Modern Campus Life",
      title: "State-of-the-Art Infrastructure & Student Care",
      image: "/images/bg/choose-us-image-03.png",
      content: [
        "Experience vibrant campus life across our Nairobi Main Campus and Mombasa Coastal Campus. Enjoy gigabit fiber Wi-Fi, modern high-rise student hostels, Olympic-grade sports facilities, and comprehensive 24/7 medical and counseling clinics.",
        "Over 30 student clubs, hackathon teams, moot court societies, and sports leagues ensure holistic character development alongside academic mastery.",
      ],
      points: [
        "24/7 biometric smartcard campus security",
        "Olympic swimming pool, athletics track, and sports pavilions",
        "Dedicated student counseling & career development hub",
        "Fully equipped audio-visual studios and fabrication labs",
      ],
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#172238] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Why Choose Zion University?</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 mt-4">
            Combining rigorous academic heritage with future-ready technological fluency,
            ethical leadership, and practical African market insights.
          </p>
        </div>

        {/* Tab Selector matching template's dot & underline style */}
        <div className="flex flex-wrap items-center justify-center border-b border-white/10 mb-12">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 py-4 text-xs sm:text-sm uppercase font-bold tracking-wider transition-all min-h-[48px] ${
                  isActive
                    ? "text-[#f5a425]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <>
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f5a425]" />
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#f5a425] rounded-full border-2 border-[#172238]" />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="bg-[#18233a] border border-white/10 p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 relative h-72 md:h-96 w-full bg-[#0c1228] border border-white/10 overflow-hidden">
              <Image
                src={tabs[activeTab].image}
                alt={tabs[activeTab].title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Right Information */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4 leading-tight">
                  {tabs[activeTab].title}
                </h3>

                {tabs[activeTab].content.map((p, i) => (
                  <p key={i} className="text-sm text-white/80 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}

                {/* Key Bullet Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                  {tabs[activeTab].points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-[#f5a425]/20 text-[#f5a425] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-white/90 font-medium">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
                <Link
                  href="/apply"
                  className="btn-zion text-xs font-bold uppercase tracking-wider"
                >
                  <span>Apply for Next Intake</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/campus-life"
                  className="btn-zion-outline text-xs font-bold uppercase tracking-wider"
                >
                  <span>Explore Campus Life</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
