import type { Metadata } from "next";
import { BlogContent } from "@/components/sections/blog-content";
import { buttonVariants } from "@/components/ui/button";
import { getBlogBySlug, getBlogs } from "@/lib/actions/blog";
import { siteConfig } from "@/lib/config/site";
import { cn, formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/footer";
import { ScrollGradients } from "@/components/scroll-gradients";
import { Line } from "@/components/ui/line";
import { QuoteTime } from "@/components/sections/quote-time";
import { CornerBorder } from "@/components/ui/corner-border";

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
    <main className="relative min-h-screen w-full font-sans overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollGradients />

      <VerticalLines />

      <div className="pt-18 min-[840px]:pt-28 mx-auto max-w-[650px] max-[690px]:mx-4">
        <div className="min-[840px]:hidden px-4 pb-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 has-[>svg]:pl-2 gap-1 text-xs text-mauve-400 hover:text-mauve-500",
            )}
          >
            <BackIcon />
            Back
          </Link>
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

      <Footer />
    </main>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div className="relative p-4">
      <CornerBorder />

      <div className="absolute right-full top-1/2 -translate-y-1/2 pr-3 hidden min-[840px]:flex">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 has-[>svg]:pl-2 gap-1 text-xs text-mauve-400 hover:text-mauve-500",
          )}
        >
          <BackIcon />
          Back
        </Link>
      </div>

      <h1 className="text-2xl md:text-4xl text-foreground font-semibold">{title}</h1>

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

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      className="size-3.5 shrink-0 select-none"
    >
      <path
        d="M10.2069 4H12.4828C13.3203 4 14 4.67972 14 5.51724V10.4483C14 11.2858 13.3203 11.9655 12.4828 11.9655H3M3 11.9655L6.03448 8.93103M3 11.9655L6.03448 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      ></path>
    </svg>
  );
}

function VerticalLines() {
  return (
    <div className="absolute inset-0 max-w-[650px] max-[690px]:mx-4 mx-auto pointer-events-none">
      <Line
        orientation="vertical"
        position="left"
        color="text-mauve-500/65"
      />
      <Line
        orientation="vertical"
        position="right"
        color="text-mauve-500/65"
      />
    </div>
  );
}
