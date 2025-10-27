import Link from "next/link";
import LinkIcon from "@/components/link-icon";
import { projects } from "@/lib/config/site-data";
import type { Project } from "@/lib/types";

export default function Projects() {
  return (
    <section id="builds" className="my-14">
      <h1 className="text-3xl font-medium mb-8 group w-fit">builds </h1>
      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectItem key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

export function ProjectItem({ project }: { project: Project }) {
  return (
    <div className="space-y-3 text-muted-foreground">
      <div className="w-fit relative inline-flex items-center gap-1 link">
        <Link
          href={project.href}
          target="_blank"
          className="group text-foreground text-lg relative hover:text-background before:content-[''] before:-z-10 before:absolute before:bottom-1 before:w-0 before:h-[calc(theme(fontSize.lg)*theme(lineHeight.tight))] dark:before:bg-neutral-100 before:bg-neutral-900 before:transition-all before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)] hover:before:w-full"
        >
          {project.title}
        </Link>

        <LinkIcon />
      </div>

      <h2 className="dark:text-neutral-300 text-neutral-700 text-sm">
        {project.role} {project.period && `(${project.period})`}
      </h2>

      <p className="leading-relaxed">{project.description}</p>

      <div className="inline-flex items-center gap-3 flex-wrap">
        {project.technologies.map((technology) => (
          <div
            key={technology}
            className="py-1 px-1.5 bg-accent rounded-sm text-xs"
          >
            {technology}
          </div>
        ))}
      </div>
    </div>
  );
}
