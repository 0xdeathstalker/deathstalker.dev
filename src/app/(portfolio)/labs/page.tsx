import type { Metadata } from "next";
import { BackButton } from "@/components/ui/back-button";
import { ScrollGradients } from "@/components/ui/scroll-gradients";
import { LabItem } from "@/components/sections/lab-item";
import { QuoteTime } from "@/components/sections/quote-time";
import { CornerDiamondShapes } from "@/components/ui/corner-shapes";
import { Line } from "@/components/ui/line";
import { labs } from "@/lib/config/labs-data";
import { siteConfig } from "@/lib/config/site";

const title = "labs";
const description = "a creative space for ui experiments, component studies and exploration.";

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

export const metadata: Metadata = {
  title: "labs",
  description:
    "UI experiments, component studies and interaction explorations built with React, Next.js and TypeScript.",
  alternates: {
    canonical: "/labs",
  },
  openGraph: {
    title: "Labs",
    description:
      "UI experiments, component studies and interaction explorations built with React, Next.js and TypeScript.",
    url: `${siteConfig.url}/labs`,
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Labs",
    description:
      "UI experiments, component studies and interaction explorations built with React, Next.js and TypeScript.",
    images: [ogImage],
    creator: siteConfig.author.twitter,
  },
};

export default function LabsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Labs",
        url: `${siteConfig.url}/labs`,
        description:
          "UI experiments, component studies and interaction explorations built with React, Next.js and TypeScript.",
      },
      {
        "@type": "ItemList",
        itemListElement: [...labs].reverse().map((lab, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: lab.title,
          url: `${siteConfig.url}/labs/${lab.slug}`,
        })),
      },
    ],
  };

  return (
    <div className="relative pt-18 min-[840px]:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScrollGradients />

      <div className="min-[840px]:hidden px-4 pb-4 flex items-center justify-between">
        <BackButton href="/">home</BackButton>
      </div>

      <section>
        <div className="relative p-4">
          <div className="absolute right-full top-1/2 -translate-y-1/2 pr-4 hidden min-[840px]:flex">
            <BackButton href="/">home</BackButton>
          </div>

          <CornerDiamondShapes />

          <Line
            orientation="horizontal"
            position="top"
            color="text-mauve-500/65"
          />

          <h1 className="font-pixel-square text-3xl md:text-4xl text-mauve-700 font-semibold tracking-tight sm:tracking-wide">
            labs
          </h1>

          <Line
            orientation="horizontal"
            position="bottom"
            color="text-mauve-500/65"
          />
        </div>

        <div className="relative p-4 text-sm">
          <p>
            this is a creative space for ui experiments, component studies and exploration. i often recreate components
            to better understand how they work.
          </p>

          <Line
            orientation="horizontal"
            variant="contained"
            position="bottom"
            color="text-mauve-500/65"
          />
        </div>
      </section>

      <section className="space-y-4 py-4">
        {[...labs].reverse().map(({ component: _, ...lab }, idx) => {
          const isLast = idx !== labs.length - 1;

          return (
            <LabItem
              key={`${lab.title}-${idx}`}
              lab={lab}
              isLast={isLast}
            />
          );
        })}
      </section>

      <QuoteTime />
    </div>
  );
}
