import { MaskScrollArea } from "@/components/ui/masked-scroll-area";

function MaskScroll() {
  return (
    <div className="mx-2 space-y-5">
      <div className="h-88 max-w-[500px] bg-zinc-50 border rounded-lg p-2">
        <MaskScrollArea
          orientation="vertical"
          className="space-y-1 h-full"
        >
          {tags.map((item, idx) => (
            <div
              key={`${idx + 1}-item`}
              className="bg-linear-to-br w-48 from-zinc-200/80 to-zinc-100/40 flex flex-col gap-2 border rounded-md py-2 px-3"
            >
              <span>{item}</span>
            </div>
          ))}
        </MaskScrollArea>
      </div>
    </div>
  );
}

const tags = Array.from({ length: 50 }).map((_, i, a) => `@scope/ui@0.0.${a.length - i}`);

export { MaskScroll };
