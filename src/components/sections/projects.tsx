import LinkIcon from "@/components/link-icon";
import { SectionHeading } from "@/components/ui/heading";
import { Line } from "@/components/ui/line";
import { projects } from "@/lib/config/site-data";
import type { Project } from "@/lib/types";
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
    <div className="relative py-6 px-4">
      <div className="w-fit relative inline-flex items-center gap-1 link">
        <Link
          href={project.href}
          target="_blank"
          className="group text-lg relative before:content-[''] before:-z-10 before:absolute before:bottom-0.5 before:w-0 before:h-[1px] dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)] hover:before:w-full"
        >
          {project.title}
        </Link>

        <LinkIcon />
      </div>

      <h2 className="dark:text-neutral-300 text-muted-foreground/90 text-sm">
        {project.role} {project.period && `(${project.period})`}
      </h2>

      <p className="leading-relaxed my-6 text-[#272727]">{project.description}</p>

      <div className="inline-flex items-center gap-3 flex-wrap">
        {project.technologies.map((technology) => (
          <div
            key={technology}
            className="py-1 px-1.5 bg-accent rounded-sm text-muted-foreground text-xs shadow"
          >
            {technology}
          </div>
        ))}
      </div>

      {!isLast ? (
        <Line
          orientation="horizontal"
          variant="contained"
          position="bottom"
          color="text-muted-foreground/25 dark:text-muted-foreground/20"
          className="max-w-[650px]"
        />
      ) : null}
    </div>
  );
}
