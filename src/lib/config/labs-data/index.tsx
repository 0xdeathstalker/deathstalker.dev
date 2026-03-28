import { SubmitButtonStates } from "@/components/labs/button-states";
import type { Lab } from "@/lib/types";
import { copyButtonConfig } from "./copy-button.config";
import { iosInputMorphTextConfig } from "./ios-input-morph-text.config";
import { motionSharedLayoutConfig } from "./motion-shared-layout.config";
import { maskScrollAreaConfig } from "./scroll-fade-effect.config";
import { testimonialMarqueeConfig } from "./testimonial-marquee.config";

export const labs: Array<Lab> = [
  {
    slug: "submit-button-states",
    title: "submit button states",
    subHeading: "",
    description: [""],
    tech: "css",
    video: "https://cdn.deathstalker.dev/videos/button-states.mp4",
    component: SubmitButtonStates,
  },
  copyButtonConfig,
  testimonialMarqueeConfig,
  maskScrollAreaConfig,
  iosInputMorphTextConfig,
  motionSharedLayoutConfig,
];
