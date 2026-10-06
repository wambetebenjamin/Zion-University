import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions of Website & Admissions | Zion University Kenya",
  description:
    "Official terms and conditions for use of Zion University web portal, online application services, student conduct, and Kenyan governing law.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">Terms & Conditions</span>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f5a425] hover:text-[#ffb834] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        {/* Terms Content Container */}
        <div className="bg-[#18233a] border border-white/10 p-6 sm:p-12 shadow-2xl space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f5a425] mb-2">
              <FileText className="w-4 h-4" />
              <span>Legal Terms</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase text-white mb-2">
              Terms & Conditions
            </h1>
            <p className="text-xs text-white/60">
              <strong>Effective Date:</strong> Academic Year 2026/2027 | Governing Law:{" "}
              <span className="text-white font-semibold">Republic of Kenya</span>
            </p>
          </div>

          {/* Section 1: Use of This Website */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              1. Use of This Website & Digital Portals
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              By accessing and utilizing the Zion University website (zion.ac.ke) and associated student portals, you agree to comply with all applicable local, national, and international laws. Unauthorized access, automated scraping, vulnerability exploitation, or interference with application servers is strictly prohibited.
            </p>
          </section>

          {/* Section 2: Application Terms */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              2. Online Application Terms & Credential Verification
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Applicants must provide genuine, verifiable academic qualifications (KNEC KCSE, GCE, or university transcripts) and accurate identity documentation. Submission of forged, falsified, or altered documents results in immediate disqualification, cancellation of admission offer, and referral to the Directorate of Criminal Investigations (DCI) of Kenya.
            </p>
          </section>

          {/* Section 3: Student Code of Conduct */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              3. Student Code of Conduct Reference
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Enrolled students are bound by the <em>Zion University Student Handbook and Academic Regulations</em>. Academic dishonesty, plagiarism, examination malpractice, property vandalism, harassment, and unauthorized disruption of lectures carry disciplinary sanctions up to permanent expulsion.
            </p>
          </section>

          {/* Section 4: Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              4. Intellectual Property & Research Rights
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              All website content, curriculum frameworks, university crests, and media assets are the exclusive intellectual property of Zion University. Inventions, patents, and software developed within University research laboratories are governed by the Zion University IP and Commercialisation Policy.
            </p>
          </section>

          {/* Section 5: Disclaimer of Results */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              5. Disclaimer of Employment & Examination Results
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              While Zion University curates market-leading curricula and industry placement links, admission and matriculation do not constitute an explicit guarantee of post-graduation employment. Individual academic outcomes and professional career trajectories depend on personal diligence and performance.
            </p>
          </section>

          {/* Section 6: Governing Law Kenya */}
          <section className="space-y-3 pt-6 border-t border-white/10">
            <h2 className="text-lg font-bold uppercase text-[#f5a425]">
              6. Governing Law & Jurisdiction
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              These Terms and Conditions shall be governed by and construed in accordance with the Laws of the Republic of Kenya. Any legal dispute arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the Courts of Law in Nairobi, Kenya.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
