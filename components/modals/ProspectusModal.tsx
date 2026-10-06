"use client";

import React, { useState } from "react";
import { X, Download, CheckCircle, BookOpen, AlertTriangle } from "lucide-react";
import { faculties } from "@/lib/data";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProspectusModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    programmeInterest: "School of Business and Economics",
    level: "Undergraduate",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          programmeInterest: `${formData.programmeInterest} (${formData.level})`,
          type: "prospectus_download",
          captchaToken: "mock-recaptcha-token",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to process prospectus request");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-[#172238] border border-[#f5a425]/50 w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
          <div className="p-2.5 bg-[#f5a425] text-[#0c1228] shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase text-white">
              Download Academic Prospectus 2026/2027
            </h3>
            <p className="text-xs text-white/70">
              Get complete curriculum outlines, entry requirements, and fee schedules
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-6 animate-in fade-in">
            <CheckCircle className="w-14 h-14 text-[#f5a425] mx-auto mb-3" />
            <h4 className="text-base font-bold uppercase text-white mb-2">
              Prospectus Ready for Download!
            </h4>
            <p className="text-xs text-white/80 leading-relaxed mb-6">
              A copy of the complete 2026/2027 Prospectus & Course Guide has been emailed to{" "}
              <span className="text-[#f5a425] font-bold">{formData.email}</span>. You can also download it directly below:
            </p>

            <a
              href="/downloads/zion-university-prospectus-2026.pdf"
              download="Zion-University-Prospectus-2026.pdf"
              onClick={() => {
                setTimeout(onClose, 1500);
              }}
              className="btn-zion w-full justify-center text-xs uppercase font-bold py-3.5 mb-3"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF (14 MB)</span>
            </a>

            <button
              onClick={onClose}
              className="text-xs text-white/60 hover:text-white underline mt-2"
            >
              Close Window
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

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Samuel Mutua"
                className="w-full px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="samuel@example.com"
                  className="w-full px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                  Phone Number (WhatsApp) *
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                  Faculty of Interest
                </label>
                <select
                  value={formData.programmeInterest}
                  onChange={(e) => setFormData({ ...formData, programmeInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs text-white"
                >
                  {faculties.map((f) => (
                    <option key={f.slug} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                  Study Level
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs text-white"
                >
                  <option value="Undergraduate">Undergraduate Degree</option>
                  <option value="Postgraduate">Postgraduate / Master's</option>
                  <option value="Diploma">Diploma Programme</option>
                  <option value="Certificate">Certificate / Foundation</option>
                </select>
              </div>
            </div>

            <p className="text-[11px] text-white/60 leading-relaxed pt-1">
              By requesting the prospectus, you agree to receive official academic announcements from Zion University in compliance with the Kenya Data Protection Act 2019.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="btn-zion w-full justify-center text-xs uppercase font-bold py-3.5 shadow-gold"
            >
              <Download className="w-4 h-4" />
              <span>{loading ? "Generating Download Link..." : "Download Official Prospectus"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
