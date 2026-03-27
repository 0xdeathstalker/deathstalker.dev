import { SubmitButtonStates } from "@/components/labs/button-states";
import { CopyButtonDemo } from "@/components/labs/copy-button-demo";
import { IOSInputMorphText } from "@/components/labs/input-morph-text";
import { MaskScroll } from "@/components/labs/mask-scroll";
import { MotionSharedLayout } from "@/components/labs/shared-layout";
import { TestimonialMarquee } from "@/components/labs/testimonial-marquee";
import { Code } from "@/components/ui/code";
import { CopyButton } from "@/components/ui/copy-button";
import type { Lab } from "@/lib/types";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atelierDuneLight,
  atelierSavannaLight,
  atomOneLight,
  docco,
  github,
  googlecode,
  kimbieLight,
  paraisoLight,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

const motionSharedLayoutConfig = {
  slug: "shared-layout-animation",
  title: "shared layout animation",
  subHeading: "an example demonstrating shared layout animation with motion.",
  description: [
    <p>
      i tried to recreate the shared layout animation between a grid of items and a full screen modal from{" "}
      <Link
        href="https://motion.dev/examples/react-modal-shared-layout"
        target="_blank"
        className="font-semibold underline underline-offset-3 decoration-mauve-300 hover:decoration-mauve-800 transition-colors ease-in-out"
      >
        motion.dev example
      </Link>
      . at first this might seem to be difficult but one can easily get it right once he understands the core principle.
    </p>,
    <p>
      with the help of{" "}
      <Link
        href="https://www.framer.com/motion/layout-animations/#shared-layout-animations"
        target="_blank"
        className="font-semibold underline underline-offset-3 decoration-mauve-300 hover:decoration-mauve-800 transition-colors ease-in-out"
      >
        shared layout animations support
      </Link>{" "}
      from motion, we can easily connect two elements and create a smooth transition between them. we don't need to move
      an item to have the morph effect.
    </p>,
    <p className="mb-4">
      the trick here is to use <Code>layoutId</Code> prop to connect the two elements, which tells the motion library to
      smoothly transition between the exit and the enter animation. we need to use <Code>Animate Presence</Code> to
      create the exit animation for the modal and the overlay. <Code>Animate Presence</Code> component is used to keep
      the exiting element in the DOM until its exit animation has finished. therefore, we get our desired layout
      animation.
    </p>,
  ],
  tech: "motion",
  video: "https://cdn.deathstalker.dev/videos/shared-layout.mp4",
  component: MotionSharedLayout,
};

const iosInputMorphTextConfig = {
  slug: "ios-input-morph-text",
  title: "input text morph",
  subHeading: "an example to showcase input text morphing into message using motion.",
  description: [
    <p>
      an attempt to recreate the famous ios style imessage animation where the input text morphs into the message when
      sent. initially i struggled to create the seamless morphing animation when the message 'travels' from input box to
      the chat area. it was tricky to handle the multi-line input text because when typing it should not spill over the
      input box.
    </p>,
    <p>
      the trick here is to use <Code>layoutId</Code> to connect the input text to the message. since we cannot access
      the text in the input box to pass the <Code>layoutId</Code> prop, we need to create a pseudo input text that
      remains hidden while typing but gets animated to the message in the chat once sent. this re-creates our desired
      interactive animation.
    </p>,
    <p className="mb-4">
      this was inspired by{" "}
      <Link
        href="https://x.com/ibelick"
        target="_blank"
        className="font-semibold underline underline-offset-3 decoration-mauve-300 hover:decoration-mauve-800 transition-colors ease-in-out"
      >
        @ibelick
      </Link>
      's original implementation.
    </p>,
  ],
  tech: "motion",
  video: "https://cdn.deathstalker.dev/videos/ios-input-morph.mp4",
  component: IOSInputMorphText,
};

