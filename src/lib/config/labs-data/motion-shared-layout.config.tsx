import { MotionSharedLayout } from "@/components/labs/shared-layout";
import { Code } from "@/components/ui/code";
import Link from "next/link";

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

export { motionSharedLayoutConfig };
