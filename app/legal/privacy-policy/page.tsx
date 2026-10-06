import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, CheckCircle, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Kenya Data Protection Act 2019 | Zion University",
  description:
    "Zion University Privacy Policy compliant with Kenya Data Protection Act 2019 regarding student application data, analytics, and privacy rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">Privacy Policy</span>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f5a425] hover:text-[#ffb834] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        {/* Article Container */}
        <div className="bg-[#18233a] border border-white/10 p-6 sm:p-12 shadow-2xl space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f5a425] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Compliance Notice</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase text-white mb-2">
              Zion University Privacy Policy
            </h1>
            <p className="text-xs text-white/60">
              <strong>Last Updated:</strong> October 6, 2026 | In strict compliance with the{" "}
              <span className="text-white font-semibold">Kenya Data Protection Act, 2019</span>.
            </p>
          </div>

          {/* Section 1: Data We Collect */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              1. Data We Collect
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Zion University collects personal data required for admissions processing, academic instruction, student welfare, statutory accreditation reporting to the Commission for University Education (CUE), and digital communications. This includes your name, national identity number, birth date, gender, phone contacts, email addresses, and home residency.
            </p>
          </section>

          {/* Section 2: Student Application Data */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              2. Student Application & Academic Credentials Data
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              When applying via our Online Application Portal (<code className="text-[#f5a425]">/apply</code>), we collect secondary examination certificates (KNEC KCSE results, GCE A-Levels, IB, or prior university transcripts), passport photographs, and national identification scans. These documents are stored within encrypted cloud storage buckets (Vercel Blob) and accessed solely by authorized Admissions Registrars and Deans' Selection Committees.
            </p>
          </section>

          {/* Section 3: Analytics Tools Used */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              3. Analytics Tools & Cookies Used
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              We employ aggregated, privacy-conscious performance analytics to understand traffic volumes on our course catalog, download frequencies of our academic prospectus, and application form completion rates. All analytics cookies require your explicit consent under our Cookie Consent Manager.
            </p>
          </section>

          {/* Section 4: Third Party Partners */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              4. Third Party Service Providers & Cloud Partners
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Zion University contracts trusted technology partners to maintain our digital infrastructure:
            </p>
            <ul className="list-disc pl-5 text-sm text-white/80 space-y-1.5">
              <li><strong>Vercel Inc:</strong> Secure application hosting, edge middleware routing, and Blob encrypted document storage.</li>
              <li><strong>Google reCAPTCHA v3:</strong> Invisible spam and bot mitigation on admissions and contact forms.</li>
              <li><strong>Safaricom M-PESA & Partner Banks:</strong> Encrypted fee payment reconciliation.</li>
            </ul>
          </section>

          {/* Section 5: Rights Under Kenya Data Protection Act */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              5. Your Rights Under the Kenya Data Protection Act 2019
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Under Sections 26 through 40 of the Kenya Data Protection Act 2019, you have the right to:
            </p>
            <ul className="list-disc pl-5 text-sm text-white/80 space-y-1.5">
              <li>Request a copy of all personal records maintained by Zion University.</li>
              <li>Rectify inaccurate or obsolete academic information.</li>
              <li>Request erasure of data where processing is no longer required for statutory educational purposes.</li>
              <li>Withdraw consent for optional marketing and promotional communications at any time.</li>
            </ul>
          </section>

          {/* Section 6: Data Retention */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              6. Data Retention Policy
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Student academic transcripts and graduation conferment records are preserved permanently in the University Archives as required by the Universities Act of Kenya. Non-matriculating prospective applicant records are retained for a period of 24 months before automated purge.
            </p>
          </section>

          {/* Section 7: How to Contact Us */}
          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              7. How to Contact the Data Protection Officer (DPO)
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              For any queries, privacy concerns, or data subject access requests, contact our Data Protection Officer:
            </p>
            <div className="p-4 bg-[#0c1228] border border-white/10 text-xs sm:text-sm text-white/90 space-y-1">
              <div><strong>Data Protection Officer:</strong> Directorate of Legal & Regulatory Affairs</div>
              <div><strong>Email:</strong> <span className="text-[#f5a425]">dpo@zion.ac.ke</span> / <span className="text-[#f5a425]">admissions@zion.ac.ke</span></div>
              <div><strong>Physical Address:</strong> Zion Towers 8th Floor, University Way, P.O. Box 45290 - 00100 Nairobi, Kenya</div>
              <div><strong>Telephone:</strong> +254 112 272 061 / +254 20 800 1200</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
