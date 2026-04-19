"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useWebHaptics } from "web-haptics/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ViewAllButton() {
  const { trigger } = useWebHaptics();

  return (
    <Link
      href="/labs"
      onClick={() => trigger()}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "h-12 w-full",
        // "bg-mauve-200 hover:bg-mauve-300 border-mauve-400 hover:border-mauve-500"
      )}
    >
      <span>view all</span>
      <ArrowRight className="size-4" />
    </Link>
  );
}

export { ViewAllButton };
