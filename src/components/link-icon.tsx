"use client";

import Link from "next/link";
import { Link as LucideLinkIcon } from "lucide-react";

function LinkIcon({ href, className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      target="_blank"
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      <div className="size-6 flex items-center justify-center bg-muted border border-muted-foreground/15 rounded-xl ring-1 ring-offset-1 ring-muted-foreground/15">
        <LucideLinkIcon className="size-3.5 text-taupe-600" />
      </div>
    </Link>
  );
}

export { LinkIcon };
