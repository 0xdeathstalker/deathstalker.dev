import { BackButton } from "@/components/back-button";
import { BlogContent } from "@/components/sections/blog-content";
import { QuoteTime } from "@/components/sections/quote-time";
import { CornerDiamondShapes } from "@/components/ui/corner-shapes";
import { Line } from "@/components/ui/line";
import { getBlogBySlug, getBlogs } from "@/lib/actions/blog";
import { siteConfig } from "@/lib/config/site";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {};
  }

  const { title, description, date } = blog.metadata;
  const ogUrl = `${siteConfig.url}/blog/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      url: ogUrl,
      authors: [siteConfig.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.author.twitter,
    },
  };
}

export default async function Blog({ params }: PageProps) {
  const slug = (await params).slug;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.metadata.title,
    description: blog.metadata.description,
    datePublished: blog.metadata.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blog/${slug}`,
  };

  return (
    <div className="pt-18 min-[840px]:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-[840px]:hidden px-4 pb-3">
        <BackButton />
      </div>

      <Title title={blog.metadata.title} />

      <div className="py-6 px-4">
        <span className="mb-8 inline-block font-mono tracking-tight text-sm text-mauve-400">
          {formatDate(blog.metadata.date)}
        </span>

        <article className="prose prose-invert prose-headings:text-white prose-a:text-white hover:prose-a:underline">
          <BlogContent source={blog.content} />
        </article>
      </div>

      <QuoteTime />
    </div>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div className="relative p-4">
      <CornerDiamondShapes />

      <div className="absolute right-full top-1/2 -translate-y-1/2 pr-3 hidden min-[840px]:flex">
        <BackButton />
      </div>

      <h1 className="font-pixel-square text-[28px] md:text-4xl text-mauve-700 font-semibold tracking-tight sm:tracking-wide">
        {title}
      </h1>

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
    </div>
  );
}
