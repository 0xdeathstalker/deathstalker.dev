import Link from "next/link";
import LinkIcon from "@/components/link-icon";
import { Line } from "@/components/ui/line";
import { getBlogs } from "@/lib/actions/blog";
import { SectionHeading } from "../ui/heading";

// sorting by date - latest blogs
const blogs = getBlogs().sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

export function Blogs() {
  return (
    <section
      id="blogs"
      className="relative px-4 max-[690px]:px-8"
    >
      <SectionHeading>writings</SectionHeading>

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
    <div className="flex items-center justify-between">
      <div className="w-fit relative inline-flex items-center gap-1 link overflow-x-hidden">
        <div className="relative overflow-x-hidden">
          <Link
            href={`/blog/${slug}`}
            className="text-lg text-nowrap before:content-[''] before:-z-10 before:absolute before:bottom-0.5 before:w-0 before:h-[1px] dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)] hover:before:w-full"
          >
            {title.toLowerCase()}
          </Link>
          <div className="sm:hidden absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent" />
        </div>

        <LinkIcon className="size-5" />
      </div>

      <span className="hidden sm:inline text-muted-foreground">{formattedDate}</span>
    </div>
  );
}
