import type { ReactElement } from "react";

export type Project = {
  id: number;
  title: string;
  description: Array<ReactElement | string>;
  logo: string;
  role: string;
  period: string;
  technologies: Array<string>;
  href: string;
};

export type WorkPosition = {
  id: number;
  role: string;
  roleIcon: ReactElement;
  type: "freelancer" | "intern" | "full-time" | "contract";
  period?: string;
  description?: Array<ReactElement | string>;
  projects?: Array<WorkProject>;
};

export type WorkProject = {
  id: string;
  name: string;
  logo: string;
  period?: string;
  description: Array<ReactElement | string>;
};

export type WorkListItem =
  | {
      id: string;
      position: WorkPosition;
      type: "position";
    }
  | {
      id: string;
      position: WorkPosition;
      project: WorkProject;
      type: "project";
    };

export type Work = {
  id: number;
  company: string;
  companyLogo: string;
  bgColour?: string;
  href: string;
  isCurrentEmployer?: boolean;
  positions: Array<WorkPosition>;
};

// blogs
export type Metadata = {
  title: string;
  description: string;
  icon: string;
  date: string;
};

export type FrontmatterParseResult = {
  metadata: Metadata;
  content: string;
};

export type MDXFileData = FrontmatterParseResult & {
  slug: string;
};

export type ProjectDuration = {
  time: number;
  project: string;
  duration: number;
  ai_additions: number;
  ai_deletions: number;
  human_additions: number;
  human_deletions: number;
  color: string | null;
};

export type CodingTime = { hours: number; minutes: number };

export type Lab = {
  slug: string;
  title: string;
  subHeading: string;
  description: React.ReactNode;
  tech: string;
  video: string;
  component?: React.ComponentType;
};

export type SocialProfile = {
  title: string;
  handle: string;
  href: string;
};