const getMaskStyles = () =>
  `mask-image:
  linear-gradient(to top, transparent, var(--foreground) 90%),
  linear-gradient(to bottom, transparent 0%, var(--foreground) 100%),
  linear-gradient(var(--background), var(--background));

mask-size:
  100% var(--top-mask-height),
  100% var(--bottom-mask-height),
  100% 100%;

mask-position:
  0 0,
  0 100%,
  0 0;
  
mask-composite: exclude;`;

const getPropertiesStyles = () =>
  `@property --top-mask-height {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}

@property --bottom-mask-height {
  syntax: "<length>";
  inherits: false;
  initial-value: 90px;
}`;

const getAnimationStyles = () =>
  `animation-name: show-top-mask, hide-bottom-mask;
animation-timeline: scroll(self), scroll(self);
animation-range:
  0 var(--scroll-buffer),
  calc(100% - var(--scroll-buffer)) 100%;
animation-fill-mode: both;`;

const maskScrollAreaConfig = {
  slug: "mask-scroll",
  title: "mask scroll",
  subHeading: "a scroll container that fades the content edges upon scrolling",
  description: [
    <p>
      after coming across{" "}
      <Link
        href="https://x.com/sorenblank/status/1982192826956849243?s=20"
        target="_blank"
        className="font-semibold underline underline-offset-3 decoration-mauve-300 hover:decoration-mauve-800 transition-colors ease-in-out"
      >
        @sorenblank's post
      </Link>{" "}
      about using <Code>animation-timeline</Code> css property to create a masked scroll area that fades the content
      around the edges as the user scrolls and{" "}
      <Link
        href="https://x.com/jh3yy/status/1789359851094614449?s=20"
        target="_blank"
        className="font-semibold underline underline-offset-3 decoration-mauve-300 hover:decoration-mauve-800 transition-colors ease-in-out"
      >
        @jh3yy
      </Link>
      's implementation of the same, i wanted to recreate that. as a result, i decided to dig deeper and explore more
      about <Code>animation-timeline</Code> from the{" "}
      <Link
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline"
        target="_blank"
        className="font-semibold underline underline-offset-3 decoration-mauve-300 hover:decoration-mauve-800 transition-colors ease-in-out"
      >
        mdn docs
      </Link>
      .
    </p>,
    <div>
      <p>the progressive scroll fade effect requires three layers:</p>
      <ul className="h-fit">
        <li className="inline-flex items-center w-full leading-snug flex-wrap">
          <div className="pr-2 self-start text-muted-foreground/40">•</div>
          <span className="font-medium">top gradient mask</span>- fades the content at the top
        </li>
        <li className="inline-flex items-center w-full leading-snug flex-wrap">
          <div className="pr-2 self-start text-muted-foreground/40">•</div>
          <span className="font-medium">bottom gradient mask</span>- fades the content at the bottom
        </li>
        <li className="inline-flex items-center w-full leading-snug flex-wrap">
          <div className="pr-2 self-start text-muted-foreground/40">•</div>
          <span className="font-medium">solid background mask</span>- shows the main visible content
        </li>
      </ul>
    </div>,
    <div className="relative p-1 border border-border/40 rounded-lg overflow-hidden **:font-mono">
      <CopyButton
        variant="ghost"
        text={getMaskStyles()}
        className="absolute top-1.5 right-1.5"
      />
      <SyntaxHighlighter
        style={github}
        language="css"
        showLineNumbers
        lineNumberStyle={{ color: "var(--color-taupe-400)" }}
        customStyle={{ backgroundColor: "var(--color-mauve-100)", fontSize: 12, borderRadius: 8, padding: 8 }}
      >
        {getMaskStyles()}
      </SyntaxHighlighter>
    </div>,
    <p>
      here we define three layers (top, bottom and solid) with <Code>mask-image</Code>. with <Code>mask-size</Code> we
      are defining how tall each layer should be. the top gradient grows from <span className="font-mono">0px</span> as
      we scroll while the bottom gradient shrinks to <span className="font-mono">0px</span> as we reach the end. the
      solid background covers the full container to show the visible content.
    </p>,
    <p>
      then we position the layers in the container with <Code>mask-position</Code>. the top layer is anchored to the top
      left <Code>0 0</Code> since this layer grows from the top, it needs to start at the top edge. the bottom layer is
      anchored to the bottom left <Code>0 100%</Code>. <span className="font-mono">100%</span> on the y-axis aligns the
      layer with the bottom of the container. since it reaches <span className="font-mono">0px</span> height when we
      reach the end, it disappears from the bottom-up. the solid layer is also anchored to the top left but since it
      covers everything so position doesn't matter much.
    </p>,
    <p>
      <Code>mask-composite</Code> subtracts the gradient mask from the solid background layer, creating the faded areas.
      you can think of it as wherever the gradient mask is transparent, the solid layer is punched out making that
      region of the content invisible.
    </p>,
    <p>
      now we need to animate the mask heights. to do that we need to define them as custom properties. without{" "}
      <Code>@property</Code> rule, css custom properties can't be animated because they are treated as string and their
      values can't be interpolated. the <Code>syntax</Code> field tells the browser that this is a length value and now
      it can be interpolated.
    </p>,
    <div className="relative p-1 border border-border/40 rounded-lg overflow-hidden **:font-mono">
      <CopyButton
        variant="ghost"
        text={getPropertiesStyles()}
        className="absolute top-1.5 right-1.5"
      />
      <SyntaxHighlighter
        // style={github}
        language="css"
        showLineNumbers
        lineNumberStyle={{ color: "var(--color-taupe-400)" }}
        customStyle={{ backgroundColor: "var(--color-mauve-100)", fontSize: 12, borderRadius: 8, padding: 8 }}
      >
        {getPropertiesStyles()}
      </SyntaxHighlighter>
    </div>,
    <p>
      now we need to link the animation with the scroll progress and this is where we use{" "}
      <Code>animation-timeline</Code>.
    </p>,
    <div className="relative p-1 border border-border/40 rounded-lg overflow-hidden **:font-mono">
      <CopyButton
        variant="ghost"
        text={getAnimationStyles()}
        className="absolute top-1.5 right-1.5"
      />
      <SyntaxHighlighter
        style={github}
        language="css"
        showLineNumbers
        lineNumberStyle={{ color: "var(--color-taupe-400)" }}
        customStyle={{ backgroundColor: "var(--color-mauve-100)", fontSize: 12, borderRadius: 8, padding: 8 }}
      >
        {getAnimationStyles()}
      </SyntaxHighlighter>
    </div>,
    <p>
      <Code>animation-timeline: scroll(self), scroll(self);</Code> means that the animation is driven by the element's
      own scroll position, not the page scroll. as we scroll inside the container, both animations progress.
    </p>,
    <p>
      things get interesting with <Code>animation-range</Code> because each of our animations gets its own range.{" "}
      <Code>show-top-mask</Code> runs from scroll position <span className="font-mono">0</span> to{" "}
      <Code>--scroll-buffer: 2rem</Code>. so the top gradient appears in the first 2rem of scrolling and it remains
      completely visible after the animation has been finished. <Code>--hide-bottom-mask</Code> runs from{" "}
      <span className="font-mono">calc(100% - 2rem)</span> to <span className="font-mono">100%</span> i.e. the last 2rem
      before the end. as a result, the bottom mask disappears as we reach the bottom.
    </p>,
    <p>
      finally we need <Code>animation-fill-mode</Code> to be <Code>both</Code> to keep each of the animation frozen at
      its start state before it begins and at its end state after it finishes. without this, the top mask would snap
      back to invisible before we start scrolling and the bottom mask would snap back after it finishes.
    </p>,
    <p className="mb-4">
      therefore, we have a container that fades the content around the edges as we scroll. we can create the horizontal
      scroll fade effect by replicating the same logic by animating the <Code>width</Code> property instead of{" "}
      <Code>height</Code>.
    </p>,
  ],
  tech: "css",
  video: "https://cdn.deathstalker.dev/videos/mask-scroll-fade.mp4",
  component: MaskScroll,
};

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
