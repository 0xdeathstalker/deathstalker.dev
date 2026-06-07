import { SubmitButtonStates } from "@/components/labs/components/button-states";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/code-block";

const getButtonStyles = () =>
  `className={cn(
    ...
    buttonState === "success"
    ? "bg-green-200 border-green-500/20"
    : buttonState === "failure"
      ? "bg-red-200 border-red-500/20"
      : "bg-indigo-50 border-indigo-500/20",
)}`;

const getStateStyles = () =>
  `{(Object.keys(BUTTON_STATES) as ButtonState[]).map((state) => (
  <span
    ...
    className={cn(
      state !== "idle" && "absolute inset-0 flex items-center justify-center",
      "transition-all ease-out duration-200",
      buttonState === state ? "opacity-100 blur-none" : "opacity-0 blur-sm",
      BUTTON_STATES[state].className,
    )}
  >
    {BUTTON_STATES[state].label}
  </span>
))}`;

const buttonStatesConfig = {
  slug: "submit-button-states",
  title: "submit button states",
  subHeading: "an example to showcase animating button states with pure css.",
  description: (
    <>
      <p>
        this is an exploration into animating button states with pure css. in an interview i was asked: how do you
        animate an exit transition with pure css in a react application? the problem is that react removes elements from
        the dom immediately on unmount, without waiting for any animation to finish. this is the same limitation that{" "}
        <Code>AnimatePresence</Code> from motion solves but, here the goal was to achieve it without any library.
      </p>
      <p>
        the button in the above example has four states: <Code>idle</Code>, <Code>loading</Code>, <Code>success</Code>{" "}
        and <Code>failure</Code>. instead of conditionally rendering each state, all four are kept in the dom at all
        times. the active state is revealed with <Code>opacity-100 blur-none</Code> while the rest are hidden with{" "}
        <Code>opacity-0 blur-sm</Code>, mimicking an enter and exit animation entirely through css transitions.
      </p>
      <CodeBlock
        code={getStateStyles()}
        language="typescript"
      />
      <div>
        <p>the button's background colour also transitions between states:</p>
        <ul className="my-1">
          <li className="flex items-center w-full leading-snug">
            <div className="pr-2 self-start text-muted-foreground/40">•</div>
            <span>idle state: indigo</span>
          </li>

          <li className="flex items-center w-full leading-snug">
            <div className="pr-2 self-start text-muted-foreground/40">•</div>
            <span>loading state: indigo, label swapped with a spinning icon and updated text</span>
          </li>

          <li className="flex items-center w-full leading-snug">
            <div className="pr-2 self-start text-muted-foreground/40">•</div>
            <span>success state: green</span>
          </li>

          <li className="flex items-center w-full leading-snug">
            <div className="pr-2 self-start text-muted-foreground/40">•</div>
            <span>failure state: red</span>
          </li>
        </ul>
        <p> this reinforces the feedback visually without any javascript animation.</p>
      </div>
      <CodeBlock
        code={getButtonStyles()}
        language="typescript"
      />
      <div>
        <p className="mb-2">advantages of this approach:</p>
        <ul className="my-1">
          <li className="flex items-center w-full leading-snug">
            <div className="pr-2 self-start text-muted-foreground/40">•</div>
            <span>no external library is used. pure css and react state is all that's needed</span>
          </li>
          <li className="flex items-center w-full leading-snug">
            <div className="pr-2 self-start text-muted-foreground/40">•</div>
            <span>both enter and exit animations work correctly since nothing is ever unmounted</span>
          </li>
          <li className="flex items-center w-full leading-snug">
            <div className="pr-2 self-start text-muted-foreground/40">•</div>
            <span>
              the button size stays stable as the idle <Code>span</Code> holds the layout while other states layer on
              top absolutely
            </span>
          </li>
        </ul>
        <p className="mt-3 mb-2">disadvantages:</p>
        <ul className="my-1">
          <li className="flex items-center w-full leading-snug">
            <div className="pr-2 self-start text-muted-foreground/40">•</div>
            <span>all states are always in the dom, which doesn't scale well with many or complex states</span>
          </li>
          <li className="flex items-center w-full leading-snug">
            <div className="pr-2 self-start text-muted-foreground/40">•</div>
            <span>
              non-active states need <Code>aria-hidden</Code> to prevent screen readers from announcing all labels
              simultaneously
            </span>
          </li>
        </ul>
      </div>
      <p>
        overall, this is a lightweight technique well-suited for simple, predictable state transitions. it is also a
        good fit when bundle size is a constraint, for example, in performance-critical apps where avoiding an animation
        library dependency matters. for anything more complex like dynamic content, variable label widths or sequenced
        animations, reaching for <Code>AnimatePresence</Code> is the more practical choice.
      </p>
    </>
  ),
  tech: "css",
  video: "https://cdn.deathstalker.dev/videos/button-states.mp4",
  component: SubmitButtonStates,
};

export { buttonStatesConfig };
