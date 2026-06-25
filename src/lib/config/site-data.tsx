import { InlineLink } from "@/components/ui/inline-link";
import type { Project, Work } from "@/lib/types";
import { Code } from "lucide-react";
import type * as React from "react";

export const portfolio = {
  author: "soumya mukherjee",
  bio: [
    "hey, i'm a frontend focused developer with fullstack knowledge with 3 years of experience in building polished interfaces with react, next.js and typescript.",
    "i focus on performance and user experience with pixel-perfect execution and strong attention to small details. i prioritize resilient code and thoughtful interactions that make interfaces feel effortless and alive.",
  ],
  resume: "/resume.pdf",
  socials: {
    github: "https://github.com/0xdeathstalker",
    linkedin: "https://www.linkedin.com/in/soumya-mukherjee-88a551248/",
    twitter: "https://x.com/0xdeathstalker",
  },
  mail: "soumyamukherjee.work@gmail.com",
  github_username: "0xdeathstalker",
} as const;

export const works: Array<Work> = [
  {
    id: 1,
    company: "ladddr",
    companyLogo: "ladddr.png",
    bgColour: "#5C43DD",
    href: "https://ladddr.com",
    isCurrentEmployer: true,
    positions: [
      {
        id: 1,
        role: "fullstack engineer",
        roleIcon: <Code className="size-3.5 text-muted-foreground/70" />,
        type: "freelancer",
        period: "09.2025 - present",
        description: [
          <span>
            built a b2b saas platform, <InlineLink href="https://www.taxocity.com">taxocity</InlineLink>, serving indian
            startups and businesses with end-to-end legal and tax compliance workflows - covering company registration,
            gst, itr filing, trademark and corporate modifications.
          </span>,
          "implemented secure payment infrastructure with razorpay, including a one-time token system for post payment feature access and automated order confirmation emails via resend.",
          "built multi-channel lead management system integrating google sheets api and telecrm for real-time lead capture and crm syncing across service inquiry flows.",
          "developed a headless cms-driven blog using git workflows with improved seo and performance.",
        ],
      },
    ],
  },
  {
    id: 2,
    company: "router-protocol",
    companyLogo: "router.png",
    href: "https://www.routerprotocol.com",
    positions: [
      {
        id: 1,
        role: "frontend engineer",
        roleIcon: <Code className="size-3.5 text-muted-foreground/70" />,
        type: "full-time",
        period: "09.2023 - 09.2025",
        description: [
          <p>
            built <InlineLink href="https://nitro-explorer.vercel.app">nitro explorer</InlineLink>, cross-chain
            blockchain explorer processing more than thousand daily transactions.
          </p>,
          <p>
            integrated multiple blockchain ecosystems: (cosmos, bitcoin, tron, near, ton) into{" "}
            <InlineLink href="https://github.com/router-protocol/tangled">tangled</InlineLink>, a wallet sdk developed
            for handling multi-chain wallet flows.
          </p>,
          <p>
            optimised transaction ux by reducing drop-offs, improving completion rates on{" "}
            <InlineLink href="https://routernitro.com/swap">nitro app</InlineLink>.
          </p>,
        ],
      },
      {
        id: 2,
        role: "frontend engineer intern",
        roleIcon: <Code className="size-3.5 text-muted-foreground/70" />,
        type: "intern",
        period: "05.2023 - 08.2023",
        description: [
          "built a gamified nft application using the protocol's cross-chain architecture where users were able to mint an nft and then level it up by bridging across chains.",
          "implemented a lottery system with rewards distribution on polygon using ethers.js and custom wallet module for handling wallet connections.",
          "earned a full-time frontend engineer role by consistently shipping production-ready features with strong code quality.",
        ],
      },
    ],
  },
] as const;

export const projects: Array<Project> = [
  {
    id: 1,
    title: "nitro-explorer-v2",
    description: [
      <span>
        independently rebuilt nitro explorer with a focus on performance and user experience, achieving up to{" "}
        <strong>99 lighthouse score</strong> (prev max: 65).
      </span>,
      "architected graphql data layer by combining tanstack query and next.js ssr features to handle optimistic updates, query deduplication, refetching strategy and automatic cache invalidation.",
      "implemented command-based search and non-blocking data states to eliminate layout shifts and improve perceived latency.",
    ],
    logo: "nitro-explorer.svg",
    role: "creator and maintainer",
    period: "03.2025-07.2025",
    technologies: [
      "next.js",
      "typescript",
      "zod",
      "zustand",
      "graphql",
      "tanstack-query",
      "shadcnui",
      "cmdk",
      "tailwind",
    ],
    href: "https://nitro-explorer.vercel.app",
  },
  {
    id: 2,
    title: "cracked-ui",
    description: [
      "building a reusable, framework-agnostic component library for apps and thereby reducing developer integration time by 50–60%.",
      "designed for responsive and accessible use across devices with consistent design patterns.",
    ],
    logo: "cracked-ui.svg",
    role: "creator and maintainer",
    period: "06.2025-present",
    technologies: ["react", "typescript", "motion", "viem", "wagmi", "tailwind"],
    href: "https://github.com/cracked0x/ui",
  },
  {
    id: 3,
    title: "whispr-room",
    description: [
      "built a real-time chat app with ephemeral rooms using convex for live state sync and user presence tracking.",
      "added system messages for join/leave activity to provide contextual flow.",
      "implemented graceful ux for expired or invalid room states.",
    ],
    logo: "whispr-room.svg",
    role: "creator and maintainer",
    period: "06.2025-07.2025",
    technologies: [
      "next.js",
      "typescript",
      "convex",
      "tanstack-query",
      "zod",
      "uploadthing",
      "posthog",
      "motion",
      "tailwind",
    ],
    href: "https://whispr-room.vercel.app",
  },
] as const;

export type Certificate = {
  id: number;
  icon: string;
  name: string;
  date: string;
  link: string;
};

export const certificates: Array<Certificate> = [
  {
    id: 1,
    icon: "/images/certificates/animations-dev.svg",
    name: "animations on the web",
    date: "27.02.2025",
    link: "https://animations.dev/certificate/b06ea5f2-49e6-48b6-a254-d2f11bffe108",
  },
  {
    id: 2,
    icon: "/images/certificates/anthropic.svg",
    name: "claude in action",
    date: "22.04.2026",
    link: "https://verify.skilljar.com/c/g95mh9cvn8z2",
  },
] as const;
