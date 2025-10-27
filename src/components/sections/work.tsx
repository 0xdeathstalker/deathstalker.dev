"use client";

import { ChevronRight } from "lucide-react";
import * as React from "react";
import { works } from "@/lib/config/site-data";
import type { Work as WorkType } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function Work() {
  return (
    <section id="work" className="mt-14">
      <h1 className="text-3xl font-medium mb-8 group w-fit">
        places i've been{" "}
      </h1>
      <div className="space-y-6">
        {works.map((work, index) => (
          <WorkItemAccordion
            // biome-ignore lint/suspicious/noArrayIndexKey: no other variable to use as key
            key={index}
            work={work}
          />
        ))}
      </div>
    </section>
  );
}

function WorkItemAccordion({ work }: { work: WorkType }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group w-full inline-flex items-start justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <img
            src={`/images/work/${work.logo}`}
            alt={`${work.company} logo`}
            className={cn(
              "size-10 rounded-sm grayscale dark:invert-0 opacity-65 dark:opacity-100 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 transition-[filter] ease-linear",
              isOpen ? "grayscale-0 invert-0" : ""
            )}
          />
          <div className="flex flex-col items-start gap-0.5">
            <div className="flex items-center gap-1">
              <h2
                className={cn(
                  "relative text-lg before:content-[''] before:absolute before:bottom-0.5 before:h-[1px] before:w-0 dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)] group-hover:before:w-full",
                  isOpen ? "before:w-full" : "before:w-0"
                )}
              >
                {work.company}
              </h2>
              <ChevronRight
                className={cn(
                  "size-3.5 opacity-0 scale-40 -translate-x-1.5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all ease-in-out",
                  isOpen
                    ? "rotate-90 opacity-100 scale-100 translate-x-0"
                    : "rotate-0 opacity-0 scale-40 -translate-x-1.5"
                )}
              />
            </div>

            <span className="text-sm text-muted-foreground">{work.role}</span>
          </div>
        </div>

        <span className="text-neutral-500 text-sm text-left">
          {work.period}
        </span>
      </button>

      <ul
        className={cn(
          "mt-4 list-inside flex-col overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        {work.description.map((d, i) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: no other variable to use as key
            key={i}
            className="flex items-center w-full leading-relaxed"
          >
            <div className="w-[2.5ch] self-start">•</div>

            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
