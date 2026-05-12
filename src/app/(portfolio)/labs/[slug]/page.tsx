import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/back-button";
import { LabNavigation } from "@/components/labs/lab-navigation";
import { QuoteTime } from "@/components/sections/quote-time";
import { CornerDiamondShapes } from "@/components/ui/corner-shapes";
import { Line } from "@/components/ui/line";
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
  const url = `${siteConfig.url}/labs/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/labs/${slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
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
      images: [siteConfig.ogImage],
      creator: siteConfig.author.twitter,
    },
  };
}

export default async function LabPage({ params }: PageProps) {
  const slug = (await params).slug;
  const currentIndex = labs.findIndex((l) => l.slug === slug);
  const component = labs[currentIndex];

  if (!component) {
    notFound();
  }

  const prevSlug = labs[currentIndex + 1]?.slug ?? null;
  const nextSlug = labs[currentIndex - 1]?.slug ?? null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: component.title,
    description: component.subHeading,
    url: `${siteConfig.url}/labs/${slug}`,
    image: siteConfig.ogImage,
    creator: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    keywords: component.tech,
  };

  return (
    <div className="pt-18 min-[840px]:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-[840px]:hidden px-4 pb-4 flex items-center justify-between">
        <BackButton href="/labs">labs</BackButton>

        <LabNavigation
          prevSlug={prevSlug}
          nextSlug={nextSlug}
        />
      </div>

      <Title
        title={component?.title}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />

      <div className="py-6 px-4">
        <p className="mt-1 mb-6 text-sm text-muted-foreground">{component?.subHeading}</p>

        <div className="relative min-h-[420px] grid place-items-center border border-mauve-200 rounded-xl p-2 overflow-hidden last:mb-4">
          {component?.component && <component.component />}
        </div>

        <div className="space-y-6 mt-10 text-sm [&>*:last-child]:mb-4">{component?.description}</div>
      </div>

      <QuoteTime />
    </div>
  );
}

function Title({
  title,
  prevSlug,
  nextSlug,
}: {
  title: string | undefined;
  prevSlug: string | null;
  nextSlug: string | null;
}) {
  return (
    <div className="relative p-4">
      <div className="absolute right-full top-1/2 -translate-y-1/2 pr-4 hidden min-[840px]:flex">
        <BackButton href="/labs">labs</BackButton>
      </div>

      <h1 className="font-pixel-square text-3xl md:text-4xl text-mauve-700 font-semibold tracking-tight sm:tracking-wide">
        {title}
      </h1>

      <div className="absolute left-full top-1/2 -translate-y-1/2 pl-4 hidden min-[840px]:flex">
        <LabNavigation
          prevSlug={prevSlug}
          nextSlug={nextSlug}
        />
      </div>

      <Line
        orientation="horizontal"
        position="top"
        color="text-mauve-500/65"
      />
      <Line
        orientation="horizontal"
        position="bottom"
        color="text-mauve-500/65"
      />

      <CornerDiamondShapes />
    </div>
  );
}
