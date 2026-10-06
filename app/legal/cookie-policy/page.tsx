import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Cookie } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | Zion University Kenya",
  description:
    "Information about how Zion University uses cookies and tracking technologies in accordance with Kenya Data Protection Act 2019.",
};

export default function CookiePolicyPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">Cookie Policy</span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f5a425] hover:text-[#ffb834] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        <div className="bg-[#18233a] border border-white/10 p-6 sm:p-12 shadow-2xl space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f5a425] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Cookie Policy</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase text-white mb-2">
              Cookie & Tracking Technology Policy
            </h1>
            <p className="text-xs text-white/60">
              Compliant with the Kenya Data Protection Act, 2019
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              What Are Cookies?
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Cookies are small data files placed on your computer or mobile device when you browse websites. They are widely used by universities and institutions to facilitate user sessions, remember language and campus preferences, and measure website performance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              Categories of Cookies We Use
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#162239] border border-white/10">
                <h3 className="text-sm font-bold text-white mb-1">1. Strictly Necessary Cookies (Always Active)</h3>
                <p className="text-xs text-white/70">
                  Essential for secure login to the Student Portal, CSRF security token verification, and submitting multi-step admission applications.
                </p>
              </div>

              <div className="p-4 bg-[#162239] border border-white/10">
                <h3 className="text-sm font-bold text-white mb-1">2. Analytics & Performance Cookies</h3>
                <p className="text-xs text-white/70">
                  Help us understand how prospective students navigate our faculty directories and which course brochures are downloaded most frequently.
                </p>
              </div>

              <div className="p-4 bg-[#162239] border border-white/10">
                <h3 className="text-sm font-bold text-white mb-1">3. Marketing & Communication Cookies</h3>
                <p className="text-xs text-white/70">
                  Used to deliver relevant scholarship deadline reminders and open day notices.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              Managing Your Cookie Preferences
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              You can adjust or withdraw your cookie consent at any time using our Cookie Consent Banner or by clearing your browser cache. For further questions, contact <span className="text-[#f5a425]">privacy@zion.ac.ke</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
