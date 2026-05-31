import { Copy, Heart, Share } from "lucide-react";
import { Tooltip, TooltipContent, TooltipGroup, TooltipTrigger } from "@/components/ui/tooltip-group";
import { cn } from "@/lib/utils";

function TooltipGroupComponent() {
  return (
    <div className="flex items-center gap-2">
      <TooltipGroup>
        {tools.map((tool) => (
          <Tooltip
            key={tool.id}
            id={tool.id}
          >
            <TooltipTrigger
              asChild
              className="py-1.5 px-2.5 bg-mauve-300/50 rounded-lg"
            >
              <button
                type="button"
                className={cn(
                  "size-9 flex items-center justify-center",
                  tool.id === "copy" && "hover:bg-mauve-300",
                  tool.id === "favourite" && "hover:bg-red-200 hover:ring-red-300",
                  tool.id === "share" && "hover:bg-indigo-200 hover:ring-indigo-300",
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
  { id: "favourite", icon: Heart, label: "Favorite" },
  { id: "share", icon: Share, label: "Share" },
];
