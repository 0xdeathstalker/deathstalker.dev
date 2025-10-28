import Link from "next/link";
import type { Project, Work } from "@/lib/types";

export const portfolio = {
  author: "soumya mukherjee",
  bio: [
    "hey, i'm soumya — a design engineer building at the intersection of craft and code.",
    "i care about the details — clean ui, smooth interactions, and interfaces that feel good to use. deep diving into web3 and motion design. i build things that are fast, functional, and just polished enough to make you smile.",
  ],
  resume:
    "https://drive.google.com/file/d/1afreIcD7OfaimQ4HNHpHZsr3mxt18BS1/view?usp=drive_link",
  socials: {
    github: "https://github.com/0xdeathstalker",
    linkedin: "https://www.linkedin.com/in/soumya-mukherjee-88a551248/",
    twitter: "https://x.com/0xdeathstalker",
  },
  mail: "soumyamukherjee.work@gmail.com",
} as const;

export const works: Array<Work> = [
  {
    company: "router-protocol",
    role: "frontend developer",
    logo: "router.png",
    period: "sep 2023 - present",
    description: [
      <span>
        built{" "}
        <Link
          href="https://explorer.routernitro.com"
          target="_blank"
          className="hover:text-foreground underline underline-offset-4 transition-colors ease-in-out"
        >
          nitro explorer
        </Link>
        , cross-chain blockchain explorer processing more than thousand daily
        transactions
      </span>,
      <span>
        integrated multiple blockchain ecosystems: (cosmos, bitcoin, tron, near,
        ton) into{" "}
        <Link
          href="https://github.com/router-protocol/tangled"
          target="_blank"
          className="hover:text-foreground underline underline-offset-4 transition-colors ease-in-out"
        >
          tangled
        </Link>
        , a wallet sdk developed for handling multi-chain wallet flows.
      </span>,
      <span>
        optimised transaction ux by reducing drop-offs, improving completion
        rates on{" "}
        <Link
          href="https://routernitro.com/swap"
          target="_blank"
          className="hover:text-foreground underline underline-offset-4 transition-colors ease-in-out"
        >
          nitro app
        </Link>
      </span>,
    ],
    href: "https://www.routerprotocol.com",
  },
  {
    company: "router-protocol",
    role: "frontend developer intern",
    logo: "router.png",
    period: "may 2023 - sep 2023",
    description: [
      "built a gamified nft application using the protocol's cross-chain architecture where users were able to mint an nft and then level it up by bridging across chains",
      "implemented a lottery system with rewards distribution on polygon using ethers.js and custom wallet module for handling wallet connections",
      "went from intern to full-time based on shipping speed and code quality",
    ],
    href: "https://www.routerprotocol.com",
  },
] as const;

export const projects: Array<Project> = [
  {
    title: "nitro-explorer-v2",
    description:
      "a blazing-fast revamped version of cross-chain blockchain explorer (nitro explorer) rebuilt with a focus on performance and ux.",
    role: "creator and maintainer",
    period: "mar 2025 - jul 2025",
    achievements: [
      "improved ux and codebase to achieve up to 99 lighthouse performance score (prev max: 65)",
      "eliminated layout shift and loading jank with full non-blocking data flow",
      "designed keyboard-driven cmdk navigation for rapid search experience",
    ],
    technologies: [
      "next.js",
      "tailwindcss",
      "shadcnui",
      "zod",
      "zustand",
      "typescript",
    ],
    href: "https://nitro-explorer.vercel.app",
  },
  {
    title: "cracked-ui-components",
    description:
      "a growing component library built for web3 applications, designed to simplify integration and speed up development across dapps with polished, reusable primitives.",
    role: "creator and maintainer",
    period: "jun 2025 - present",
    achievements: [
      "accelerated web3 dapp integration by 50–60% through reusable, framework-agnostic components",
      "built chain/token selectors and qr-based address utilities used across multiple production apps",
      "ensured responsive and accessible design for seamless experience across devices",
    ],
    technologies: ["react", "typescript", "tailwind css", "viem", "wagmi"],
    href: "https://github.com/cracked0x/ui",
  },
  {
    title: "whispr-room",
    description:
      "a real-time disposable chat app where users can instantly create or join temporary chat rooms without login—built for fast, private, and ephemeral conversations.",
    role: "creator and maintainer",
    period: "jun 2025 - jul 2025",
    achievements: [
      "integrated convex as a serverless backend for live room and message sync",
      "added system messages for join/leave activity and contextual flow",
      "implemented graceful UX for handling expired or invalid rooms",
    ],
    technologies: [
      "next.js",
      "tailwind css",
      "convex",
      "react query",
      "zod",
      "uploadthing",
      "posthog",
    ],
    href: "https://whispr-room.vercel.app",
  },
] as const;
