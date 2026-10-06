"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Mail,
  Send,
  MapPin,
  Phone,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { faculties } from "@/lib/data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "newsletter" }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#152036] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#18233a] border border-[#f5a425]/50 flex items-center justify-center shadow">
                <GraduationCap className="w-6 h-6 text-[#f5a425]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold uppercase tracking-wider text-white">
                  <span className="text-[#f5a425] font-black italic">Zion</span> University
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold -mt-1">
                  Nairobi • Mombasa, Kenya
                </span>
              </div>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Zion University is a premier chartered institution of higher learning,
              pan-African scientific inquiry, and ethical leadership development accredited by
              the Commission for University Education (CUE) of Kenya.
            </p>

            <div className="space-y-1.5 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f5a425]" />
                <span>Nairobi Towers Campus & Mombasa Oceanside Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f5a425]" />
                <span>+254 112 272 061 / +254 20 800 1200</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#f5a425]" />
                <span className="text-[#f5a425]">admissions@zion.ac.ke</span>
              </div>
            </div>
          </div>

          {/* Column 2: Faculties Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5a425] border-b border-white/10 pb-2">
              Schools & Faculties
            </h4>
            <ul className="space-y-2 text-xs">
              {faculties.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/faculties/${f.slug}`}
                    className="text-white/70 hover:text-[#f5a425] transition-colors"
                  >
                    {f.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Admissions & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5a425] border-b border-white/10 pb-2">
              Admissions & Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admissions" className="text-white/70 hover:text-[#f5a425] transition-colors">
                  Undergraduate Admissions
                </Link>
              </li>
              <li>
                <Link href="/admissions#fees" className="text-white/70 hover:text-[#f5a425] transition-colors">
                  Postgraduate & MBA
                </Link>
              </li>
              <li>
                <Link href="/admissions#scholarships" className="text-white/70 hover:text-[#f5a425] transition-colors">
                  Scholarships & Bursaries
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-white/70 hover:text-[#f5a425] transition-colors font-bold text-[#f5a425]">
                  Student Portal Login
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-white/70 hover:text-[#f5a425] transition-colors">
                  Online Application Form
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-white/70 hover:text-[#f5a425] transition-colors">
                  Research Centres & Grants
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5a425] border-b border-white/10 pb-2">
              Stay Connected
            </h4>
            <p className="text-xs text-white/70">
              Subscribe for open day invitations and scholarship announcements.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#18233a] border border-[#f5a425] text-xs text-[#f5a425] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-xs text-white bg-white/5 border border-white/15"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-zion w-full justify-center text-[11px] font-bold uppercase py-2"
                >
                  {loading ? "Subscribing..." : "Subscribe Now"}
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-white/10 flex flex-col space-y-1.5 text-[11px]">
              <Link href="/legal/privacy-policy" className="text-white/60 hover:text-[#f5a425]">
                Privacy Policy (Data Protection Act 2019)
              </Link>
              <Link href="/legal/terms" className="text-white/60 hover:text-[#f5a425]">
                Terms & Conditions
              </Link>
              <Link href="/legal/cookie-policy" className="text-white/60 hover:text-[#f5a425]">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p className="m-0">
            &copy; {new Date().getFullYear()} Zion University. All Rights Reserved. Chartered by the Commission for University Education (CUE), Kenya.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-[#f5a425]">Nairobi Campus</span>
            <span>•</span>
            <span className="text-[#f5a425]">Mombasa Campus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
