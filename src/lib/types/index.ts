import type { ReactElement } from "react";
import type { portfolio } from "@/lib/config/site-data";

export type Project = {
  title: string;
  description: string;
  role: string;
  period: string;
  achievements: Array<string>;
  technologies: Array<string>;
  href: string;
};

export type Work = {
  company: string;
  role: string;
  logo: string;
  period: string;
  description: Array<ReactElement | string>;
  href: string;
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
