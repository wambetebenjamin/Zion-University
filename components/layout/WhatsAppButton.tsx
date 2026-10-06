"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl =
    "https://wa.me/254112272061?text=Hello!%20I%20would%20like%20to%20enquire%20about%20studying%20at%20Zion%20University.";

  return (
    <div className="fixed bottom-6 right-6 z-[9980] flex items-center group">
      {/* Tooltip on Hover */}
      <div
        className={`hidden sm:block absolute right-full mr-3 px-3.5 py-2 bg-[#162239] border border-[#f5a425] text-white text-xs font-semibold whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none ${
          showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        <span>Ask about admissions or programmes</span>
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-4 border-transparent border-l-[#f5a425]" />
      </div>

      {/* Floating Action Button with subtle 10-second pulse animation */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Ask about admissions or programmes on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-[#0c1228] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-slow border-2 border-white/20"
      >
        <MessageSquare className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
