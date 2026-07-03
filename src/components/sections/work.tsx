"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/heading";
import { Line } from "@/components/ui/line";
import { works } from "@/lib/config/site-data";
import type { WorkListItem, WorkPosition, WorkProject, Work as WorkType } from "@/lib/types";

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
  const items = work.positions.flatMap<WorkListItem>((position) => {
    if (position.projects?.length) {
      return position.projects.map((project) => ({
        id: project.id,
        position,
        project,
        type: "project" as const,
      }));
    }

    return [{ id: `${position.id}`, position, type: "position" as const }];
  });

  return (
    <div className="relative py-6 px-4 group/work">
      <CompanyInfo work={work} />

      <div className="space-y-6">
        {items.map((item, idx) =>
          item.type === "project" ? (
            <ProjectItem
              key={item.id}
              project={item.project}
              position={item.position}
              defaultOpen={work.id === 1 && item.position.id === 1 && idx === 0}
              isLastItem={idx === items.length - 1}
            />
          ) : (
            <PositionItem
              key={item.id}
              position={item.position}
              defaultOpen={work.id === 1 && item.position.id === 1}
              isLastPosition={idx === items.length - 1}
            />
          ),
        )}
      </div>

      {!isLast ? (
        <Line
          orientation="horizontal"
          variant="contained"
          position="bottom"
          color="text-mauve-500/65"
          className="max-w-[650px]"
        />
      ) : null}
    </div>
  );
}

function PositionItem({
  position,
  defaultOpen,
  isLastPosition,
}: {
  position: WorkPosition;
  defaultOpen: boolean;
  isLastPosition: boolean;
}) {
  const hasDescription = !!position.description?.length;

  return (
    <div className="relative">
      {!isLastPosition ? (
        <div
          aria-hidden
          className="absolute left-3 top-3 z-0 w-px bg-border h-[calc(100%+1rem)]"
        />
      ) : null}

      <Accordion
        defaultOpen={defaultOpen}
        disabled={!hasDescription}
        className="relative z-10"
      >
        <AccordionTrigger>
          <RoleInfo
            position={position}
            hasDescription={hasDescription}
          />
        </AccordionTrigger>

        {hasDescription ? (
          <AccordionContent className="pl-8">
            <ul className="space-y-2.5 list-inside flex-col">
              {position.description?.map((d, i) => (
                <li
                  key={`${i + 1}`}
                  className="flex items-center w-full leading-snug first:mt-3"
                >
                  <div className="pr-2 self-start text-mauve-700/40">•</div>
                  <span className="text-taupe-700 grow text-sm">{d}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        ) : null}
      </Accordion>
    </div>
  );
}

function RoleInfo({ position, hasDescription }: { position: WorkPosition; hasDescription: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <div className="shrink-0 size-6 flex items-center justify-center bg-muted border border-mauve-700/15 rounded-xl ring-1 ring-offset-1 ring-mauve-700/15">
        {position.roleIcon}
      </div>

      <div className="text-left text-base">
        <div className="flex items-center gap-0.5">
          <h4 className="relative before:content-[''] before:absolute before:bottom-0.5 before:h-px before:w-0 before:bg-mauve-500 before:transition-all before:ease-circ-in-out group-hover:before:w-full group-data-[state=open]:before:w-full">
            {position.role}
          </h4>
          {hasDescription && (
            <ChevronRight className="size-3.5 group-data-[state=open]:rotate-90 transition-all ease-in-out" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm text-mauve-700/75">{position.type}</p>

          <div className="w-px h-3 bg-mauve-700/20" />

          <div className="font-mono mt-0.5 text-xs leading-snug inline-flex items-center gap-0.5 text-mauve-700/75">
            {position.period?.split("-").map((p, i, arr) => (
              <React.Fragment key={p}>
                <span>{p}</span>
                {i < arr.length - 1 && <span key={`sep-${i + 1}`}>-</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyInfo({ work }: { work: WorkType }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <img
        src={`/images/work/${work.companyLogo}`}
        alt={`${work.company} logo`}
        className="size-6 rounded grayscale group-hover/work:grayscale-0 transition-[filter] ease-in-out duration-300"
      />

      <div className="relative flex items-center gap-0.5 link">
        <Link
          href={work.href}
          target="_blank"
        >
          <h2 className="relative text-lg font-medium before:content-[''] before:absolute before:bottom-0.5 before:h-px before:w-0 before:bg-mauve-500 before:transition-all before:ease-circ-in-out hover:before:w-full">
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

function ProjectItem({
  project,
  position,
  defaultOpen,
  isLastItem,
}: {
  project: WorkProject;
  position: WorkPosition;
  defaultOpen: boolean;
  isLastItem: boolean;
}) {
  const hasDescription = !!project.description.length;

  return (
    <div className="relative">
      {!isLastItem ? (
        <div
          aria-hidden
          className="absolute left-3 top-3 z-0 w-px bg-border h-[calc(100%+1rem)]"
        />
      ) : null}

      <Accordion
        defaultOpen={defaultOpen}
        disabled={!hasDescription}
        className="relative z-10"
      >
        <AccordionTrigger>
          <ProjectInfo
            project={project}
            position={position}
            hasDescription={hasDescription}
          />
        </AccordionTrigger>

        {hasDescription ? (
          <AccordionContent className="pl-8">
            <ul className="space-y-2.5 list-inside flex-col">
              {project.description.map((d, i) => (
                <li
                  key={`${project.id}-${i}`}
                  className="flex items-center w-full leading-snug first:mt-3"
                >
                  <div className="pr-2 self-start text-mauve-700/40">•</div>
                  <span className="text-taupe-700 grow text-sm">{d}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        ) : null}
      </Accordion>
    </div>
  );
}

function ProjectInfo({
  project,
  position,
  hasDescription,
}: {
  project: WorkProject;
  position: WorkPosition;
  hasDescription: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="size-6 p-0.5 flex items-center justify-center bg-muted border border-mauve-700/15 rounded-xl ring-1 ring-offset-1 ring-mauve-700/15">
        <img
          src={`/images/work/${project.logo}`}
          alt={`${project.name} logo`}
          className="shrink-0 rounded grayscale group-hover/work:grayscale-0 transition-[filter] ease-in-out duration-300"
        />
      </div>

      <div className="text-left text-base">
        <div className="flex items-center gap-0.5">
          <h4 className="relative before:content-[''] before:absolute before:bottom-0.5 before:h-px before:w-0 before:bg-mauve-500 before:transition-all before:ease-circ-in-out group-hover:before:w-full group-data-[state=open]:before:w-full">
            {project.name}
          </h4>
          {hasDescription && (
            <ChevronRight className="size-3.5 group-data-[state=open]:rotate-90 transition-all ease-in-out" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm text-mauve-700/75">{position.type}</p>

          <div className="w-px h-3 bg-mauve-700/20" />

          <div className="font-mono mt-0.5 text-xs leading-snug inline-flex items-center gap-0.5 text-mauve-700/75">
            {project.period?.split("-").map((p, i, arr) => (
              <React.Fragment key={p}>
                <span>{p}</span>
                {i < arr.length - 1 && <span key={`sep-${i + 1}`}>-</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrentWorkIndicator() {
  return (
    <span className="relative flex items-center justify-center grayscale group-hover/work:grayscale-0 transition-[filter] ease-in-out duration-300">
      <span className="absolute inline-flex size-2 animate-ping rounded-full bg-indigo-700 opacity-50" />
      <span className="absolute inline-flex size-1.5 rounded-full bg-indigo-700/70" />
      <span className="sr-only">Current Employer</span>
    </span>
  );
}
