import type { Metadata } from "next";
import { BlogContent } from "@/components/sections/blog-content";
import { buttonVariants } from "@/components/ui/button";
import { getBlogBySlug, getBlogs } from "@/lib/actions/blog";
import { siteConfig } from "@/lib/config/site";
import { cn, formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/sections/footer";

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
    <main className="mx-auto min-h-screen font-sans px-4 pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-gradient-to-b from-background to-transparent fixed top-0 left-0 h-10 w-full z-50 pointer-events-none" />

      <div className="mx-auto max-w-[70ch]">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 has-[>svg]:pl-2 gap-1 mb-8 text-neutral-400 hover:text-neutral-500",
          )}
        >
          <BackIcon />
          Back
        </Link>

        <h1 className="text-4xl text-foreground font-semibold mb-4">{blog.metadata.title}</h1>

        <span className="mb-8 inline-block text-muted-foreground">{formatDate(blog.metadata.date)}</span>

        <article className="prose prose-invert prose-headings:text-white prose-a:text-white hover:prose-a:underline">
          <BlogContent source={blog.content} />
        </article>
      </div>

      <Footer />

      <div className="bg-gradient-to-t from-background to-transparent fixed bottom-0 left-0 h-10 w-full z-50 pointer-events-none" />
    </main>
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
