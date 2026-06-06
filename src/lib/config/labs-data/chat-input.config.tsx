import { ChatInput } from "@/components/labs/components/chat-input";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/code-block";
import { InlineLink } from "@/components/ui/inline-link";

const getAccessoryGroupLogic = () =>
  `{text === "" ? (
  <motion.div
    key="accessory-buttons"
    variants={accessoryGroupVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {accessoryButtons.map(({ icon: Icon, label }) => (
      <motion.button key={label} variants={accessoryItemVariants}>
        <Icon />
      </motion.button>
    ))}
  </motion.div>
) : (
  <motion.button key="add-button">
    <Plus />
  </motion.button>
)}`;

const getAccessoryVariantsLogic = () =>
  `const accessoryGroupVariants: Variants = {
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(8px)",
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};`;

const chatInputConfig = {
  slug: "chat-input",
  title: "animated chat input",
  subHeading: "chat input interaction with motion and css.",
  description: (
    <>
      <p>
        this is a compact chat input interaction inspired by{" "}
        <InlineLink href="https://jakub.kr/components/input-field">@jakub.kr</InlineLink>. the focus here is not just
        the input field itself, but how the surrounding controls reconfigure as the user moves from an idle state to a
        ready-to-send state.
      </p>
      <p>
        the component is driven by a single piece of state, <Code>text</Code>. when it is empty, the input shows a row
        of accessory actions on the left and a voice button on the right. once the user starts typing, those controls
        collapse into a minimal <Code>+</Code> button and a send action.
      </p>
      <CodeBlock
        code={getAccessoryGroupLogic()}
        language="tsx"
      />
      <p>
        <Code>AnimatePresence</Code> handles the enter and exit transitions for these mutually exclusive states. rather
        than hiding and showing elements abruptly, each side of the input swaps with a short scale, opacity and blur
        animation, which makes the control feel more tactile.
      </p>
      <p>
        the form itself uses motion layout animation so the surrounding elements can shift without the container feeling
        rigid. the accessory button cluster uses parent and child variants. the parent controls the overall presence of
        the group, while <Code>staggerChildren</Code> sequences the individual buttons as they animate in and out.
      </p>
      <CodeBlock
        code={getAccessoryVariantsLogic()}
        language="typescript"
      />
      <p>
        small details do a lot of the work here: rounded pill geometry, subtle rings, hover feedback, active scale and
        very short motion timings.
      </p>
    </>
  ),
  tech: "motion",
  video: "https://cdn.deathstalker.dev/videos/new/chat-input.mp4",
  component: ChatInput,
};

export { chatInputConfig };
