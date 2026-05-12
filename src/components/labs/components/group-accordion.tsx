"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const GroupAccordionContext = React.createContext<{
  openItem: string | null;
  itemValues: string[];
  setOpenItem: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

const GroupAccordionItemContext = React.createContext<{
  open: boolean;
  toggle: () => void;
  triggerId: string;
  contentId: string;
} | null>(null);

function useGroupAccordionContext() {
  const context = React.useContext(GroupAccordionContext);
  if (!context) throw new Error("GroupAccordionComponents should be used in the accordion context provider");

  return context;
}

function useGroupAccordionItemContext() {
  const context = React.useContext(GroupAccordionItemContext);
  if (!context) throw new Error("GroupAccordionItemComponents should be used in the accordion item context provider");

  return context;
}

function GroupAccordion({ children, className, ...props }: React.ComponentProps<"div">) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const itemValues = React.Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<{ value: string }> =>
        React.isValidElement<{ value?: unknown }>(child) && typeof child.props.value === "string",
    )
    .map((child) => child.props.value);

  return (
    <GroupAccordionContext.Provider value={{ openItem, itemValues, setOpenItem }}>
      <div
        className={cn(className)}
        {...props}
      >
        {children}
      </div>
    </GroupAccordionContext.Provider>
  );
}

function GroupAccordionItem({ value, className, ...props }: React.ComponentProps<"div"> & { value: string }) {
  const { openItem, itemValues, setOpenItem } = useGroupAccordionContext();
  const reactId = React.useId();

  const open = openItem === value;
  const triggerId = `${reactId}-trigger`;
  const contentId = `${reactId}-content`;
  const hasOpenItem = openItem !== null;
  const index = itemValues.indexOf(value);
  const openItemIndex = openItem ? itemValues.indexOf(openItem) : -1;
  const isFirst = index === 0;
  const isLast = index === itemValues.length - 1;
  const isPreviousToOpen = hasOpenItem && index === openItemIndex - 1;
  const isNextToOpen = hasOpenItem && index === openItemIndex + 1;

  function toggle() {
    setOpenItem((prev) => (prev === value ? null : value));
  }

  return (
    <GroupAccordionItemContext.Provider value={{ open, toggle, triggerId, contentId }}>
      <div
        data-open={open}
        data-has-open-item={hasOpenItem}
        data-first={isFirst}
        data-last={isLast}
        data-prev-open={isPreviousToOpen}
        data-next-open={isNextToOpen}
        className={cn(
          "my-0 overflow-hidden rounded-none",
          "data-[open=true]:rounded-xl data-[has-open-item=false]:data-[first=true]:rounded-t-xl data-[has-open-item=false]:data-[last=true]:rounded-b-xl",
          "data-[has-open-item=true]:data-[first=true]:rounded-t-xl data-[has-open-item=true]:data-[last=true]:rounded-b-xl data-[prev-open=true]:rounded-b-xl data-[next-open=true]:rounded-t-xl",
          "data-[open=true]:my-2",
          className,
        )}
        {...props}
      />
    </GroupAccordionItemContext.Provider>
  );
}

function GroupAccordionTrigger({ className, children, onClick, ...props }: React.ComponentProps<"button">) {
  const { open, toggle, triggerId, contentId } = useGroupAccordionItemContext();

  return (
    <button
      {...props}
      type="button"
      id={triggerId}
      data-open={open}
      aria-expanded={open}
      aria-controls={contentId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
      className={cn("h-12 w-full inline-flex items-center justify-between pt-4 pb-4 px-4", className)}
    >
      {children}
      <ChevronDown
        data-open={open}
        className="size-3.5 data-[open=true]:-rotate-180 transition-[rotate] ease-out duration-300"
      />
    </button>
  );
}

function GroupAccordionContent({ className, children, ...props }: React.ComponentProps<"div">) {
  const { open, triggerId, contentId } = useGroupAccordionItemContext();

  return (
    <div
      {...props}
      id={contentId}
      data-open={open}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!open}
      className={cn(
        "grid grid-rows-[0fr] px-4",
        "data-[open=true]:grid-rows-[1fr] data-[open=true]:pb-4",
        "transition-[grid-template-rows,padding] ease-out-cubic duration-300",
        className,
      )}
    >
      <div
        data-open={open}
        className={cn(
          "overflow-hidden opacity-0 blur-md data-[open=true]:blur-none data-[open=true]:opacity-100",
          "transition-[opacity,filter] ease-out-cubic duration-150",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { GroupAccordion, GroupAccordionItem, GroupAccordionTrigger, GroupAccordionContent };
