"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, GraduationCap, ArrowRight, Home } from "lucide-react";

export default function NotFoundPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/faculties?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#0c1228] min-h-[85vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-[#18233a] border border-white/10 p-8 sm:p-12 text-center shadow-2xl relative">
        <div className="w-16 h-16 rounded-full bg-[#162239] border border-[#f5a425] flex items-center justify-center text-[#f5a425] mx-auto mb-4 shadow">
          <GraduationCap className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#f5a425]">
          Page Not Found
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-white mt-2 mb-3">
          This page could not be found.
        </h1>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-8 max-w-md mx-auto">
          The academic page or resource you are looking for may have been relocated or updated for the current intake.
        </p>

        {/* Course Search Bar */}
        <form onSubmit={handleSearch} className="mb-8 max-w-md mx-auto">
          <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2 text-left">
            Search For Courses & Degree Programmes:
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Computer Science, Law, MBA, Nursing..."
              className="w-full pl-10 pr-24 py-3 text-xs text-white bg-white/5 border border-white/20"
            />
            <Search className="w-4 h-4 text-white/50 absolute left-3.5" />
            <button
              type="submit"
              className="absolute right-1.5 btn-zion text-[11px] font-bold uppercase py-2 px-3 min-h-[36px]"
            >
              Search
            </button>
          </div>
        </form>

        {/* CTA Button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-zion shadow-gold text-xs font-bold uppercase tracking-wider px-6 py-3 inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
          <Link
            href="/faculties"
            className="btn-zion-outline text-xs font-bold uppercase tracking-wider px-6 py-3"
          >
            <span>Explore All Faculties</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
