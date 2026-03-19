import type { ReactElement } from "react";
import type { portfolio } from "@/lib/config/site-data";

export type Project = {
  id: number;
  title: string;
  description: Array<ReactElement | string>;
  logo: string;
  role: string;
  period: string;
  achievements: Array<string>;
  technologies: Array<string>;
  href: string;
};

export type Work = {
  id: number;
  company: string;
  role: string;
  logo: string;
  period: string;
  description?: Array<ReactElement | string>;
  bgColour?: string;
  href: string;
  isCurrentEmployer?: boolean;
};

export type SocialKeys = keyof typeof portfolio.socials;

// blogs
export type Metadata = {
  title: string;
  description: string;
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
