"use client";

import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/heading";
import { works } from "@/lib/config/site-data";
import type { Work as WorkType } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export function Work() {
  return (
    <section id="work">
      <SectionHeading className="px-4">experience</SectionHeading>

      <div className="space-y-6 py-6">
        {works.map((work, index) => (
          <WorkItem key={`${index + 1}`} work={work} />
        ))}
      </div>
    </section>
  );
}

function WorkItem({ work }: { work: WorkType }) {
  const hasDescription = !!work.description?.length;

  return (
    <Accordion defaultOpen={work.id === 1} disabled={!hasDescription} className="px-4">
      <AccordionTrigger className="cursor-pointer">
        <WorkItemInfo work={work} hasDescription={hasDescription} />
      </AccordionTrigger>

      {hasDescription && (
        <AccordionContent>
          <ul className="space-y-3.5 list-inside flex-col">
            {work.description?.map((d, i) => (
              <li
                key={`${i + 1}`}
                className="flex items-center w-full leading-snug mt-3"
              >
                <div className="pr-2 self-start">•</div>
                <span className="text-neutral-800 flex-grow">{d}</span>
              </li>
            ))}
          </ul>
        </AccordionContent>
      )}
    </Accordion>
  );
}

function WorkItemInfo({work, hasDescription}: {work: WorkType, hasDescription: boolean}) {
  return (
    <div className="inline-flex w-full flex-col items-start justify-between gap-2 md:flex-row md:gap-0">
      <div className="flex items-center gap-2">
        <Link href={work.href} target="_blank">
          <img
            src={`/images/work/${work.logo}`}
            alt={`${work.company} logo`}
            className="size-11 rounded-sm mix-blend-hard-light dark:mix-blend-normal grayscale opacity-75 dark:opacity-100 group-hover:opacity-100 group-hover:grayscale-0 group-hover:mix-blend-normal group-data-[state=open]:grayscale-0 group-data-[state=open]:mix-blend-normal group-data-[state=open]:opacity-100 transition-all ease-linear"
          />
        </Link>
        
        <div className="flex flex-col items-start gap-0.5">
          <div className="flex items-center gap-2.5">
            <h2 className="relative text-lg before:content-[''] before:absolute before:bottom-0.5 before:h-[1px] before:w-0 dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-circ-in-out group-hover:before:w-full group-data-[state=open]:before:w-full">
              {work.company}
            </h2>

            {work.isCurrentEmployer && <CurrentWorkIndicator />}

            {hasDescription && (
              <ChevronRight className="size-3.5 md:opacity-0 md:scale-40 md:-translate-x-1.5 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-0 group-data-[state=open]:rotate-90 group-data-[state=open]:md:opacity-100 group-data-[state=open]:md:scale-100 group-data-[state=open]:md:translate-x-0 transition-all ease-in-out" />
            )}
          </div>

          <span className="text-sm text-muted-foreground/90">{work.role}</span>
        </div>
      </div>

      <span className="text-neutral-500 text-sm text-left">{work.period}</span>
    </div>
  )
}

function CurrentWorkIndicator() {
  return (
    <span className="relative flex items-center justify-center">
      <span className="absolute inline-flex size-2 animate-ping rounded-full bg-foreground opacity-50" />
      <span className="absolute inline-flex size-1.5 rounded-full bg-foreground/70" />
    </span>
  )
}