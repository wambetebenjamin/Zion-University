"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Play, Compass, MapPin, Check } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualTourModal({ isOpen, onClose }: ModalProps) {
  const [activeLocation, setActiveLocation] = useState(0);

  if (!isOpen) return null;

  const tourStops = [
    {
      title: "Main Academic Quad & Chandaria Towers (Nairobi)",
      campus: "Nairobi Main Campus",
      image: "/images/campus/nairobi-campus.jpg",
      description: "Home to the School of Engineering, School of Business, high-speed compute clusters, and the Central Administrative Pavilion.",
      facilities: ["1,500-seat Convocation Auditorium", "High-Performance Robotics Lab", "Rooftop Solar Observatory"],
    },
    {
      title: "Moot Courtroom & Legal Clinic (School of Law)",
      campus: "Nairobi Main Campus",
      image: "/images/faculties/law.jpg",
      description: "State-of-the-art appellate moot courtroom simulating the High Court of Kenya and the East African Court of Justice.",
      facilities: ["Digital Audio-Visual Trial Recording", "Judge's Chambers & Deliberation Suite", "CLE-Accredited Law Library"],
    },
    {
      title: "Coastal Oceanside Campus & Blue Economy Centre",
      campus: "Mombasa Coastal Campus",
      image: "/images/campus/mombasa-campus.jpg",
      description: "Oceanfront academic campus specializing in Maritime Law, Marine Biotechnology, Health Sciences, and Coastal Tourism.",
      facilities: ["Marine Biology Wet Labs", "Beachfront Student Residences", "Executive MBA Coastal Suites"],
    },
    {
      title: "Health Sciences Clinical Skills Simulation Lab",
      campus: "Nairobi & Mombasa Campuses",
      image: "/images/faculties/health.png",
      description: "Advanced medical and nursing simulation suites with high-fidelity robotic patient manikins.",
      facilities: ["Intensive Care Unit (ICU) Simulator", "Anatomy & Histology Suites", "24/7 Campus Emergency Clinic"],
    },
    {
      title: "Modern Student Hostels & Athletic Arena",
      campus: "Nairobi & Mombasa Campuses",
      image: "/images/campus/hostels.jpg",
      description: "Modern, secure student residences featuring gigabit Wi-Fi, fitness gyms, and heated Olympic swimming facilities.",
      facilities: ["Biometric 24/7 Security", "Olympic Swimming Pool & Track", "Dining Cafeterias & Coffee Lounges"],
    },
  ];

  const current = tourStops[activeLocation];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#172238] border border-[#f5a425]/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative flex flex-col justify-between">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white p-1"
          aria-label="Close tour"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <div className="p-3 bg-[#f5a425] text-[#0c1228] shrink-0">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase text-white">
              Zion University 360° Virtual Campus Experience
            </h3>
            <p className="text-xs text-white/70">
              Interactive visual tour of our modern academic facilities in Nairobi and Mombasa
            </p>
          </div>
        </div>

        {/* Tour Stops Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-white/10">
          {tourStops.map((stop, idx) => (
            <button
              key={idx}
              onClick={() => setActiveLocation(idx)}
              className={`px-3.5 py-2 text-xs font-bold uppercase whitespace-nowrap transition-all ${
                activeLocation === idx
                  ? "bg-[#f5a425] text-[#0c1228]"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              Stop {idx + 1}: {stop.campus.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Main Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Photo View */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 w-full bg-[#0c1228] border border-white/10 overflow-hidden shadow-2xl">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover animate-in fade-in zoom-in-95 duration-300"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-1 bg-[#f5a425] text-[#0c1228]">
                {current.campus}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                {current.title}
              </h4>
            </div>
          </div>

          {/* Details & Facilities */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#f5a425] uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Stop {activeLocation + 1} of {tourStops.length}</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-3">{current.title}</h4>
              <p className="text-xs text-white/80 leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Key Facility Highlights:
                </div>
                {current.facilities.map((fac, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/90">
                    <Check className="w-3.5 h-3.5 text-[#f5a425]" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() =>
                  setActiveLocation((prev) => (prev > 0 ? prev - 1 : tourStops.length - 1))
                }
                className="px-4 py-2 bg-white/10 text-white text-xs font-bold uppercase hover:bg-white/20"
              >
                &larr; Previous Stop
              </button>
              <button
                onClick={() =>
                  setActiveLocation((prev) => (prev < tourStops.length - 1 ? prev + 1 : 0))
                }
                className="btn-zion text-xs font-bold uppercase px-4 py-2"
              >
                <span>Next Stop &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
