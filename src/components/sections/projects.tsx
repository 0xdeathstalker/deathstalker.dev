import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/heading";
import { Line } from "@/components/ui/line";
import { projects } from "@/lib/config/site-data";
import type { Project } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

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
    <Accordion defaultOpen={project.id === 1} className="relative py-6 px-4">
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
              <div className="pr-2 self-start">•</div>
              <span className="text-neutral-800 flex-grow">{d}</span>
            </li>
          ))}
        </ul>

        <div className="inline-flex items-center gap-3 flex-wrap mt-6">
          {project.technologies.map((technology) => (
            <div
              key={technology}
              className="py-1 px-1.5 bg-accent rounded-sm text-muted-foreground text-xs shadow"
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

function ProjectItemInfo({project}: {project: Project}) {
  return (
    <div className="inline-flex w-full flex-col items-start justify-between gap-2 md:flex-row md:gap-0">
      <div className="flex items-center gap-2">
        <div className="size-11 rounded-sm flex items-center justify-center overflow-hidden">
          <img
            src={`/images/projects/${project.logo}.svg`}
            alt={`${project.title} logo`}
            className="size-11 mix-blend-hard-light dark:mix-blend-normal grayscale opacity-75 dark:opacity-100 group-hover:opacity-100 group-hover:grayscale-0 group-hover:mix-blend-normal group-data-[state=open]:grayscale-0 group-data-[state=open]:mix-blend-normal group-data-[state=open]:opacity-100 transition-all ease-circ-in-out"
          />
        </div>

        <div className="flex flex-col items-start gap-0.5">
          <div className="w-fit relative inline-flex items-center gap-1 link">
            <Link
              href={project.href}
              target="_blank"
              className="text-lg relative before:content-[''] before:-z-10 before:absolute before:bottom-0.5 before:w-0 before:h-[1px] dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-circ-in-out group-hover:before:w-full group-data-[state=open]:before:w-full"
            >
              {project.title}
            </Link>

            <ChevronRight className="size-3.5 md:opacity-0 md:scale-40 md:-translate-x-1.5 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-0 group-data-[state=open]:rotate-90 group-data-[state=open]:md:opacity-100 group-data-[state=open]:md:scale-100 group-data-[state=open]:md:translate-x-0 transition-all ease-in-out" />
          </div>

          <span className="font-mono text-sm text-muted-foreground/90">
            {project.period && `(${project.period})`}
          </span>
        </div>
      </div>

      {/* {project.period && (
        <span className="text-neutral-500 text-sm text-left">{project.period}</span>
      )} */}
    </div>
  )
}