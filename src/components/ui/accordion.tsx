"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type AccordionContextValue = {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("Accordion compound components must be used within <Accordion>");
  return context;
}

type AccordionProps = {
  defaultOpen?: boolean;
  disabled?: boolean;
} & React.ComponentProps<"div">

function Accordion({ defaultOpen = false, disabled = false, children, className, ...props }: AccordionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const toggle = React.useCallback(() => {
    if (!disabled) setIsOpen((prev) => !prev);
  }, [disabled]);

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div data-state={isOpen ? "open" : "closed"} className={className} {...props}>
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
      className={cn("group w-full", className)}
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
        "overflow-hidden transition-all duration-[350ms] ease-in-out",
        "data-[state=open]:max-h-screen data-[state=closed]:max-h-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Accordion, AccordionTrigger, AccordionContent };
