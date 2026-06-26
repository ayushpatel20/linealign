import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/pricing/payment/",
    },
    sitemap: "https://linealign.com/sitemap.xml",
  };
}
