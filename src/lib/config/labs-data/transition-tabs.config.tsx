import { ImageLightbox } from "@/components/image-lightbox";
import { TransitionTabs } from "@/components/labs/components/transition-tabs";
import { ColorTransitionTabs } from "@/components/labs/demo/color-transition-tabs";
import { ToggleClippathDemo } from "@/components/labs/demo/toggle-clippath-tabs";
import { Code } from "@/components/ui/code";
import { InlineLink } from "@/components/ui/inline-link";
import type { Lab } from "@/lib/types";

const transitionTabsConfig: Lab = {
  slug: "transition-tabs",
  title: "transition tabs",
  subHeading: "smooth tab indicator using css clip-path transitions",
  description: (
    <>
      <p>
        i came across this in <InlineLink href="https://paco.me/craft/tabs">@paco's craft</InlineLink> where he breaks
        down how <InlineLink href="https://stripe.com/blog">stripe's blog</InlineLink> uses this exact component. the
        goal is to have a different text color for the active tab. instead of transitioning colors or using pseudo
        elements, it relies on <Code>clip-path</Code> to show the active state. color transitions can get you close but
        you'd need to time everything perfectly or things start looking a bit off.
      </p>
      <p>
        the trick is to duplicate the tab list and style it to look like the active state. then <Code>clip-path</Code>{" "}
        is used to trim that duplicate down to only reveal the currently active tab. as the active tab changes, the{" "}
        <Code>clip-path</Code> values animate to uncover the new one. this way the transition stays seamless and you
        don't have to worry about syncing color changes at all.
      </p>
      <ColorTransitionTabs />
      <p>
        try toggling the speed and you'll spot the visual glitch the color transition creates. that's the reason{" "}
        <Code>clip-path</Code> is used instead.
      </p>
      <ImageLightbox
        src="/images/labs/transition-tabs.svg"
        alt="tabs transition using clip path logic"
      />
      <p>
        to make this work we need to calculate the <Code>clip-path</Code> values based on the active tab. the left value
        comes from the <Code>offsetLeft</Code> of the active tab element. for the right value, we take the distance from
        the right edge of the active tab to the right inner edge of the container and subtract that from 100.
      </p>
      <ToggleClippathDemo />
      <p>
        try toggling the clip path to see it in action. slowing down the transition makes the difference easier to spot.
        it might seem subtle but details like this are what make an experience feel polished. the things users don't
        consciously notice are often what separates something good from something great.
      </p>
    </>
  ),
  tech: "css",
  video: "https://cdn.deathstalker.dev/videos/clip-path-transition.mp4",
  component: TransitionTabs,
};

export { transitionTabsConfig };
