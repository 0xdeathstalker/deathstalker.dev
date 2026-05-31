import type { Lab } from "@/lib/types";
import { buttonStatesConfig } from "./button-states.config";
import { chatInputConfig } from "./chat-input.config";
import { copyButtonConfig } from "./copy-button.config";
import { groupAccordionConfig } from "./group-accordion.config";
import { iosInputMorphTextConfig } from "./ios-input-morph-text.config";
import { morphTextConfig } from "./morph-text.config";
import { motionSharedLayoutConfig } from "./motion-shared-layout.config";
import { nestedDropdownMenuConfig } from "./nested-dropdown-menu.config";
import { maskScrollAreaConfig } from "./scroll-fade-effect.config";
import { spritesConfig } from "./sprites.config";
import { testimonialMarqueeConfig } from "./testimonial-marquee.config";
import { transitionTabsConfig } from "./transition-tabs.config";
import { tooltipGroupConfig } from "./tooltip-group.config";

export const labs: Array<Lab> = [
  buttonStatesConfig,
  spritesConfig,
  copyButtonConfig,
  testimonialMarqueeConfig,
  maskScrollAreaConfig,
  iosInputMorphTextConfig,
  motionSharedLayoutConfig,
  transitionTabsConfig,
  tooltipGroupConfig,
  morphTextConfig,
  groupAccordionConfig,
  nestedDropdownMenuConfig,
  chatInputConfig,
];
