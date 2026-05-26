"use client";

import { ArrowUp, AudioLines, Camera, Folder, Image, Plus } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import * as React from "react";
import { useWebHaptics } from "web-haptics/react";

function ChatInput() {
  const [text, setText] = React.useState<string>("");
  const { trigger } = useWebHaptics();

  return (
    <MotionConfig transition={{ duration: 0.15 }}>
      <div className="p-1 w-72 sm:w-[390px] flex items-center gap-1 sm:gap-1.5 overflow-hidden">
        <AnimatePresence
          initial={false}
          mode="popLayout"
        >
          {text === "" ? (
            <motion.div
              key="accessory-buttons"
              variants={accessoryGroupVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center"
            >
              {accessoryButtons.map(({ icon: Icon, label }) => (
                <motion.button
                  key={label}
                  type="button"
                  variants={accessoryItemVariants}
                  className="group size-8 md:size-10 rounded-full hover:bg-mauve-200 enabled:active:scale-95 transition-[background-color,scale] ease-out-cubic cursor-pointer"
                >
                  <Icon className="mx-auto size-5 text-mauve-500 group-hover:text-mauve-800 transition-colors ease-out-cubic" />
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.button
              key="add-button"
              type="button"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              className="group size-10 shrink-0 rounded-full bg-mauve-100 hover:bg-mauve-200 enabled:active:scale-95 transition-[background-color,scale] ease-out-cubic cursor-pointer ring ring-inset ring-mauve-200"
            >
              <Plus className="mx-auto size-5 text-mauve-500 group-hover:text-mauve-800 transition-colors ease-out-cubic" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.form
          layout
          onSubmit={(e: React.SubmitEvent) => {
            e.preventDefault();
            setText("");
          }}
          className="relative w-full h-10 pl-4 pr-1 py-2 bg-mauve-100 inline-flex items-center justify-between gap-2 ring ring-inset ring-mauve-200"
          style={{ borderRadius: 9999 }}
        >
          <input
            type="text"
            value={text}
            placeholder="Type anything"
            onChange={(e) => setText(e.target.value)}
            className="relative z-10 block size-full font-medium placeholder:font-medium focus-visible:outline-0"
          />
        </motion.form>

        <AnimatePresence
          initial={false}
          mode="popLayout"
        >
          {text === "" ? (
            <motion.button
              key="audio-button"
              type="button"
              onClick={() => {
                trigger();
              }}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              className="group size-10 shrink-0 block rounded-full bg-mauve-100 hover:bg-mauve-200 enabled:active:scale-95 transition-[background-color,scale] ease-out-cubic cursor-pointer ring ring-inset ring-mauve-200"
            >
              <AudioLines className="mx-auto size-5 text-mauve-500 group-hover:text-mauve-800 transition-colors ease-out-cubic" />
            </motion.button>
          ) : (
            <motion.button
              key="send-button"
              type="button"
              onClick={() => {
                setText("");
                trigger();
              }}
              initial={{ opacity: 0, scale: 0.3, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.3, filter: "blur(8px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              className="group size-10 shrink-0 block rounded-full bg-mauve-600 hover:bg-mauve-700 enabled:active:scale-95 transition-[background-color,scale] ease-out-cubic cursor-pointer"
            >
              <ArrowUp className="mx-auto size-5 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export { ChatInput };

const accessoryButtons = [
  { icon: Camera, label: "camera" },
  { icon: Image, label: "image" },
  { icon: Folder, label: "folder" },
] as const;

const accessoryGroupVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.055,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(8px)",
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const accessoryItemVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.4,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.4,
    transition: {
      duration: 0.14,
      ease: "easeOut",
    },
  },
};
