"use client";

import LinkIcon from "@/components/link-icon";
import { works } from "@/lib/config/site-data";
import type { Work as WorkType } from "@/lib/types";
import Link from "next/link";

export default function Work() {
  return (
    <section id="work" className="py-10">
      <h1 className="text-3xl font-medium mb-8 group w-fit">
        places i've been{" "}
      </h1>
      <div className="space-y-12">
        {works.map((work, index) => (
          <WorkItem
            // biome-ignore lint/suspicious/noArrayIndexKey: no other variable to use as key
            key={index}
            work={work}
          />
        ))}
      </div>
    </section>
  );
}

function WorkItem({ work }: { work: WorkType }) {
  return (
    <div className="space-y-3 text-muted-foreground">
      <div className="w-fit relative inline-flex items-center gap-1 link">
        <Link
          href={work.href}
          target="_blank"
          className="group text-foreground text-lg relative hover:text-background before:content-[''] before:-z-10 before:absolute before:bottom-1 before:w-0 before:h-[calc(theme(fontSize.lg)*theme(lineHeight.tight))] dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)] hover:before:w-full"
        >
          {work.company}
        </Link>

        <LinkIcon />
      </div>

      <h2 className="dark:text-neutral-300 text-neutral-700 text-sm sm:text-base">
        {work.role} {work.period && `(${work.period})`}
      </h2>
      <div className="text-sm">
        {work.description.map((d, i) => (
          <p
            // biome-ignore lint/suspicious/noArrayIndexKey: no other variable to use as key
            key={i}
            className="inline mx-0.5"
          >
            {d}
          </p>
        ))}
      </div>
    </div>
  );
}
