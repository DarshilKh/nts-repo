import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { products } from "@/lib/catalog";
import { solutionPages } from "@/lib/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/solution", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    // One entry per product detail page. Generated from the catalog rather
    // than hand-listed so a new product can never ship unindexed.
    ...products.map((p) => ({
      path: `/products/${p.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    // One entry per solution that has a real page.
    ...solutionPages.map((s) => ({
      path: `/solution/${s.slug}`,
      priority: 0.85,
      changeFrequency: "monthly" as const,
    })),
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
