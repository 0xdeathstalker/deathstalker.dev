import { CopyButton } from "@/components/ui/copy-button";

function CopyButtonDemo() {
  return (
    <div className="space-x-3 font-inter">
      <CopyButton
        variant="ghost"
        text="copy"
        className="w-fit size-9 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
      />
      <CopyButton
        size="default"
        variant="ghost"
        text="copy"
        className="w-fit h-9 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
      >
        Copy page
      </CopyButton>
    </div>
  );
}

export { CopyButtonDemo };
