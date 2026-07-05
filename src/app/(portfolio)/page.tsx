import type { Metadata } from "next";
import { Blogs } from "@/components/sections/blogs";
import { Certifications } from "@/components/sections/certifications";
import { Hero } from "@/components/sections/hero";
import { Labs } from "@/components/sections/labs";
import { Projects } from "@/components/sections/projects";
import { QuoteTime } from "@/components/sections/quote-time";
import { Work } from "@/components/sections/work";
import { PatternSeparator } from "@/components/ui/pattern-separator";
import { siteConfig } from "@/lib/config/site";

const title = "soumya";
const description = "software developer working at flipkart.";

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

export const metadata: Metadata = {
  title: {
    absolute: "deathstalker",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Soumya Mukherjee | Frontend Engineer",
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soumya Mukherjee | Frontend Engineer",
    description: siteConfig.description,
    images: [ogImage],
    site: siteConfig.author.twitter,
    creator: siteConfig.author.twitter,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
      },
      {
        "@type": "WebPage",
        name: "Soumya Mukherjee | Frontend Engineer",
        url: siteConfig.url,
        description: siteConfig.description,
        isPartOf: {
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        about: {
          "@type": "Person",
          name: siteConfig.author.name,
          url: siteConfig.url,
        },
      },
    ],
  };

  return (
    <div className="relative pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <PatternSeparator />

      <Work />
      <PatternSeparator />

      <Projects />
      <PatternSeparator />

      <Labs />
      <PatternSeparator />

      <Certifications />
      <PatternSeparator />

      <Blogs />
      <PatternSeparator />

      <QuoteTime />
    </div>
  );
}
