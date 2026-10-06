import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { newsArticles } from "@/lib/data";

export const metadata = {
  title: "University News & Press Announcements | Zion University Kenya",
  description:
    "Latest academic milestones, research discoveries, international grants, and campus highlights from Zion University.",
};

export default function NewsIndexPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#f5a425]">News & Media</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#162239] border border-white/10 p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl z-10 relative">
            <span className="text-xs font-black uppercase tracking-widest text-[#f5a425]">
              Zion Press Directorate
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4">
              News & Media Releases
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Discover official stories, academic triumphs, research grants, and student achievements from our campuses in Nairobi and Mombasa.
            </p>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-[#18233a] border border-white/10 hover:border-[#f5a425] flex flex-col justify-between overflow-hidden group shadow-xl transition-all"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-[#0c1228]">
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

                  <h2 className="text-lg font-bold text-white group-hover:text-[#f5a425] transition-colors line-clamp-2 leading-snug mb-3">
                    {article.title}
                  </h2>

                  <p className="text-xs text-white/70 line-clamp-3 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/news/${article.slug}`}
                  className="btn-zion-outline group-hover:bg-[#f5a425] group-hover:text-[#0c1228] w-full justify-between text-xs font-bold uppercase tracking-wider py-2.5"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
