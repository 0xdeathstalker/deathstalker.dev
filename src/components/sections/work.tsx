"use client";

import { works } from "@/lib/config/site-data";
import type { Work as WorkType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import * as React from "react";
import { SectionHeading } from "@/components/ui/heading";

export function Work() {
  return (
    <section
      id="work"
      className="relative px-4 max-[690px]:px-8"
    >
      <SectionHeading>experience</SectionHeading>

      <div className="space-y-6 py-6">
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

  const hasDescription = work.description;

  return (
    <div>
      <button
        onClick={() => {
          if (hasDescription) setIsOpen((prev) => !prev);
        }}
        className="group w-full inline-flex flex-col md:flex-row items-start justify-between gap-2 md:gap-0 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <img
            src={`/images/work/${work.logo}`}
            alt={`${work.company} logo`}
            className={cn(
              "size-11 rounded-sm mix-blend-hard-light dark:mix-blend-normal grayscale opacity-75 dark:opacity-100 group-hover:opacity-100 group-hover:grayscale-0 group-hover:mix-blend-normal transition-all ease-linear",
              isOpen && "grayscale-0 mix-blend-normal opacity-100",
            )}
          />
          <div className="flex flex-col items-start gap-0.5">
            <div className="flex items-center gap-2.5">
              <h2
                className={cn(
                  "relative text-lg before:content-[''] before:absolute before:bottom-0.5 before:h-[1px] before:w-0 dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)] group-hover:before:w-full",
                  isOpen ? "before:w-full" : "before:w-0",
                )}
              >
                {work.company}
              </h2>

              {work.isCurrentEmployer && (
                <span className="relative flex items-center justify-center">
                  <span className="absolute inline-flex size-2 animate-ping rounded-full bg-foreground opacity-50" />
                  <span className="absolute inline-flex size-1.5 rounded-full bg-foreground/70" />
                </span>
              )}

              {hasDescription && (
                <ChevronRight
                  className={cn(
                    "size-3.5 md:opacity-0 md:scale-40 md:-translate-x-1.5 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-0 transition-all ease-in-out",
                    isOpen && "rotate-90 md:opacity-100 md:scale-100 md:translate-x-0",
                  )}
                />
              )}
            </div>

            <span className="text-sm text-muted-foreground/90">{work.role}</span>
          </div>
        </div>

        <span className="text-neutral-500 text-sm text-left">{work.period}</span>
      </button>

      {hasDescription ? (
        <ul
          className={cn(
            "space-y-3.5 list-inside flex-col overflow-hidden transition-all duration-[350ms] ease-in-out",
            isOpen ? "max-h-screen" : "max-h-0",
          )}
        >
          {work.description?.map((d, i) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: no other variable to use as key
              key={i}
              className="flex items-center w-full leading-snug mt-3"
            >
              <div className="pr-2 self-start">•</div>

              <span className="text-[#272727] flex-grow">{d}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
