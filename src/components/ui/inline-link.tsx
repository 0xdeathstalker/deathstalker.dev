import Link from "next/link";
import { cn } from "@/lib/utils";

function InlineLink({ href, target = "_blank", className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        "font-semibold underline underline-offset-3 decoration-mauve-300 hover:text-mauve-800 hover:decoration-mauve-800 transition-colors ease-in-out",
        className,
      )}
      {...props}
    />
  );
}

export { InlineLink };
