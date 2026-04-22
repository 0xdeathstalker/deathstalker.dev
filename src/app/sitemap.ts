import type { MetadataRoute } from "next";
import { getBlogs } from "@/lib/actions/blog";
import { labs } from "@/lib/config/labs-data";
import { siteConfig } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getBlogs();

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${siteConfig.url}/blog/${blog.slug}`,
    lastModified: new Date(blog.metadata.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const currentDate = new Date();

  const labUrls: MetadataRoute.Sitemap = labs.flatMap((lab) => [
    {
      url: `${siteConfig.url}/labs/${lab.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]);

  return [
    {
      url: siteConfig.url,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/labs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
    ...labUrls,
  ];
}
