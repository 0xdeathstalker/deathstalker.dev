import { MorphTextDemo } from "@/components/labs/components/morph-text-demo";
import { Code } from "@/components/ui/code";
import { InlineLink } from "@/components/ui/inline-link";

const morphTextConfig = {
  slug: "morph-text",
  title: "morph text",
  subHeading: "an example to showcase text morphing between button states using motion.",
  description: (
    <>
      <p>
        this demo explores a simple interaction where the button label morphs between idle, loading and success states.
        instead of swapping the full text, each character is animated individually so the transition feels more
        connected and intentional as explained by{" "}
        <InlineLink href="https://x.com/emilkowalski">@emilkowalski</InlineLink>.
      </p>
      <p>
        the core idea is to split the text into characters and assign each one a stable key and matching{" "}
        <Code>layoutId</Code>. that allows motion to map identical characters across states and animate them smoothly
        while fading entering and exiting letters in and out.
      </p>
      <p>
        this is a lightweight extension of motion's layout animation model and works well for buttons, status labels and
        other compact UI text transitions. these types of animations help the user to notice such changes more
        effectively and by morphing the text we can help highlight the transition in a subtle way. it is inspired fom
        emil's showcase of family wallet's fluid interaction in{" "}
        <InlineLink href="https://animations.dev">animations.dev</InlineLink>.
      </p>
    </>
  ),
  tech: "motion",
  video: "https://cdn.deathstalker.dev/videos/morph-text.mp4",
  component: MorphTextDemo,
};

export { morphTextConfig };
