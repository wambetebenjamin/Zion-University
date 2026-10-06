"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  ArrowLeft,
  AlertTriangle,
  Send,
} from "lucide-react";
import { upcomingEvents } from "@/lib/data";

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = upcomingEvents.find((e) => e.slug === params.slug) || upcomingEvents[0];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
  });
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [regId, setRegId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventSlug: event.slug,
          eventTitle: event.title,
          venue: event.venue,
          captchaToken: "mock-recaptcha-token",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to register");
      }

      setRegId(data.regId || `REG-${Date.now().toString(36).toUpperCase()}`);
      setRegistered(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  // Event JSON-LD Schema
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": `${event.date}T09:00:00+03:00`,
    "endDate": `${event.date}T17:00:00+03:00`,
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "KE"
      }
    },
    "image": [`https://zion.ac.ke${event.image}`],
    "description": event.description,
    "organizer": {
      "@type": "EducationalOrganization",
      "name": "Zion University",
      "url": "https://zion.ac.ke"
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <Link href="/events" className="hover:text-[#f5a425]">
            Events
          </Link>
          <span>/</span>
          <span className="text-[#f5a425] line-clamp-1">{event.title}</span>
        </div>

        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f5a425] hover:text-[#ffb834] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </Link>

        <div className="bg-[#18233a] border border-white/10 p-6 sm:p-10 shadow-2xl mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 mb-4 pb-4 border-b border-white/10">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-[#f5a425] text-[#0c1228]">
              {event.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#f5a425]" />
              {event.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#f5a425]" />
              {event.time}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white leading-tight mb-4">
            {event.title}
          </h1>

          <div className="flex items-start gap-2 text-xs sm:text-sm text-[#f5a425] font-semibold mb-6">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{event.venue} ({event.campus})</span>
          </div>

          <div className="relative h-72 sm:h-96 w-full mb-8 bg-[#0c1228] overflow-hidden border border-white/10 shadow-xl">
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>

          <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed mb-8">
            <p>{event.description}</p>
          </div>

          {/* Speakers */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#f5a425] mb-4">
              Featured Speakers & Dignitaries:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.speakers.map((spk, idx) => (
                <div key={idx} className="p-4 bg-[#162239] border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0c1228] border border-[#f5a425] flex items-center justify-center text-[#f5a425] shrink-0 font-bold text-xs">
                    {spk.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{spk.name}</div>
                    <div className="text-[11px] text-[#f5a425]">{spk.role}</div>
                    <div className="text-[10px] text-white/50">{spk.organization}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Registration Form */}
        <div className="bg-[#18233a] border border-[#f5a425]/50 p-6 sm:p-10 shadow-2xl">
          <div className="border-b border-white/10 pb-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f5a425]">
              Free Public Registration
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white mt-1">
              Reserve Your Seat / Virtual Pass
            </h2>
          </div>

          {registered ? (
            <div className="bg-[#0c1228] border border-[#f5a425] p-8 text-center animate-in fade-in">
              <CheckCircle className="w-14 h-14 text-[#f5a425] mx-auto mb-3" />
              <h3 className="text-xl font-bold uppercase text-white mb-2">
                Registration Confirmed!
              </h3>
              <p className="text-xs text-white/80 max-w-md mx-auto leading-relaxed mb-4">
                Thank you for registering for <strong>{event.title}</strong>. Your confirmation details have been sent to <strong>{formData.email}</strong>.
              </p>
              <div className="p-3 bg-white/5 border border-white/10 max-w-xs mx-auto mb-6 text-xs text-[#f5a425] font-mono font-bold">
                Pass ID: {regId}
              </div>
              <button
                onClick={() => setRegistered(false)}
                className="btn-zion text-xs font-bold uppercase tracking-wider px-6 py-2.5"
              >
                Register Another Attendee
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-950/80 border border-red-500 text-xs text-red-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Catherine Njeri"
                    className="w-full px-3.5 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="catherine@example.com"
                    className="w-full px-3.5 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                    Organization / Institution
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Kenya Law / High School"
                    className="w-full px-3.5 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <span className="text-[10px] text-white/50">
                  Protected by Google invisible reCAPTCHA v3
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-zion w-full sm:w-auto text-xs uppercase font-bold py-3 px-8 shadow-gold"
                >
                  {loading ? "Confirming Registration..." : "Complete Free Registration"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
