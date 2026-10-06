import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CookieConsentBanner from "@/components/layout/CookieConsentBanner";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://zion.ac.ke"),
  title: "Zion University | Shape the Future • Nairobi & Mombasa, Kenya",
  description:
    "Zion University is a premier chartered institution in Nairobi & Mombasa, Kenya offering 80+ accredited undergraduate, postgraduate, and diploma programmes in Business, Law, Engineering, Health Sciences, Education, and Arts.",
  keywords: [
    "Zion University",
    "University in Kenya",
    "Nairobi Campus",
    "Mombasa Campus",
    "Undergraduate Degrees Kenya",
    "Master of Business Administration Kenya",
    "Engineering EBK Kenya",
    "School of Law CLE Kenya",
    "Nursing Degree NCK Kenya",
    "CUE Accredited Universities",
  ],
  authors: [{ name: "Zion University Directorate of Corporate Communications" }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://zion.ac.ke",
    siteName: "Zion University",
    title: "Zion University | Shape the Future • Study in Kenya",
    description:
      "Accredited programmes, world-class pan-African research centres, and merit scholarships across Nairobi Main Campus and Mombasa Coastal Satellite Campus.",
    images: [
      {
        url: "/images/hero/hero-campus.jpg",
        width: 1200,
        height: 630,
        alt: "Zion University Campus Students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zion University | Shape the Future",
    description:
      "Premier higher education in Nairobi and Mombasa. 80+ accredited degree programmes.",
    images: ["/images/hero/hero-campus.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#0c1228] text-white flex flex-col font-sans selection:bg-[#f5a425] selection:text-[#0c1228]">
        <SessionProvider>
          {/* Branded Loading Screen under 2 seconds */}
          <LoadingScreen />

          {/* Sticky Navbar */}
          <Navbar />

          {/* Main App Content */}
          <main className="flex-1">{children}</main>

          {/* WhatsApp Floating Action */}
          <WhatsAppButton />

          {/* Cookie Consent Banner */}
          <CookieConsentBanner />

          {/* Footer */}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
