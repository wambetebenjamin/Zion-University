"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react";
import { campusLocations } from "@/lib/data";

export default function ContactSection() {
  const [selectedCampus, setSelectedCampus] = useState<"nairobi" | "mombasa">("nairobi");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    campus: "Nairobi Main Campus",
    subject: "Admissions Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaFallbackNeeded, setCaptchaFallbackNeeded] = useState(false);
  const [captchaV2Checked, setCaptchaV2Checked] = useState(false);

  const activeInfo = campusLocations[selectedCampus];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // In production, execute grecaptcha.execute('...', {action: 'contact_form'})
      // Simulated client-side token or fallback token
      const captchaToken = captchaFallbackNeeded
        ? captchaV2Checked
          ? "mock-recaptcha-v2-verified"
          : ""
        : "mock-recaptcha-token";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          campus: selectedCampus === "nairobi" ? "Nairobi Main Campus" : "Mombasa Coastal Campus",
          captchaToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.challengeNeeded) {
          setCaptchaFallbackNeeded(true);
          setErrorMsg("Please complete the security checkbox challenge below.");
        } else {
          setErrorMsg(data.error || "Failed to send message. Please try again.");
        }
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        campus: "Nairobi Main Campus",
        subject: "Admissions Inquiry",
        message: "",
      });
    } catch (err: any) {
      setErrorMsg("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#172238] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Contact & Campus Locations</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 mt-4">
            Visit our campuses in Nairobi and Mombasa or submit an online inquiry.
            Our admissions and academic counselors are ready to guide you.
          </p>
        </div>

        {/* Campus Tabs: Nairobi vs Mombasa */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => {
              setSelectedCampus("nairobi");
              setFormData((prev) => ({ ...prev, campus: "Nairobi Main Campus" }));
            }}
            className={`px-6 py-3 text-xs sm:text-sm uppercase font-bold tracking-wider transition-all min-h-[48px] ${
              selectedCampus === "nairobi"
                ? "bg-[#f5a425] text-[#0c1228] shadow"
                : "bg-[#18233a] text-white hover:text-[#f5a425] border border-white/10"
            }`}
          >
            Nairobi Main Campus
          </button>
          <button
            onClick={() => {
              setSelectedCampus("mombasa");
              setFormData((prev) => ({ ...prev, campus: "Mombasa Coastal Campus" }));
            }}
            className={`px-6 py-3 text-xs sm:text-sm uppercase font-bold tracking-wider transition-all min-h-[48px] ${
              selectedCampus === "mombasa"
                ? "bg-[#f5a425] text-[#0c1228] shadow"
                : "bg-[#18233a] text-white hover:text-[#f5a425] border border-white/10"
            }`}
          >
            Mombasa Coastal Campus
          </button>
        </div>

        {/* Main 2-Column Grid: Form on Left, Campus Details & Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: General Enquiry Form */}
          <div className="lg:col-span-6 bg-[#18233a] border border-white/10 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold uppercase text-white">General Inquiry Form</h3>
                <p className="text-xs text-white/70 mt-0.5">
                  Send a direct message to Admissions or Academic Registrars
                </p>
              </div>

              {/* WhatsApp direct CTA beside form */}
              <a
                href="https://wa.me/254112272061?text=Hello!%20I%20would%20like%20to%20enquire%20about%20studying%20at%20Zion%20University."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-[#0c1228] text-xs font-bold uppercase tracking-wider rounded-none hover:bg-[#20b858] transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

            {submitted ? (
              <div className="bg-[#0c1228] border border-[#f5a425] p-6 text-center animate-in fade-in">
                <CheckCircle className="w-12 h-12 text-[#f5a425] mx-auto mb-3" />
                <h4 className="text-base font-bold uppercase text-white mb-2">Message Sent Successfully</h4>
                <p className="text-xs text-white/80 leading-relaxed mb-4">
                  Thank you for reaching out to Zion University. An admissions counselor has received your inquiry and will respond within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-zion text-xs font-bold uppercase tracking-wider px-6 py-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-950/80 border border-red-500 text-xs text-red-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Kamau"
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 700 000 000"
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-white"
                    >
                      <option value="Admissions Inquiry">Admissions Inquiry</option>
                      <option value="Course Entry Requirements">Course Entry Requirements</option>
                      <option value="Scholarship Application">Scholarship Application</option>
                      <option value="Hostel Accommodation">Hostel Accommodation</option>
                      <option value="Postgraduate & Research">Postgraduate & Research</option>
                      <option value="Corporate Training">Corporate Training</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your questions regarding intake dates, qualifications, or fee structures..."
                    className="w-full px-3.5 py-2.5 text-xs text-white"
                  />
                </div>

                {/* Visible reCAPTCHA v2 checkbox fallback if score was low */}
                {captchaFallbackNeeded && (
                  <div className="p-3 bg-white/5 border border-[#f5a425] flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="v2check"
                      checked={captchaV2Checked}
                      onChange={(e) => setCaptchaV2Checked(e.target.checked)}
                      className="w-4 h-4 accent-[#f5a425]"
                    />
                    <label htmlFor="v2check" className="text-xs text-white cursor-pointer">
                      I am not a robot (Security Verification)
                    </label>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-[10px] text-white/50">
                    Protected by Google invisible reCAPTCHA v3
                  </span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-zion w-full sm:w-auto text-xs uppercase tracking-wider px-7 py-3"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Campus Details & Google Maps Embed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Campus Info Card */}
            <div className="bg-[#18233a] border border-white/10 p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#f5a425]">
                  {selectedCampus === "nairobi" ? "Main Campus" : "Satellite Campus"}
                </span>
              </div>
              <h3 className="text-xl font-bold uppercase text-white mb-4">
                {activeInfo.name}
              </h3>

              <div className="space-y-3.5 text-xs text-white/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#f5a425] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Physical Address:</div>
                    <div>{activeInfo.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#f5a425] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Telephone / Admissions Desk:</div>
                    <div>{activeInfo.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#f5a425] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Email:</div>
                    <div className="text-[#f5a425] font-semibold">{activeInfo.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#f5a425] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Operating Hours:</div>
                    <div>{activeInfo.hours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-[#18233a] border border-white/10 h-72 w-full overflow-hidden shadow-xl">
              <iframe
                src={activeInfo.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title={`${activeInfo.name} Location Map`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
