import { Tooltip, TooltipContent, TooltipGroup, TooltipTrigger } from "@/components/ui/tooltip-group";
import { cn } from "@/lib/utils";
import { Copy, Heart, Share } from "lucide-react";

function TooltipGroupComponent() {
  return (
    <div className="flex items-center gap-2">
      <TooltipGroup>
        {tools.map((tool) => (
          <Tooltip
            key={tool.id}
            id={tool.id}
          >
            <TooltipTrigger className="py-1.5 px-2.5 bg-mauve-300/50 rounded-lg">
              <button
                type="button"
                className={cn(
                  "size-9 flex items-center justify-center",
                  tool.id === "copy" && "hover:bg-mauve-300",
                  "ring-[0.5px] ring-inset ring-mauve-400/50 enabled:active:scale-95 transition-[background-color,scale]",
                )}
              >
                <tool.icon className="size-4.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-mauve-300/50 text-foreground">{tool.label}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipGroup>
    </div>
  );
}

export { TooltipGroupComponent };

const tools = [
  { id: "copy", icon: Copy, label: "Copy code" },
  { id: "favorite", icon: Heart, label: "Favorite" },
  { id: "share", icon: Share, label: "Share" },
];
