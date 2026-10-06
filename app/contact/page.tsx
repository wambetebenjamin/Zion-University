import React from "react";
import Link from "next/link";
import ContactSection from "@/components/home/ContactSection";

export const metadata = {
  title: "Contact Us & Campus Directions | Zion University Kenya",
  description:
    "Get in touch with Zion University Nairobi Main Campus and Mombasa Coastal Campus. Admissions contacts, telephone, and location maps.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">Contact & Locations</span>
        </div>

        <ContactSection />
      </div>
    </div>
  );
}
