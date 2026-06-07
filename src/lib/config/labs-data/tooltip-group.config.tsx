import { TooltipGroupComponent } from "@/components/labs/components/tooltip-group";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/code-block";

const getTooltipStateLogic = () =>
  `const open = activeId === id;
const skipExitAnimation = activeId !== null && activeId !== id;

const handleEnter = React.useCallback(() => {
  clearCloseTimer();
  skipEnterAnimation.current = activeId !== null && activeId !== id;
  setActiveId(id);
}, [activeId, clearCloseTimer, id, setActiveId]);`;

const getContentAnimationLogic = () =>
  `<AnimatePresence custom={skipExitAnimation}>
  {open && (
    <motion.div
      initial={skipEnterAnimation.current ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit="exit"
      transition={{ duration: 0.15 }}
    />
  )}
</AnimatePresence>`;

const tooltipGroupConfig = {
  slug: "group-tooltip",
  title: "grouped tooltip",
  subHeading: "a grouped tooltip interaction for compact action bars.",
  description: (
    <>
      <p>
        this component is built for clustered controls where moving between adjacent actions should feel continuous. a
        regular tooltip usually treats every item as its own isolated hover state. here, the group owns the currently
        active tooltip id, so the controls behave like one coordinated interaction.
      </p>

      <p>
        <Code>TooltipGroup</Code> provides the shared state through context. it stores the active tooltip info and keeps
        a short close timer. that small delay prevents the tooltip from disappearing immediately while the pointer moves
        from one trigger to the next, which makes dense action bars feel less flickery.
      </p>

      <p>
        each <Code>Tooltip</Code> receives its own <Code>id</Code> and compares it against the group's state. when a
        tooltip is triggered, it clears the pending close timer and makes itself active. when the pointer leaves or the
        trigger blurs, it schedules the group to close.
      </p>

      <CodeBlock
        code={getTooltipStateLogic()}
        language="typescript"
      />

      <p>
        the important detail is <Code>skipEnterAnimation</Code>. if another tooltip is already open, the next tooltip
        appears without replaying the full entrance animation. that makes lateral movement across the group feel snappy,
        while the first tooltip still gets a small fade and lift when it opens from rest.
      </p>

      <CodeBlock
        code={getContentAnimationLogic()}
        language="tsx"
      />

      <p>
        the exit animation also changes depending on why the tooltip is closing. if the user is moving to another item
        in the same group, the previous content exits immediately. if the whole group is closing, it fades and drops
        slightly. this keeps the interaction responsive without making the grouped tooltips feel abrupt.
      </p>
    </>
  ),
  tech: "motion",
  video: "https://cdn.deathstalker.dev/videos/group-tooltip.mp4",
  component: TooltipGroupComponent,
};

export { tooltipGroupConfig };
