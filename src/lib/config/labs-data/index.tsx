import { SubmitButtonStates } from "@/components/labs/button-states";
import { CopyButtonDemo } from "@/components/labs/copy-button-demo";
import { TestimonialMarquee } from "@/components/labs/testimonial-marquee";
import type { Lab } from "@/lib/types";
import { iosInputMorphTextConfig } from "./ios-input-morph-text.config";
import { motionSharedLayoutConfig } from "./motion-shared-layout.config";
import { maskScrollAreaConfig } from "./scroll-fade-effect.config";

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
  {
    slug: "copy-button",
    title: "copy button",
    subHeading: "",
    description: [""],
    tech: "motion",
    video: "https://cdn.deathstalker.dev/videos/copy-button.mov",
    component: CopyButtonDemo,
  },
  {
    slug: "testimonial-marquee",
    title: "testimonial marquee",
    subHeading: "",
    description: [""],
    tech: "css",
    video: "https://cdn.deathstalker.dev/videos/testimonial-marquee.mp4",
    component: TestimonialMarquee,
  },
  maskScrollAreaConfig,
  iosInputMorphTextConfig,
  motionSharedLayoutConfig,
];
