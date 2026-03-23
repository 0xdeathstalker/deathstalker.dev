import { AnimatePresence, motion } from "motion/react";
import type { MotionProps, AnimatePresenceProps } from "motion/react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MessagesContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative mx-auto w-fit h-full p-4 flex flex-col items-end justify-end overflow-hidden", className)}
      {...props}
    />
  );
}

function MessagesList({ children }: { children: React.ReactNode } & AnimatePresenceProps) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

function MessageItem({
  layoutId,
  className,
  ...props
}: React.ComponentProps<"div"> & MotionProps & { layoutId: string }) {
  return (
    <motion.div
      layout="position"
      layoutId={layoutId}
      transition={{ duration: 0.2 }}
      className={cn("z-10 mt-2 max-w-[250px] rounded-2xl px-3 py-1 text-[15px] wrap-break-word", className)}
      {...props}
    />
  );
}

function MessageForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form
      className="flex w-full"
      {...props}
    />
  );
}

function MessageInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="text"
      placeholder="type something..."
      className={cn(
        "relative h-10 w-[250px] px-3 grow border rounded-full text-[15px] outline-hidden",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
        className,
      )}
      {...props}
    />
  );
}

function MessageInputPseudoMesage({ layoutId, ...props }: React.ComponentProps<"div"> & { layoutId: string }) {
  return (
    <motion.div
      layout="position"
      layoutId={layoutId}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0.6, zIndex: -1 }}
      animate={{ opacity: 0.6, zIndex: -1 }}
      exit={{ opacity: 1, zIndex: 1 }}
      className="pointer-events-none absolute z-10 h-10 w-[250px] flex items-center rounded-full overflow-hidden wrap-break-word [word-break:break-word]"
    >
      <div
        className="px-3 py-2 text-[15px]"
        {...props}
      />
    </motion.div>
  );
}

function MessageInputButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="submit"
      variant="outline"
      className={cn(
        "ml-2 size-10 shrink-0 flex items-center justify-center disabled:text-muted-foreground rounded-full transition-colors ease-in-out",
        className,
      )}
      {...props}
    />
  );
}

export {
  MessageForm,
  MessageInput,
  MessageInputButton,
  MessageInputPseudoMesage,
  MessageItem,
  MessagesContainer,
  MessagesList,
};
