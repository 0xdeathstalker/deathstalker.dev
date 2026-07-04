import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import type { SocialNames } from "./site";

export const SOCIAL_ICONS: Record<SocialNames, React.JSX.Element> = {
  twitter: <TwitterIcon />,
  github: <GithubIcon />,
  linkedin: <LinkedinIcon />,
};
