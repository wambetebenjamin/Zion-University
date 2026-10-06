import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react";
import { newsArticles } from "@/lib/data";

export const revalidate = 600; // ISR 10 minutes

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found | Zion University" };

  return {
    title: `${article.title} | Zion University News`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: [{ url: article.image }],
    },
  };
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((a) => a.slug === params.slug);
  if (!article) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 bg-[#0c1228] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f5a425]">
            Home
          </Link>
          <span>/</span>
          <Link href="/news" className="hover:text-[#f5a425]">
            News
          </Link>
          <span>/</span>
          <span className="text-[#f5a425] line-clamp-1">{article.title}</span>
        </div>

        {/* Back Link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f5a425] hover:text-[#ffb834] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All News</span>
        </Link>

        {/* Main Article Container */}
        <article className="bg-[#18233a] border border-white/10 p-6 sm:p-10 shadow-2xl">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 mb-4 pb-4 border-b border-white/10">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-[#f5a425] text-[#0c1228]">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#f5a425]" />
              {article.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#f5a425]" />
              {article.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#f5a425]" />
              {article.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white leading-tight mb-6">
            {article.title}
          </h1>

          {/* Hero Article Image */}
          <div className="relative h-72 sm:h-96 w-full mb-8 bg-[#0c1228] overflow-hidden shadow-xl border border-white/10">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>

          {/* Article Summary Lead */}
          <div className="p-4 bg-[#162239] border-l-4 border-[#f5a425] text-sm sm:text-base text-white/90 font-medium mb-8 leading-relaxed">
            {article.summary}
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-5 text-sm sm:text-base text-white/80 leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5 text-[#f5a425]" />
              Tags:
            </span>
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 text-[#f5a425]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
