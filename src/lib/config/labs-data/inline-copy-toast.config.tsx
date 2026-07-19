import { TwitterInlineCopy, WalletAddressInlineCopy } from "@/components/labs/demo/inline-copy-toast";
import { Code } from "@/components/ui/code";
import { InlineLink } from "@/components/ui/inline-link";

const inlineCopyToastConfig = {
  slug: "inline-copy-toast",
  title: "inline copy toast",
  subHeading: "a copy confirmation that lives inside the component.",
  description: (
    <>
      <p>
        a copy-to-clipboard pill built with <InlineLink href="https://motion.dev">motion</InlineLink>, heavily inspired
        by an interaction from <InlineLink href="https://x.com/nitishkmrk">nitish khagwal</InlineLink> and recreated
        from scratch. instead of firing a toast to the corner of the screen, the confirmation takes over the pill
        itself: the idle view crossfades into a success view with a blur-and-scale transition and a{" "}
        <Code>clipPath</Code> wipe fills the pill to show how long the confirmation sticks around.
      </p>
      <p>
        the wipe doubles as the timer. when its animation completes, the component flips back to idle, so the visual
        progress and the actual duration can never drift apart. the success state only triggers when the clipboard write
        succeeds, copy status is announced to screen readers via a <Code>role="status"</Code> region and the blur/scale
        motion collapses to plain fades when the user prefers reduced motion.
      </p>
      <p>here is another example with default styling:</p>
      <div className="py-18 px-6 border border-mauve-200 rounded-lg flex flex-col items-center justify-center gap-4">
        <WalletAddressInlineCopy />
      </div>
    </>
  ),
  tech: "motion",
  video: "https://cdn.deathstalker.dev/videos/inline-toast.mp4",
  component: TwitterInlineCopy,
};

export { inlineCopyToastConfig };
