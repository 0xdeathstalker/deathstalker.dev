import type { Metadata } from "next";
import { BatterySprite, FireEyeSprite, JonSnowSprite, RainSprite } from "@/components/labs/components/sprites";
import { labs } from "@/lib/config/labs-data";
import { siteConfig } from "@/lib/config/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return labs.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const lab = labs.find((entry) => entry.slug === slug);

  if (!lab) {
    return {};
  }

  const title = `${lab.title}`;
  const description = lab.subHeading;
  const url = `${siteConfig.url}/playground/${slug}`;
  const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/playground/${slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: siteConfig.author.twitter,
      creator: siteConfig.author.twitter,
    },
  };
}

export default async function Playground({ params }: PageProps) {
  const { slug } = await params;
  const lab = labs.find((l) => l.slug === slug);

  if (!lab?.component) return null;

  return (
    <main className="min-h-screen w-full font-sans flex items-center justify-center">
      <lab.component />
    </main>
  );
}
