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
          className={cn(buttonVariants({ variant: "outline" }), "h-7 has-[>svg]:pl-1 gap-1 mb-8 text-muted-foreground")}
        >
          <ChevronLeft className="size-4" />
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
