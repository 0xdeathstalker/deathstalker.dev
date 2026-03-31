import type { Lab } from "@/lib/types";
import { buttonStatesConfig } from "./button-states.config";
import { copyButtonConfig } from "./copy-button.config";
import { iosInputMorphTextConfig } from "./ios-input-morph-text.config";
import { motionSharedLayoutConfig } from "./motion-shared-layout.config";
import { maskScrollAreaConfig } from "./scroll-fade-effect.config";
import { testimonialMarqueeConfig } from "./testimonial-marquee.config";
import { transitionTabsConfig } from "./transition-tabs.config";

export const labs: Array<Lab> = [
  buttonStatesConfig,
  copyButtonConfig,
  testimonialMarqueeConfig,
  maskScrollAreaConfig,
  iosInputMorphTextConfig,
  motionSharedLayoutConfig,
  transitionTabsConfig,
];
