import { IOSInputMorphText } from "@/components/labs/input-morph-text";
import { Code } from "@/components/ui/code";
import Link from "next/link";

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

export { iosInputMorphTextConfig };
