import type { SocialProfile } from "@/lib/types";

export const siteConfig = {
  name: "soumya mukherjee",
  shortName: "deathstalker",
  title: "deathstalker",
  description: "design engineer building web experiences at the intersection of design and engineering.",
  url: "https://deathstalker.dev",
  author: {
    name: "soumya mukherjee",
    email: "soumyamukherjee.work@gmail.com",
    twitter: "@xdeathstalker",
    github: "0xdeathstalker",
    linkedin: "smukherjee15",
  },
  links: {
    twitter: "https://x.com/0xdeathstalker",
    github: "https://github.com/0xdeathstalker",
    linkedin: "https://www.linkedin.com/in/smukherjee15",
  },
  keywords: [
    "soumya mukherjee",
    "Deathstalker",
    "Design Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Developer",
    "Portfolio",
    "Software Engineer",
    "UI Developer",
    "JavaScript",
    "UI/UX Developer",
    "Creative Developer",
    "Interface Design",
    "Motion Design",
    "Framer Motion",
  ],
} as const;

export const SOCIALS: Record<string, SocialProfile> = {
  github: {
    title: "github",
    handle: "0xdeathstalker",
    href: "https://github.com/0xdeathstalker",
    color: "#101411",
  },
  linkedin: {
    title: "linkedin",
    handle: "smukherjee15",
    href: "https://linkedin.com/in/smukherjee15",
    color: "#0077b5",
  },
  twitter: {
    title: "twitter",
    handle: "@xdeathstalker",
    href: "https://x.com/xdeathstalker",
    color: "#14171A",
  },
};

export type SocialNames = keyof typeof SOCIALS;
