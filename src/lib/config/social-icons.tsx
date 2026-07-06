import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import type { ComponentType, SVGProps } from "react";
import type { SocialNames } from "./site";

type SocialIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const SOCIAL_ICONS: Record<SocialNames, SocialIconComponent> = {
  twitter: TwitterIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
};
