"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { newsArticles, upcomingEvents } from "@/lib/data";

export default function NewsEventsSection() {
  return (
    <section id="news-events" className="py-20 md:py-28 bg-[#172238] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Latest News & University Events</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 mt-4">
            Stay informed with the latest research discoveries, academic celebrations,
            and public conferences taking place across Zion University.
          </p>
        </div>

        {/* 3 Latest News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {newsArticles.slice(0, 3).map((article) => (
            <article
              key={article.slug}
              className="bg-[#18233a] border border-white/10 hover:border-[#f5a425] flex flex-col justify-between overflow-hidden group shadow-xl transition-all"
            >
              <div>
                {/* News Image */}
                <div className="relative h-52 w-full overflow-hidden bg-[#0c1228]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#0c1228]/90 text-[#f5a425] border border-[#f5a425]/50 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>

                {/* News Details */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[11px] text-white/60 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#f5a425]" />
                      {article.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#f5a425]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#f5a425] transition-colors line-clamp-2 leading-snug mb-3">
                    {article.title}
                  </h3>

                  <p className="text-xs text-white/70 line-clamp-3 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Read Full Article Button */}
              <div className="p-6 pt-0">
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f5a425] hover:text-[#ffb834]"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Upcoming Events Calendar Strip */}
        <div className="bg-[#162239] border border-white/10 p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#f5a425]">
                University Calendar
              </span>
              <h3 className="text-xl font-bold uppercase text-white mt-0.5">
                Upcoming Public Events & Symposia
              </h3>
            </div>
            <Link
              href="/events"
              className="btn-zion-outline text-xs font-bold uppercase tracking-wider px-4 py-2"
            >
              View Full Calendar
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.slug}
                className="bg-[#18233a] border border-white/10 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#f5a425] transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Date badge */}
                  <div className="bg-[#0c1228] border border-[#f5a425]/40 text-center px-4 py-3 shrink-0 min-w-[70px]">
                    <div className="text-xs font-extrabold uppercase text-[#f5a425]">
                      {new Date(evt.date).toLocaleDateString("en-US", { month: "short" })}
                    </div>
                    <div className="text-xl font-black text-white">
                      {new Date(evt.date).getDate()}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#f5a425]/20 text-[#f5a425]">
                        {evt.category}
                      </span>
                      <span className="text-xs text-white/60 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#f5a425]" />
                        {evt.time}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#f5a425] transition-colors">
                      {evt.title}
                    </h4>

                    <div className="text-xs text-white/70 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#f5a425]" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <Link
                    href={`/events/${evt.slug}`}
                    className="btn-zion text-xs font-bold uppercase tracking-wider px-5 py-2.5 w-full md:w-auto text-center"
                  >
                    <span>Register Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
