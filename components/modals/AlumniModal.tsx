"use client";

import React, { useState } from "react";
import { X, Award, CheckCircle, GraduationCap } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlumniModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gradYear: "2020",
    programme: "Bachelor of Business Administration",
    company: "",
    jobTitle: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
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
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black uppercase text-white">
              Zion Alumni Network Registration
            </h3>
            <p className="text-xs text-white/70">
              Connect with over 50,000 graduates worldwide
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-6 animate-in fade-in">
            <CheckCircle className="w-14 h-14 text-[#f5a425] mx-auto mb-3" />
            <h4 className="text-base font-bold uppercase text-white mb-2">
              Welcome to the Zion Alumni Community!
            </h4>
            <p className="text-xs text-white/80 leading-relaxed mb-6">
              Your details have been verified and added to the official Global Alumni Registry. You will receive invitations to annual reunions, mentorship summits, and diaspora events.
            </p>
            <button
              onClick={onClose}
              className="btn-zion w-full justify-center text-xs uppercase font-bold py-3"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. David Mutiso"
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
                  placeholder="david@example.com"
                  className="w-full px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                  Phone (WhatsApp) *
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
                  Graduation Year *
                </label>
                <input
                  type="number"
                  required
                  min="1995"
                  max="2026"
                  value={formData.gradYear}
                  onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                  Degree / Programme
                </label>
                <input
                  type="text"
                  required
                  value={formData.programme}
                  onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                  placeholder="e.g. B.Sc. Computer Science"
                  className="w-full px-3.5 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                  Current Employer / Business
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Safaricom PLC"
                  className="w-full px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                  Current Job Title
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="e.g. Senior Software Architect"
                  className="w-full px-3.5 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-zion w-full justify-center text-xs uppercase font-bold py-3.5 shadow-gold mt-2"
            >
              <Award className="w-4 h-4" />
              <span>{loading ? "Registering..." : "Submit Alumni Profile"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
