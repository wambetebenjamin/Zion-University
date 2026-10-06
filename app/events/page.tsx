import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, ArrowRight, Users } from "lucide-react";
import { upcomingEvents } from "@/lib/data";

export const metadata = {
  title: "University Events & Public Symposia | Zion University Kenya",
  description:
    "Join academic conferences, research symposia, campus open days, and commencement ceremonies at Zion University.",
};

export default function EventsIndexPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">University Events</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#162239] border border-white/10 p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl z-10 relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#f5a425]">
              Public Calendar
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4">
              Upcoming Events & Symposia
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Register free for public lectures, research symposiums, open days, and commencement celebrations across our Nairobi and Mombasa campuses.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div
              key={event.slug}
              className="bg-[#18233a] border border-white/10 hover:border-[#f5a425] flex flex-col justify-between overflow-hidden group shadow-xl transition-all"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-[#0c1228]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#0c1228]/90 text-[#f5a425] border border-[#f5a425]/50 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                    {event.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-white/70 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#f5a425]" />
                    <span>{event.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-[#f5a425]" />
                    <span>{event.time}</span>
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-[#f5a425] transition-colors mb-2">
                    {event.title}
                  </h2>

                  <div className="flex items-start gap-1.5 text-xs text-white/70 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#f5a425] shrink-0 mt-0.5" />
                    <span>{event.venue}</span>
                  </div>

                  <p className="text-xs text-white/80 line-clamp-3 leading-relaxed mb-4">
                    {event.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/events/${event.slug}`}
                  className="btn-zion w-full justify-between text-xs font-bold uppercase tracking-wider py-2.5"
                >
                  <span>Register Free Attendee</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
