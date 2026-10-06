import { MetadataRoute } from "next";
import { faculties, researchCentres, newsArticles, upcomingEvents } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zion.ac.ke";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/admissions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/apply`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/faculties`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/campus-life`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/legal/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/legal/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/legal/cookie-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  // Dynamic Faculty Slugs
  const facultyRoutes: MetadataRoute.Sitemap = faculties.map((f) => ({
    url: `${baseUrl}/faculties/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic Research Slugs
  const researchRoutes: MetadataRoute.Sitemap = researchCentres.map((r) => ({
    url: `${baseUrl}/research/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Dynamic News Slugs
  const newsRoutes: MetadataRoute.Sitemap = newsArticles.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic Event Slugs
  const eventRoutes: MetadataRoute.Sitemap = upcomingEvents.map((e) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...facultyRoutes,
    ...researchRoutes,
    ...newsRoutes,
    ...eventRoutes,
  ];
}
