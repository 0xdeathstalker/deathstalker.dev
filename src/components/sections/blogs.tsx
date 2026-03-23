import Link from "next/link";
import { LinkArrowIcon } from "@/components/link-arrow-icon";
import { getBlogs } from "@/lib/actions/blog";
import { SectionHeading } from "@/components/ui/heading";

// sorting by date - latest blogs
const blogs = getBlogs().sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

export function Blogs() {
  return (
    <section id="blogs">
      <SectionHeading className="px-4">writings</SectionHeading>

      <div className="space-y-4 py-6">
        {blogs.map((blog) => (
          <BlogItem
            key={blog.slug}
            slug={blog.slug}
            title={blog.metadata.title}
            date={blog.metadata.date}
          />
        ))}
      </div>
    </section>
  );
}

function BlogItem({ slug, title, date }: { slug: string; title: string; date: string }) {
  const formattedDate = new Date(date)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toLowerCase();

  return (
    <div className="flex items-center justify-between px-4">
      <div className="w-fit relative inline-flex items-center gap-1 link overflow-x-hidden">
        <div className="relative overflow-x-hidden">
          <Link
            href={`/blog/${slug}`}
            className="text-lg text-nowrap before:content-[''] before:-z-10 before:absolute before:bottom-0.5 before:w-0 before:h-px before:bg-mauve-900 before:transition-all before:ease-circ-in-out hover:before:w-full"
          >
            {title.toLowerCase()}
          </Link>
          <div className="sm:hidden absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent" />
        </div>

        <LinkArrowIcon className="size-5" />
      </div>

      <span className="font-mono text-sm tracking-tighter hidden sm:inline text-mauve-500">{formattedDate}</span>
    </div>
  );
}
