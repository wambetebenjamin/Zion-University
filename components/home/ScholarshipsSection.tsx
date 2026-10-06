"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Award, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { scholarships, Scholarship } from "@/lib/data";

function CountdownFlip({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isClosingSoon: false,
  });
  const [prevSeconds, setPrevSeconds] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isClosingSoon: days <= 45, // closes soon
        });

        if (seconds !== prevSeconds) {
          setFlipping(true);
          const t = setTimeout(() => setFlipping(false), 300);
          setPrevSeconds(seconds);
          return () => clearTimeout(t);
        }
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isClosingSoon: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate, prevSeconds]);

  return (
    <div className="bg-[#0c1228] p-3 border border-white/10 mt-4">
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#f5a425] mb-2">
        <Clock className="w-3.5 h-3.5 animate-pulse" />
        <span>Application Deadline Countdown</span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center perspective-container">
        {/* Days */}
        <div className="bg-[#18233a] p-2 border border-white/10">
          <div className="text-lg font-black text-white">{String(timeLeft.days).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase text-white/50 font-bold">Days</div>
        </div>

        {/* Hours */}
        <div className="bg-[#18233a] p-2 border border-white/10">
          <div className="text-lg font-black text-white">{String(timeLeft.hours).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase text-white/50 font-bold">Hours</div>
        </div>

        {/* Minutes */}
        <div className="bg-[#18233a] p-2 border border-white/10">
          <div className="text-lg font-black text-white">{String(timeLeft.minutes).padStart(2, "0")}</div>
          <div className="text-[10px] uppercase text-white/50 font-bold">Mins</div>
        </div>

        {/* Seconds with CSS perspective flip */}
        <div className="bg-[#18233a] p-2 border border-white/10 relative overflow-hidden">
          <div
            className={`text-lg font-black text-[#f5a425] transition-transform duration-300 ${
              flipping ? "rotate-x-90" : "rotate-x-0"
            }`}
            style={{
              transform: flipping ? "rotateX(90deg)" : "rotateX(0deg)",
              transformOrigin: "center bottom",
            }}
          >
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className="text-[10px] uppercase text-white/50 font-bold">Secs</div>
        </div>
      </div>
    </div>
  );
}

export default function ScholarshipsSection() {
  return (
    <section id="scholarships" className="py-20 md:py-28 bg-[#172238] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Scholarships & Financial Aid</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 mt-4">
            Over KES 120 Million disbursed annually in merit scholarships, women in STEM grants,
            and East African community bursaries to ensure no brilliant mind is left behind.
          </p>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((sch) => {
            return (
              <div
                key={sch.id}
                className="bg-[#18233a] border border-white/10 hover:border-[#f5a425] p-6 sm:p-7 flex flex-col justify-between transition-all group shadow-xl"
              >
                <div>
                  {/* Category Tag & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-[#f5a425]/20 text-[#f5a425] border border-[#f5a425]/40">
                      {sch.category} Award
                    </span>
                    <div className="p-2 bg-white/5 border border-white/10 text-[#f5a425] group-hover:bg-[#f5a425] group-hover:text-[#0c1228] transition-colors">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Value */}
                  <h3 className="text-lg font-bold text-white group-hover:text-[#f5a425] transition-colors mb-2">
                    {sch.name}
                  </h3>
                  <div className="text-sm font-extrabold text-[#f5a425] mb-4 pb-3 border-b border-white/10">
                    {sch.valueText}
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed mb-4">
                    {sch.description}
                  </p>

                  {/* Eligibility Criteria */}
                  <div className="space-y-2 mb-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                      Eligibility Criteria:
                    </div>
                    {sch.eligibility.map((el, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#f5a425] shrink-0 mt-0.5" />
                        <span className="text-xs text-white/70 leading-normal">{el}</span>
                      </div>
                    ))}
                  </div>

                  {/* Countdown Timer Component */}
                  <CountdownFlip targetDate={sch.deadline} />
                </div>

                {/* Apply Button */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href={`/apply?scholarship=${sch.id}`}
                    className="btn-zion w-full justify-between text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Apply for Scholarship</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
