import { Accessibility, Library, Paintbrush, Search, Settings } from "lucide-react";
import {
  GroupAccordion,
  GroupAccordionContent,
  GroupAccordionItem,
  GroupAccordionTrigger,
} from "@/components/labs/components/group-accordion";
import { cn } from "@/lib/utils";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/code-block";

function getUsage() {
  return `<GroupAccordion>
  <GroupAccordionItem
    value="item-1"
    className={cn(
      "bg-mauve-100 text-mauve-700 border border-transparent",
      "data-[open=true]:text-mauve-900",
      "hover:border-mauve-300 data-[open=true]:border-mauve-300",
      "transition-[color,border-radius] ease-out-cubic duration-300",
      "group-has-data-[open=true]/accordion:text-mauve-400 data-[open=true]:text-mauve-800",
    )}
  >
    <GroupAccordionTrigger
      className={cn(
        "data-[open=true]:pb-2 transition-[scale,padding] ease-out-cubic duration-300",
        "active:scale-[0.97] ease-out",
      )}
    >
      item-1
    </GroupAccordionTrigger>

    <GroupAccordionContent className="bg-mauve-100 text-mauve-600">
      <p className="mb-0.5">content-1</p>
    </GroupAccordionContent>
  </GroupAccordionItem>
</GroupAccordion>`;
}

const groupAccordionConfig = {
  slug: "group-accordion",
  title: "group accordion",
  subHeading: "a group accordion with improved visual feedback.",
  description: (
    <>
      <p>
        this component is a custom accordion built with react state and context. the parent keeps track of the currently
        open item. each accordion item receives a unique <Code>value</Code> that is used to decide whether it should
        render in the open or closed state.
      </p>
      <p>
        the parent also reads the direct child items to understand their order. that lets each item know if it is first,
        last, before the open item or after the open item. those states are exposed as data attributes, so the rounded
        corners and spacing can change based on where the active item sits in the group.
      </p>
      <p>
        the content animation is handled with css instead of measuring height in javascript. the content wrapper
        transitions between <Code>grid-rows-[0fr]</Code> and <Code>grid-rows-[1fr]</Code>, while the inner content fades
        in. the trigger and content are also connected with aria attributes so the open state and controlled panel are
        clear to assistive technologies.
      </p>
      <p>
        the component can be customized via classes and data attributes, so the behavior can stay the same while the
        presentation changes. colors, borders, spacing, active item styles and timing can be adjusted on{" "}
        <Code>GroupAccordionItem</Code>, <Code>GroupAccordionTrigger</Code> and <Code>GroupAccordionContent</Code>{" "}
        without changing the state logic.
      </p>
      <CodeBlock
        language="typescript"
        code={getUsage()}
      />
    </>
  ),
  tech: "css",
  video: "https://cdn.deathstalker.dev/videos/group-accordion-css.mp4",
  component: GroupAccordionComponent,
};

export { groupAccordionConfig };

function GroupAccordionComponent() {
  return (
    <GroupAccordion className="group/accordion max-w-[420px] w-full text-sm">
      {GROUP_ACCORDION_ITEMS.map(({ value, label, icon: Icon, content }) => (
        <GroupAccordionItem
          key={value}
          value={value}
          className={cn(
            "bg-mauve-100 text-mauve-700 border border-transparent",
            "data-[open=true]:text-mauve-900",
            "hover:border-mauve-300 data-[open=true]:border-mauve-300",
            "transition-[color,border-radius] ease-out-cubic duration-300",
            "group-has-data-[open=true]/accordion:text-mauve-400 data-[open=true]:text-mauve-800",
          )}
        >
          <GroupAccordionTrigger
            className={cn(
              "data-[open=true]:pb-2 transition-[scale,padding] ease-out-cubic duration-300",
              "active:scale-[0.97] ease-out",
            )}
          >
            <div className="inline-flex items-center gap-2">
              <Icon className="size-3.5" />
              <span>{label}</span>
            </div>
          </GroupAccordionTrigger>

          <GroupAccordionContent className="bg-mauve-100 text-mauve-600">
            <p className="mb-0.5">{content}</p>
          </GroupAccordionContent>
        </GroupAccordionItem>
      ))}
    </GroupAccordion>
  );
}

const GROUP_ACCORDION_ITEMS = [
  {
    value: "item-1",
    label: "What is this group accordion?",
    icon: Search,
    content:
      "A set of interactive panels where one item can be opened at a time. React state tracks the active item, while CSS handles the animation.",
  },
  {
    value: "item-2",
    label: "How does the component work?",
    icon: Settings,
    content:
      "The open and closed state is controlled via React state and the height animation is done with grid rows CSS property. Neighboring items also adjust their border radius based on the active item.",
  },
  {
    value: "item-3",
    label: "Which libraries are used?",
    icon: Library,
    content:
      "The accordion behavior is implemented with React state and context. Styling and transitions are handled with Tailwind CSS. No other libraries are used.",
  },
  {
    value: "item-4",
    label: "Is the component customisable?",
    icon: Paintbrush,
    content: (
      <>
        Yes. You can customize colors, spacing, animations, active item behaviour and many other properties using data
        attributes <Code className="bg-zinc-300 border-zinc-400 text-foreground">data-open=true</Code>.
      </>
    ),
  },
  {
    value: "item-5",
    label: "Is the component accessible?",
    icon: Accessibility,
    content:
      "It uses the aria-expanded attribute to indicate the current state of the accordion item. It also uses the aria-controls attribute to associate the trigger with the content.",
  },
] as const;
