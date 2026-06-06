import { NestedDropdownMenu } from "@/components/labs/components/nested-dropdown-menu";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/code-block";
import { InlineLink } from "@/components/ui/inline-link";

function getResizeObserverSnippet() {
  return `const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    setHeight(entry.target.clientHeight);
  }
});

observer.observe(dropdown);`;
}

const nestedDropdownMenuConfig = {
  slug: "nested-dropdown-menu",
  title: "nested dropdown menu",
  subHeading: "a multi-level dropdown menu with smooth animations.",
  description: (
    <>
      <p>
        an exploration to recreate the dropdown interaction from{" "}
        <InlineLink href="https://www.youtube.com">youtube</InlineLink> video settings by following the best practices
        preached by <InlineLink href="https://x.com/emilkowalski">@emilkowalski</InlineLink>.
      </p>
      <p>
        this component renders a nested menu from a tree of menu items. the top level is shown by default and when there
        is a submenu available, then the component moves into that submenu instead of opening a separate flyout.
      </p>
      <p>
        the current menu is stored in react state, while a history stack keeps track of the previous levels. moving
        forward pushes the selected submenu into history and the back button removes the previously navigated level so
        the menu can return to the previous level.
      </p>
      <p>
        the slide animation is controlled by <InlineLink href="https://motion.dev">motion</InlineLink> and the{" "}
        <Code>custom</Code> property is used to make it direction aware based on the navigation. when the user goes
        deeper, the panel slides in from the right and when they go back it slides in from the left. the dropdown height
        is measured with <Code>ResizeObserver</Code>, so the outer container can animate smoothly as each level has a
        different number of items.
      </p>
      <CodeBlock
        language="typescript"
        code={getResizeObserverSnippet()}
      />
    </>
  ),
  tech: "css",
  video: "https://cdn.deathstalker.dev/videos/new/dropdown-menu.mp4",
  component: NestedDropdownMenu,
};

export { nestedDropdownMenuConfig };
