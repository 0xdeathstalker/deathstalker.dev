import { CopyButtonDemo } from "@/components/labs/components/copy-button-demo";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/code-block";
import { InlineLink } from "@/components/ui/inline-link";

const getMotionVariantsLogic = () =>
  `const motionVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, filter: "blur(3px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.8, filter: "blur(3px)" },
};

const motionProps: HTMLMotionProps<"div"> = {
  variants: motionVariants,
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] },
};`;

const getCopyButtonPropsLogic = () =>
  `type CopyButtonProps = React.ComponentProps<typeof Button> & {
  text: string;
  onCopySuccess?: (text: string) => void;
  onCopyError?: (error: Error) => void;
} & Pick<CopyStateIconProps, "copyIcon" | "successIcon" | "errorIcon">;`;

const getResetDelayLogic = () =>
  `const copy = React.useCallback(
  async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("success");
      onCopySuccess?.(text);
    } catch (error) {
      setCopyState("error");
      onCopyError?.(error instanceof Error ? error : new Error("Failed to copy text!"));
    } finally {
      timeoutRef.current = setTimeout(() => {
        setCopyState("idle");
      }, resetDelay);
    }
  },
  [onCopyError, onCopySuccess, resetDelay],
);`;

const copyButtonConfig = {
  slug: "copy-button",
  title: "copy button",
  subHeading: "a clipboard copy button with animated visual feedback.",
  description: (
    <>
      <p>
        i came across{" "}
        <InlineLink href="https://x.com/emilkowalski/status/2028470888090280392?s=20">@emilkowalski's post</InlineLink>{" "}
        about masking imperfections with blur if neither easing nor timing does the job. after understanding his
        explanation i decided to recreate the similar effect and ended up with a reusable component that i almost use
        everywhere.
      </p>
      <p>
        the copy button manages three distinct states: <Code>idle</Code>, <Code>success</Code>, and <Code>error</Code>{" "}
        allowing us to render a different icon for each. a dedicated <Code>CopyStateIcon</Code> component handles this
        by switching between icons using <Code>AnimatePresence</Code> with <Code>mode="popLayout"</Code>, so the
        outgoing icon animates out before the incoming one animates in.
      </p>
      <p>
        each icon transition runs the same shared motion variants: fading, scaling, and blurring in and out over{" "}
        <Code>150ms</Code>. all three states reuse the same <Code>motionProps</Code> object, so the transition feels
        consistent regardless of which state is entered.
      </p>
      <CodeBlock
        code={getMotionVariantsLogic()}
        language="typescript"
      />
      <p>
        the component accepts <Code>onCopySuccess</Code> and <Code>onCopyError</Code> callbacks, both are optional. on
        success, the copied text is passed back to the caller. on failure, the caught error is forwarded. each icon slot
        is also overridable, so the button can be adapted to any visual context without forking the component.
      </p>
      <CodeBlock
        code={getCopyButtonPropsLogic()}
        language="typescript"
      />
      <p>
        state is managed by the <Code>useCopyToClipboard</Code> hook, which writes to the clipboard via{" "}
        <Code>navigator.clipboard.writeText</Code> and automatically resets back to <Code>idle</Code> after a
        configurable <Code>resetDelay</Code> (default <Code>2000ms</Code>). a ref-tracked timeout ensures that rapid
        repeated clicks cancel the previous reset before starting a new one.
      </p>
      <CodeBlock
        code={getResetDelayLogic()}
        language="typescript"
      />
    </>
  ),
  tech: "motion",
  video: "https://cdn.deathstalker.dev/videos/copy-button.mp4",
  component: CopyButtonDemo,
};

export { copyButtonConfig };
