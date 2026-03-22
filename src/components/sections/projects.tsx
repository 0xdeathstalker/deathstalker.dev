import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/heading";
import { Line } from "@/components/ui/line";
import { projects } from "@/lib/config/site-data";
import type { Project } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { LinkIcon } from "@/components/link-icon";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Url } from "next/dist/shared/lib/router/router";

export function Projects() {
  return (
    <section id="builds">
      <SectionHeading className="px-4">projects</SectionHeading>
      <div>
        {projects.map((project, idx) => {
          const isLast = projects.length - 1 === idx;
          return (
            <ProjectItem
              key={project.title}
              project={project}
              isLast={isLast}
            />
          );
        })}
      </div>
    </section>
  );
}

export function ProjectItem({ project, isLast }: { project: Project; isLast: boolean }) {
  return (
    <Accordion
      defaultOpen={project.id === 1}
      className="relative py-6 px-4"
    >
      <AccordionTrigger className="cursor-pointer">
        <ProjectItemInfo project={project} />
      </AccordionTrigger>

      <AccordionContent>
        <ul className="space-y-3.5 list-inside flex-col">
          {project.description?.map((d, i) => (
            <li
              key={`${i + 1}`}
              className="flex items-center w-full leading-snug mt-3"
            >
              <div className="pr-2 self-start text-muted-foreground/40">•</div>
              <span className="text-neutral-800 grow text-sm">{d}</span>
            </li>
          ))}
        </ul>

        <div className="inline-flex items-center gap-1.5 flex-wrap mt-6 mb-1">
          {project.technologies.map((technology) => (
            <div
              key={technology}
              className="font-pixel-square mx-1 py-1 px-1.5 bg-accent rounded-sm text-muted-foreground text-xs shadow"
            >
              {technology}
            </div>
          ))}
        </div>
      </AccordionContent>

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

function ProjectItemInfo({ project }: { project: Project }) {
  return (
    <div className="w-full inline-flex items-center justify-between">
      <div className="flex items-start gap-4">
        <div className="mt-1 size-6 rounded flex items-center justify-center overflow-hidden">
          <img
            src={`/images/projects/${project.logo}`}
            alt={`${project.title} logo`}
            className="size-6"
          />
        </div>

        <div className="flex flex-col items-start gap-0.5">
          <div className="w-fit relative inline-flex items-center gap-1 link">
            <h1 className="font-medium text-lg relative before:content-[''] before:-z-10 before:absolute before:bottom-0.5 before:w-0 before:h-px dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-circ-in-out group-hover:before:w-full group-data-[state=open]:before:w-full">
              {project.title}
            </h1>

            <ChevronRight className="size-3.5 md:opacity-0 md:scale-40 md:-translate-x-1.5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-data-[state=open]:rotate-90 group-data-[state=open]:md:opacity-100 group-data-[state=open]:md:scale-100 group-data-[state=open]:md:translate-x-0 transition-all ease-in-out" />
          </div>

          <div className="inline-flex items-center gap-0.5 font-mono text-xs text-muted-foreground/90">
            {project.period.split("-").map((p, i, arr) => (
              <React.Fragment key={p}>
                <span>{p}</span>
                {i < arr.length - 1 && <span key={`sep-${i + 1}`}>-</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <ProjectLinkTooltip href={project.href} />
    </div>
  );
}

function ProjectLinkTooltip({ href }: { href: Url }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <LinkIcon href={href} />
      </TooltipTrigger>

      <TooltipContent>
        <span className="font-sans">visit project link</span>
      </TooltipContent>
    </Tooltip>
  );
}
