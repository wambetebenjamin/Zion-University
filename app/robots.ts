import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/portal/api/", "/api/"],
    },
    sitemap: "https://zion.ac.ke/sitemap.xml",
  };
}
