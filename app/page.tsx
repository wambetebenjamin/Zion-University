"use client";

import React, { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import WhyUsSection from "@/components/home/WhyUsSection";
import FacultiesSection from "@/components/home/FacultiesSection";
import AdmissionsSection from "@/components/home/AdmissionsSection";
import ResearchSection from "@/components/home/ResearchSection";
import ScholarshipsSection from "@/components/home/ScholarshipsSection";
import CampusLifeSection from "@/components/home/CampusLifeSection";
import NewsEventsSection from "@/components/home/NewsEventsSection";
import AlumniSection from "@/components/home/AlumniSection";
import ContactSection from "@/components/home/ContactSection";
import ProspectusModal from "@/components/modals/ProspectusModal";
import VirtualTourModal from "@/components/modals/VirtualTourModal";
import AlumniModal from "@/components/modals/AlumniModal";

export default function HomePage() {
  const [prospectusOpen, setProspectusOpen] = useState(false);
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [alumniModalOpen, setAlumniModalOpen] = useState(false);

  // Schema.org EducationalOrganization JSON-LD
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Zion University",
    "alternateName": "Zion University Kenya",
    "url": "https://zion.ac.ke",
    "logo": "https://zion.ac.ke/images/hero/hero-campus.jpg",
    "description": "Chartered higher education university in Nairobi and Mombasa, Kenya offering accredited undergraduate and postgraduate degree programmes.",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Zion Towers, University Way",
        "addressLocality": "Nairobi",
        "postalCode": "00100",
        "addressCountry": "KE"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Ocean View Academic Park, Nkurumah Road",
        "addressLocality": "Mombasa",
        "postalCode": "80100",
        "addressCountry": "KE"
      }
    ],
    "telephone": "+254112272061",
    "email": "admissions@zion.ac.ke",
    "sameAs": [
      "https://facebook.com/ZionUniversityKenya",
      "https://twitter.com/ZionUniKenya",
      "https://linkedin.com/school/zion-university-kenya"
    ]
  };

  return (
    <>
      {/* EducationalOrganization JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* 1. Hero Section */}
      <HeroSection onOpenProspectus={() => setProspectusOpen(true)} />

      {/* 2. Features Strip (Template reproduction) */}
      <FeaturesStrip />

      {/* 3. Why Us / About Section (Tabs reproduction) */}
      <WhyUsSection />

      {/* 4. Schools & Faculties Section (6 Faculty Cards) */}
      <FacultiesSection />

      {/* 5. Admissions Step-by-Step & Requirements Table */}
      <AdmissionsSection />

      {/* 6. Research Centres Section */}
      <ResearchSection />

      {/* 7. Scholarships with Flip Countdown Timer */}
      <ScholarshipsSection />

      {/* 8. Campus Life, Hostels, Sports & Virtual Tour */}
      <CampusLifeSection onOpenVirtualTour={() => setVirtualTourOpen(true)} />

      {/* 9. News & Events Section */}
      <NewsEventsSection />

      {/* 10. Alumni Network & Directory */}
      <AlumniSection onOpenAlumniModal={() => setAlumniModalOpen(true)} />

      {/* 11. Contact Section (Nairobi & Mombasa Tabs) */}
      <ContactSection />

      {/* Modals */}
      <ProspectusModal
        isOpen={prospectusOpen}
        onClose={() => setProspectusOpen(false)}
      />

      <VirtualTourModal
        isOpen={virtualTourOpen}
        onClose={() => setVirtualTourOpen(false)}
      />

      <AlumniModal
        isOpen={alumniModalOpen}
        onClose={() => setAlumniModalOpen(false)}
      />
    </>
  );
}
