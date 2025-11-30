import Link from "next/link";
import { getBlogs } from "@/lib/actions/blog";
import { Line } from "../ui/line";

// sorting by date - latest blogs
const blogs = getBlogs().sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

export function Blogs() {
  return (
    <section
      id="blogs"
      className="relative px-4 max-[690px]:px-8"
    >
      <div className="relative">
        <Line
          orientation="horizontal"
          variant="contained"
          position="top"
          color="text-muted-foreground/25 dark:text-muted-foreground/20"
          className="max-w-[650px]"
        />

        <h1 className="text-3xl py-4 text-shadow-sm dark:shadow-black/65 font-medium group w-fit">writings </h1>

        <Line
          orientation="horizontal"
          variant="contained"
          position="bottom"
          color="text-muted-foreground/25 dark:text-muted-foreground/20"
          className="max-w-[650px]"
        />
      </div>
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

      <Line
        orientation="horizontal"
        variant="contained"
        position="bottom"
        className="max-w-[650px]"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />
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
        className="group text-foreground text-lg relative before:content-[''] before:-z-10 before:absolute before:bottom-0.5 before:w-0 before:h-[1px] dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)] hover:before:w-full"
      >
        {title.toLowerCase()}
      </Link>
      <span className="hidden sm:inline text-muted-foreground">{formattedDate}</span>
    </div>
  );
}
