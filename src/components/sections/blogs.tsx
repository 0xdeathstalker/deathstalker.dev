import Link from "next/link";
import { getBlogs } from "@/lib/actions/blog";

// sorting by date - latest blogs
const blogs = getBlogs().sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="py-10"
    >
      <h1 className="text-3xl font-medium mb-8 group w-fit">writings</h1>
      <div className="space-y-4">
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
      <Link
        href={`/blog/${slug}`}
        className="relative group hover:text-background text-foreground text-lg"
      >
        {title.toLowerCase()}
        <div className="-z-10 absolute bottom-1 w-0 h-[calc(theme(fontSize.lg)*theme(lineHeight.tight))] group-hover:w-full dark:bg-neutral-100 bg-neutral-900 transition-all ease-[cubic-bezier(0.785,0.135,0.15,0.86)]" />
      </Link>
      <span className="hidden sm:inline text-muted-foreground">{formattedDate}</span>
    </div>
  );
}
