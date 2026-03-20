"use client";

import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/heading";
import { works } from "@/lib/config/site-data";
import type { Work as WorkType } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Line } from "@/components/ui/line";
import { LinkArrowIcon } from "../link-arrow-icon";

export function Work() {
  return (
    <section id="work">
      <SectionHeading className="px-4">experience</SectionHeading>

      <div>
        {works.map((work, idx) => {
          const isLast = works.length - 1 === idx;
          return (
            <WorkItem
              key={`${idx + 1}`}
              work={work}
              isLast={isLast}
            />
          );
        })}
      </div>
    </section>
  );
}

function WorkItem({ work, isLast }: { work: WorkType; isLast: boolean }) {
  const hasDescription = !!work.description?.length;

  return (
    <Accordion
      defaultOpen={work.id === 1}
      disabled={!hasDescription}
      className="relative py-6 px-4"
    >
      <CompanyInfo work={work} />

      <AccordionTrigger className="cursor-pointer">
        <RoleInfo
          work={work}
          hasDescription={hasDescription}
        />
      </AccordionTrigger>

      {hasDescription && (
        <AccordionContent className="pl-5">
          <ul className="space-y-2.5 list-inside flex-col">
            {work.description?.map((d, i) => (
              <li
                key={`${i + 1}`}
                className="flex items-center w-full leading-snug first:mt-3"
              >
                <div className="pr-2 self-start text-muted-foreground/40">•</div>
                <span className="text-neutral-800 flex-grow text-sm">{d}</span>
              </li>
            ))}
          </ul>
        </AccordionContent>
      )}

      {!isLast ? (
        <Line
          orientation="horizontal"
          variant="contained"
          position="bottom"
          color="text-[oklch(71.4%_0.014_41.2)]/86"
          className="max-w-[650px]"
        />
      ) : null}
    </Accordion>
  );
}

function RoleInfo({ work, hasDescription }: { work: WorkType; hasDescription: boolean }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <div className="size-6 flex items-center justify-center bg-muted border border-muted-foreground/15 rounded-xl ring-1 ring-offset-1 ring-muted-foreground/15">
          {work.roleIcon}
        </div>

        <div className="text-left text-base">
          <div className="flex items-center gap-0.5">
            <h4 className="relative leading-snug before:content-[''] before:absolute before:bottom-0.5 before:h-[1px] before:w-0 dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-circ-in-out group-hover:before:w-full group-data-[state=open]:before:w-full">
              {work.role}
            </h4>
            {hasDescription && (
              <ChevronRight className="size-3.5 group-data-[state=open]:rotate-90 transition-all ease-in-out" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground/75">{work.type}</p>

            <div className="w-px h-3 bg-muted-foreground/20" />

            <div className="mt-0.5 text-xs leading-snug inline-flex items-center gap-0.5 text-muted-foreground/75">
              {work.period.split("-").map((p, i, arr) => (
                <React.Fragment key={p}>
                  <span>{p}</span>
                  {i < arr.length - 1 && <span key={`sep-${i + 1}`}>-</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyInfo({ work }: { work: WorkType }) {
  return (
    <div className="group flex items-center gap-2 mb-3">
      <img
        src={`/images/work/${work.companyLogo}`}
        alt={`${work.company} logo`}
        className="size-6 rounded"
      />

      <div className="relative flex items-center gap-0.5 link">
        <Link
          href={work.href}
          target="_blank"
        >
          <h2 className="relative text-lg font-medium before:content-[''] before:absolute before:bottom-0.5 before:h-[1px] before:w-0 dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-circ-in-out hover:before:w-full">
            {work.company}
          </h2>
        </Link>

        {work.isCurrentEmployer && (
          <div className="absolute top-1/2 -right-2.5">
            <CurrentWorkIndicator />
          </div>
        )}
      </div>
    </div>
  );
}

function CurrentWorkIndicator() {
  return (
    <span className="relative flex items-center justify-center">
      <span className="absolute inline-flex size-2 animate-ping rounded-full bg-indigo-700 opacity-50" />
      <span className="absolute inline-flex size-1.5 rounded-full bg-indigo-700/70" />
    </span>
  );
}
