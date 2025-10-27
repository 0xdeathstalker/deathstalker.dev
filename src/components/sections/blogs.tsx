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
        className="group text-foreground text-lg relative hover:text-background before:content-[''] before:-z-10 before:absolute before:bottom-1 before:w-0 before:h-[calc(theme(fontSize.lg)*theme(lineHeight.tight))] dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)] hover:before:w-full"
      >
        {title.toLowerCase()}
      </Link>
      <span className="hidden sm:inline text-muted-foreground">{formattedDate}</span>
    </div>
  );
}
