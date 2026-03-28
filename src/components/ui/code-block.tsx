import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";
import { CopyIcon } from "lucide-react";

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="group relative p-1 border border-border/40 rounded-lg overflow-hidden **:font-mono">
      <CopyButton
        variant="ghost"
        text={code}
        className={cn(
          "absolute top-1.5 right-1.5 size-6",
          "border shadow-md bg-background hover:bg-card",
          // "-translate-y-[calc(100%+15px)] group-hover:translate-y-0 translate-x-[calc(100%+15px)] group-hover:translate-x-0 ease-circ-in-out",
        )}
        copyIcon={<CopyIcon className="size-3.5 -scale-x-100 text-muted-foreground/75" />}
      />
      <SyntaxHighlighter
        style={github}
        language="css"
        showLineNumbers
        lineNumberStyle={{ color: "var(--color-taupe-400)" }}
        customStyle={{ backgroundColor: "var(--color-mauve-100)", fontSize: 12, borderRadius: 8, padding: 8 }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export { CodeBlock };
