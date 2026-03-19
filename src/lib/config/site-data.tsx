import Link from "next/link";
import type { Project, Work } from "@/lib/types";
import { IOSInputMorphText } from "@/components/labs/input-morph-text";
import { SubmitButtonStates } from "@/components/labs/button-states";
import { MaskScroll } from "@/components/labs/mask-scroll";
import { MotionSharedLayout } from "@/components/labs/shared-layout";

export const portfolio = {
  author: "soumya mukherjee",
  bio: [
    <span>
      <span className="text-foreground">hey, i'm soumya — a design engineer</span> with 3 years of experience in
      building polished interfaces with react, next.js and typescript.
    </span>,
    "i focus on performance and user experience, prioritizing resilient code and thoughtful interactions that feel effortless. shipped production apps from blockchain explorers to component libraries.",
    "always pushing the details that make interfaces feel alive.",
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
    role: "freelancer",
    logo: "ladddr.png",
    bgColour: "#5C43DD",
    period: "09.2025 - present",
    href: "https://ladddr.com",
    isCurrentEmployer: true,
    description: [
      "built a fullstack b2b saas platform for legal and tax compliance services, featuring multiple workflows",
      "implemented secure payment infrastructure with razorpay, one-time token system for post payment operations and automated payment confirmation emails via resend",
      "built multi-channel lead management system with google sheets api and telecrm",
      "developed a headless cms-driven blog using sanity with improved seo and performance",
    ],
  },
  {
    id: 2,
    company: "router-protocol",
    role: "frontend developer",
    logo: "router.png",
    period: "09.2023 - 09.2025",
    description: [
      <span>
        built{" "}
        <Link
          href="https://nitro-explorer.vercel.app"
          target="_blank"
          className="font-semibold hover:decoration-neutral-800 underline decoration-neutral-300 underline-offset-3 transition-colors ease-in-out"
        >
          nitro explorer
        </Link>
        , cross-chain blockchain explorer processing more than thousand daily transactions.
      </span>,
      <span>
        integrated multiple blockchain ecosystems: (cosmos, bitcoin, tron, near, ton) into{" "}
        <Link
          href="https://github.com/router-protocol/tangled"
          target="_blank"
          className="font-semibold hover:decoration-neutral-800 underline decoration-neutral-300 underline-offset-3 transition-colors ease-in-out"
        >
          tangled
        </Link>
        , a wallet sdk developed for handling multi-chain wallet flows.
      </span>,
      <span>
        optimised transaction ux by reducing drop-offs, improving completion rates on{" "}
        <Link
          href="https://routernitro.com/swap"
          target="_blank"
          className="font-semibold hover:decoration-neutral-800 underline decoration-neutral-300 underline-offset-3 transition-colors ease-in-out"
        >
          nitro app
        </Link>
        .
      </span>,
    ],
    href: "https://www.routerprotocol.com",
  },
  {
    id: 3,
    company: "router-protocol",
    role: "frontend developer intern",
    logo: "router.png",
    period: "05.2023 - 09.2023",
    description: [
      "built a gamified nft application using the protocol's cross-chain architecture where users were able to mint an nft and then level it up by bridging across chains.",
      "implemented a lottery system with rewards distribution on polygon using ethers.js and custom wallet module for handling wallet connections.",
      "went from intern to full-time based on shipping speed and code quality.",
    ],
    href: "https://www.routerprotocol.com",
  },
] as const;

export const projects: Array<Project> = [
  {
    id: 1,
    title: "nitro-explorer-v2",
    description: [
      "Independently rebuilt an internal version of Nitro Explorer with a focus on performance and UX, achieving up to 99 Lighthouse performance score (previous max: 65).",
      "Crafted a blazing-fast explorer experience by implementing a command based search and non-blocking data states to eliminate layout shifts and improve perceived latency.",
      "Architected GraphQL data layer using React Query for optimistic updates, query deduplication, and automatic cache invalidation across blockchain transaction states",
    ],
    logo: "nitro-explorer",
      role: "creator and maintainer",
    period: "03.2025 - 07.2025",
    achievements: [
      "improved ux and codebase to achieve up to 99 lighthouse performance score (prev max: 65)",
      "eliminated layout shift and loading jank with full non-blocking data flow",
      "designed keyboard-driven cmdk navigation for rapid search experience",
    ],
    technologies: ["next.js", "tailwindcss", "shadcnui", "zod", "zustand", "typescript"],
    href: "https://nitro-explorer.vercel.app",
  },
  {
    id: 2,
    title: "cracked-ui-components",
    description: [
      "Developing a comprehensive component ecosystem for web3 applications, accelerating developer integration time by 50-60% and can be used across multiple applications with consistent design patterns."
    ],
      logo: "cracked-ui",
      role: "creator and maintainer",
    period: "06.2025 - present",
    achievements: [
      "accelerated web3 dapp integration by 50–60% through reusable, framework-agnostic components",
      "built chain/token selectors and qr-based address utilities used across multiple production apps",
      "ensured responsive and accessible design for seamless experience across devices",
    ],
    technologies: ["react", "typescript", "tailwind css", "viem", "wagmi"],
    href: "https://github.com/cracked0x/ui",
  },
  {
    id: 3,
    title: "whispr-room",
    description: [
      "Built a real-time chat app with ephemeral rooms using Convex for live state synchronization, user presence tracking, system event broadcasting and graceful room expiration handling."
    ],
      logo: "whispr-room",
      role: "creator and maintainer",
    period: "06.2025 - 07.2025",
    achievements: [
      "integrated convex as a serverless backend for live room and message sync",
      "added system messages for join/leave activity and contextual flow",
      "implemented graceful UX for handling expired or invalid rooms",
    ],
    technologies: ["next.js", "tailwind css", "convex", "react query", "zod", "uploadthing", "posthog"],
    href: "https://whispr-room.vercel.app",
  },
] as const;

export type ComponentTitles =
  | "shared-layout-animation"
  | "ios-input-morph-text"
  | "mask-scroll"
  | "submit-button-states";

export type Craft = { title: ComponentTitles; tech: string; video: string };

export const crafts: Array<Craft> = [
  {
    title: "submit-button-states",
    tech: "css",
    video: "https://cdn.deathstalker.dev/videos/button-states.mp4",
  },
  {
    title: "mask-scroll",
    tech: "css",
    video: "https://cdn.deathstalker.dev/videos/mask-scroll-fade.mp4",
  },
  {
    title: "ios-input-morph-text",
    tech: "motion",
    video: "https://cdn.deathstalker.dev/videos/ios-input-morph.mp4",
  },
  {
    title: "shared-layout-animation",
    tech: "motion",
    video: "https://cdn.deathstalker.dev/videos/shared-layout.mp4",
  },
];

export const labsComponents: Partial<Record<ComponentTitles, React.ComponentType>> = {
  "submit-button-states": SubmitButtonStates,
  "ios-input-morph-text": IOSInputMorphText,
  "mask-scroll": MaskScroll,
  "shared-layout-animation": MotionSharedLayout,
};
