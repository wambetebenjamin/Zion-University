"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X, ChevronDown, User, ArrowRight } from "lucide-react";
import { faculties } from "@/lib/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [facultiesDropdown, setFacultiesDropdown] = useState(false);
  const [admissionsDropdown, setAdmissionsDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    {
      name: "Schools & Faculties",
      href: "/faculties",
      hasDropdown: true,
      type: "faculties",
    },
    {
      name: "Admissions",
      href: "/admissions",
      hasDropdown: true,
      type: "admissions",
    },
    { name: "Research", href: "/research" },
    { name: "Campus Life", href: "/campus-life" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#162239]/95 backdrop-blur-md shadow-xl py-3"
          : "bg-[#162239] border-b border-white/10 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded bg-[#18233a] border border-[#f5a425]/50 flex items-center justify-center transition-transform group-hover:scale-105 shadow">
            <GraduationCap className="w-6 h-6 text-[#f5a425]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold uppercase tracking-wider text-white">
              <span className="text-[#f5a425] font-black italic">Zion</span> University
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold -mt-1">
              Nairobi & Mombasa
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            if (link.type === "faculties") {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setFacultiesDropdown(true)}
                  onMouseLeave={() => setFacultiesDropdown(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-[13px] uppercase font-bold tracking-wider text-white hover:text-[#f5a425] border-b-2 border-transparent hover:border-[#f5a425] transition-all"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Faculties Mega Menu */}
                  {facultiesDropdown && (
                    <div className="absolute top-full left-0 w-80 bg-[#18233a] border-t-2 border-[#f5a425] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {faculties.map((faculty) => (
                        <Link
                          key={faculty.slug}
                          href={`/faculties/${faculty.slug}`}
                          className="block px-4 py-2.5 text-xs font-semibold text-white/90 hover:text-[#f5a425] hover:bg-white/5 border-b border-[#121b2f] last:border-none transition-colors"
                        >
                          <div className="text-white font-bold">{faculty.name}</div>
                          <div className="text-[11px] text-white/50">{faculty.programmeCount} Programmes Offered</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link.type === "admissions") {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setAdmissionsDropdown(true)}
                  onMouseLeave={() => setAdmissionsDropdown(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-[13px] uppercase font-bold tracking-wider text-white hover:text-[#f5a425] border-b-2 border-transparent hover:border-[#f5a425] transition-all"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Admissions Dropdown */}
                  {admissionsDropdown && (
                    <div className="absolute top-full left-0 w-64 bg-[#18233a] border-t-2 border-[#f5a425] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <Link
                        href="/admissions#requirements"
                        className="block px-4 py-2.5 text-xs font-semibold text-white/90 hover:text-[#f5a425] hover:bg-white/5 border-b border-[#121b2f]"
                      >
                        Entry Requirements
                      </Link>
                      <Link
                        href="/admissions#process"
                        className="block px-4 py-2.5 text-xs font-semibold text-white/90 hover:text-[#f5a425] hover:bg-white/5 border-b border-[#121b2f]"
                      >
                        Application Process (5 Steps)
                      </Link>
                      <Link
                        href="/admissions#fees"
                        className="block px-4 py-2.5 text-xs font-semibold text-white/90 hover:text-[#f5a425] hover:bg-white/5 border-b border-[#121b2f]"
                      >
                        Fee Structures & Tuition KES
                      </Link>
                      <Link
                        href="/admissions#scholarships"
                        className="block px-4 py-2.5 text-xs font-semibold text-white/90 hover:text-[#f5a425] hover:bg-white/5 border-b border-[#121b2f]"
                      >
                        Scholarships & Grants
                      </Link>
                      <Link
                        href="/apply"
                        className="block px-4 py-2.5 text-xs font-bold text-[#f5a425] hover:bg-white/5"
                      >
                        Apply Online Now &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 text-[13px] uppercase font-bold tracking-wider transition-all ${
                  pathname === link.href
                    ? "text-[#f5a425] border-b-2 border-[#f5a425]"
                    : "text-white hover:text-[#f5a425] border-b-2 border-transparent hover:border-[#f5a425]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTAs: Student Portal & Apply Now */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/portal"
            className="flex items-center gap-1.5 px-3 py-2 text-xs uppercase font-bold tracking-wider text-white hover:text-[#f5a425] transition-colors"
          >
            <User className="w-4 h-4 text-[#f5a425]" />
            <span>Student Portal</span>
          </Link>
          <Link
            href="/apply"
            className="btn-zion shadow-gold"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/portal"
            className="p-2 text-[#f5a425] border border-white/20 rounded"
            aria-label="Student Portal"
          >
            <User className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#f5a425] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-[#0c1228] z-50 overflow-y-auto px-6 py-8 border-t border-white/10 animate-in slide-in-from-right duration-300">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3"
            >
              Home
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3"
            >
              About Zion
            </Link>

            {/* Mobile Faculties Submenu */}
            <div className="border-b border-white/10 pb-3">
              <div className="text-base font-bold uppercase tracking-wider text-[#f5a425] mb-2">
                Schools & Faculties
              </div>
              <div className="pl-3 space-y-2">
                {faculties.map((f) => (
                  <Link
                    key={f.slug}
                    href={`/faculties/${f.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-white/80 hover:text-[#f5a425] py-1"
                  >
                    • {f.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Admissions */}
            <div className="border-b border-white/10 pb-3">
              <div className="text-base font-bold uppercase tracking-wider text-[#f5a425] mb-2">
                Admissions
              </div>
              <div className="pl-3 space-y-2">
                <Link
                  href="/admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-white/80 py-1"
                >
                  • Overview & Requirements
                </Link>
                <Link
                  href="/admissions#fees"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-white/80 py-1"
                >
                  • Fee Structures
                </Link>
                <Link
                  href="/admissions#scholarships"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-white/80 py-1"
                >
                  • Scholarships
                </Link>
              </div>
            </div>

            <Link
              href="/research"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3"
            >
              Research & Innovation
            </Link>
            <Link
              href="/campus-life"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3"
            >
              Campus Life & Hostels
            </Link>
            <Link
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3"
            >
              News & Events
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3"
            >
              Contact & Campuses
            </Link>

            <div className="pt-6 space-y-3">
              <Link
                href="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-zion justify-center text-center font-bold"
              >
                Apply Online Now
              </Link>
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-zion-outline justify-center text-center font-bold"
              >
                Student Portal Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
