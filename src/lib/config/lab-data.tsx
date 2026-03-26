import { SubmitButtonStates } from "@/components/labs/button-states";
import { CopyButtonDemo } from "@/components/labs/copy-button-demo";
import { IOSInputMorphText } from "@/components/labs/input-morph-text";
import { MaskScroll } from "@/components/labs/mask-scroll";
import { MotionSharedLayout } from "@/components/labs/shared-layout";
import { TestimonialMarquee } from "@/components/labs/testimonial-marquee";
import type { Lab } from "@/lib/types";
import Link from "next/link";

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
  {
    slug: "mask-scroll",
    title: "mask scroll",
    subHeading: "",
    description: [""],
    tech: "css",
    video: "https://cdn.deathstalker.dev/videos/mask-scroll-fade.mp4",
    component: MaskScroll,
  },
  {
    slug: "ios-input-morph-text",
    title: "input text morph",
    subHeading: "an example to showcase input text morphing into message using motion.",
    description: [
      <p>
        an attempt to recreate the famous ios style imessage animation where the input text morphs into the message when
        sent. initially i struggled in making the morphing animation seamless when the message 'travels' from input box
        to the chat area. it was tricky to handle the multi-line input text such that when typing it should not spill
        over the input box.
      </p>,
      <p>
        the trick here is to use{" "}
        <code className="font-mono bg-mauve-100 border py-0.5 px-1 rounded-md text-xs">layoutId</code> to connect the
        input text to the message. since we cannot access the text in the input box to pass the{" "}
        <code className="font-mono bg-mauve-100 border py-0.5 px-1 rounded-md text-xs">layoutId</code>, we need to
        create a pseudo input text that remains hidden while typing but gets animated to the message in the chat once
        sent.
      </p>,
      <p>
        this was inspired by{" "}
        <Link
          href=""
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
  },
  {
    slug: "shared-layout-animation",
    title: "shared layout animation",
    subHeading: "an example demonstrating shared layout animation with motion.",
    description: [
      <p>
        i tried to recreate the shared layout animation between a grid of items and a full screen modal using motion. at
        first this might seem to be difficult but one can easily get the hang of it once he understands the core
        principle.
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
        from motion, we can easily connect two elements and create a smooth transition between them. we don't need to
        move an item to have the morph effect.
      </p>,
      <p>
        the trick here is to connect the two elements with{" "}
        <code className="font-mono bg-mauve-100 border py-0.5 px-1 rounded-md text-xs">layoutId</code> which indicates
        the motion library to smoothly transition between them. we also need{" "}
        <code className="font-mono bg-mauve-100 border py-0.5 px-1 rounded-md text-xs">Animate Presence</code> to create
        the exit animation for the modal and overlay.{" "}
        <code className="font-mono bg-mauve-100 border py-0.5 px-1 rounded-md text-xs">Animate Presence</code> component
        is used to keep the exiting element in the DOM until its exit animation has finished.
      </p>,
    ],
    tech: "motion",
    video: "https://cdn.deathstalker.dev/videos/shared-layout.mp4",
    component: MotionSharedLayout,
  },
];
