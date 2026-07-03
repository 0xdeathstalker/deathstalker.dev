"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  NestedMenu,
  NestedMenuBackButton,
  NestedMenuContent,
  NestedMenuList,
  NestedMenuListItem,
  NestedMenuTrigger,
  NestedMenuViewport,
} from "@/components/ui/nested-dropdown-menu";
import { type DemoMenuItem, nestedMenuItems } from "@/components/labs/demo/nested-dropdown-menu/data";
import { cn } from "@/lib/utils";

function NestedDropdownMenuDemo() {
  return (
    <NestedMenu
      items={nestedMenuItems}
      className="-mt-18"
    >
      <NestedMenuTrigger asChild>
        <button
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
      </NestedMenuTrigger>

      <NestedMenuContent
        className={cn(
          "absolute mt-1 w-64 left-1/2 -translate-x-1/2 top-full shadow-sm",
          "bg-mauve-100 flex flex-col border border-mauve-200 rounded-xl",
          "data-[open=true]:animate-fade-in origin-top",
        )}
      >
        <NestedMenuViewport className="p-1">
          <NestedMenuList
            className="text-sm"
            renderItem={(item) => {
              const { id, label, children, icon: Icon } = item as DemoMenuItem;

              return (
                <NestedMenuListItem
                  key={id}
                  item={item}
                  className={cn(
                    "h-9 w-full flex items-center justify-between px-2 rounded-lg",
                    "enabled:active:scale-[0.97] hover:bg-mauve-200 transition-[scale,background-color] ease-out",
                  )}
                >
                  <div className="inline-flex items-center gap-2">
                    <Icon className="size-4.5 text-mauve-600" />
                    <span className="text-mauve-700">{label}</span>
                  </div>
                  {children && children.length > 0 && <ChevronRight className="size-3.5 text-muted-foreground" />}
                </NestedMenuListItem>
              );
            }}
          >
            <NestedMenuBackButton
              className={cn(
                "group h-8 w-full flex items-center gap-2 px-2 rounded-lg text-xs text-mauve-600",
                "enabled:active:scale-[0.97] hover:bg-mauve-200 transition-[scale,background-color] ease-out",
              )}
              iconClassName="size-4 p-0.5 text-mauve-700 rounded-full group-hover:bg-mauve-300 transition-colors ease-out"
            />
          </NestedMenuList>
        </NestedMenuViewport>
      </NestedMenuContent>
    </NestedMenu>
  );
}

export { NestedDropdownMenuDemo };
