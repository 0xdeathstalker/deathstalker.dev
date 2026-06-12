"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type AccordionContextValue = {
  isOpen: boolean;
  toggle: () => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("Accordion compound components must be used within <Accordion>");
  return context;
}

type AccordionProps = {
  defaultOpen?: boolean;
  disabled?: boolean;
} & React.ComponentProps<"div">;

function Accordion({ defaultOpen = false, disabled = false, children, className, ...props }: AccordionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const toggle = React.useCallback(() => {
    if (!disabled) setIsOpen((prev) => !prev);
  }, [disabled]);

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div
        data-state={isOpen ? "open" : "closed"}
        className={className}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionTrigger({ children, className, ...props }: React.ComponentProps<"button">) {
  const { isOpen, toggle } = useAccordionContext();

  return (
    <button
      type="button"
      onClick={toggle}
      data-state={isOpen ? "open" : "closed"}
      className={cn("group w-full cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  );
}

function AccordionContent({ children, className, ...props }: React.ComponentProps<"div">) {
  const { isOpen } = useAccordionContext();

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "grid grid-rows-[0fr]",
        "data-[state=open]:grid-rows-[1fr]",
        "transition-[grid-template-rows] ease-out-cubic",
        className,
      )}
      {...props}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

export { Accordion, AccordionTrigger, AccordionContent };
