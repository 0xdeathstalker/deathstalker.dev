"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import type { MenuItem, THistory } from "./data";
import { nestedMenuItems } from "./data";
import Image from "next/image";
import { useWebHaptics } from "web-haptics/react";

function NestedDropdownMenu() {
  const [open, setOpen] = React.useState(false);

  const [activeMenu, setActiveMenu] = React.useState<MenuItem[]>([]);
  const [history, setHistory] = React.useState<THistory[]>([]);
  const [direction, setDirection] = React.useState<-1 | 1>(1);
  const [height, setHeight] = React.useState(128);

  const { trigger } = useWebHaptics();

  const buttonRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(buttonRef as React.RefObject<HTMLDivElement>, () => setOpen(false));

  const currentMenu = activeMenu.length > 0 ? activeMenu : nestedMenuItems;
  const previousMenu = history.at(-1);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  function goForwards(subMenu: MenuItem[] | undefined, title: string) {
    if (subMenu) {
      setDirection(1);
      setActiveMenu(subMenu);
      setHistory((prev) => [...prev, { stack: subMenu, title }]);
    }
  }

  function goBack() {
    const newHistory = history.slice(0, -1);
    const previousMenu = newHistory.at(-1)?.stack ?? [];

    setDirection(-1);
    setActiveMenu(previousMenu);
    setHistory(newHistory);
  }

  function handleClick() {
    trigger("success");
    setOpen((prev) => !prev);
  }

  React.useEffect(() => {
    if (!open || !dropdownRef.current) {
      return;
    }

    const dropdown = dropdownRef.current;

    setHeight(dropdown.clientHeight);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.target.clientHeight);
      }
    });

    observer.observe(dropdown);

    return () => observer.disconnect();
  }, [open]);

  return (
    <div
      ref={buttonRef}
      className="relative inline-block -mt-18"
    >
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center bg-mauve-100 rounded-full border border-mauve-200",
          "hover:bg-mauve-200/80 hover:border-mauve-300 active:scale-95",
          "transition-[scale,background-color,border-color] ease-out",
        )}
      >
        <Image
          src="/images/d-user.png"
          alt="deathstalker user logo"
          width={38}
          height={38}
        />
      </button>

      {open ? (
        <motion.div
          data-open={open}
          initial={false}
          animate={{ height: height + OUTER_BORDER_HEIGHT }}
          transition={{ type: "spring", bounce: 0, duration: 0.15 }}
          className={cn(
            "absolute mt-1 w-64 h-full left-1/2 -translate-x-1/2 top-full shadow-sm",
            "bg-mauve-100 flex flex-col border border-mauve-200 rounded-xl overflow-hidden",
            "data-[open=true]:animate-fade-in origin-top will-change-transform",
          )}
        >
          <div
            ref={dropdownRef}
            className="p-1"
          >
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.ul
                key={history.length}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", bounce: 0, duration: 0.15 }}
                custom={direction}
                className="will-change-transform text-sm"
              >
                {history.length > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className={cn(
                      "h-8 w-full flex items-center gap-2 px-2 rounded-lg group/back",
                      "enabled:active:scale-[0.97] hover:bg-mauve-200 transition-[scale,background-color] ease-out",
                    )}
                  >
                    <div className="group-hover/back:bg-mauve-300 rounded-full p-1 group-hover/back:ring-inset ring-mauve-300 transition-[background-color,ring] ease-out">
                      <ChevronLeft className="size-3.5 text-mauve-700" />
                    </div>
                    <span className="text-xs text-mauve-600">{previousMenu?.title}</span>
                  </button>
                ) : null}

                {currentMenu.map((menu) => (
                  <button
                    key={menu.label}
                    type="button"
                    onClick={() => goForwards(menu.items, menu.label)}
                    className={cn(
                      "h-9 w-full flex items-center justify-between px-2 rounded-lg",
                      "enabled:active:scale-[0.97] hover:bg-mauve-200 transition-[scale,background-color] ease-out",
                    )}
                  >
                    <div className="inline-flex items-center gap-2">
                      <menu.icon className="size-4.5 text-mauve-600" />
                      <span className="text-mauve-700">{menu.label}</span>
                    </div>

                    {menu.items && menu.items.length > 0 ? (
                      <ChevronRight className="size-3.5 text-muted-foreground" />
                    ) : null}
                  </button>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}

export { NestedDropdownMenu };

const OUTER_BORDER_HEIGHT = 2;

const variants = {
  initial: (direction: -1 | 1) => ({ x: `${110 * direction}%` }),
  animate: { x: "0%" },
  exit: (direction: -1 | 1) => ({ x: `${-110 * direction}%` }),
};
