import { LabItem } from "@/components/sections/lab-item";
import { SectionHeading } from "@/components/ui/heading";
import { crafts } from "@/lib/config/site-data";

function Crafts() {
  return (
    <section id="crafts">
      <SectionHeading className="px-4 min-[690px]:px-8">labs</SectionHeading>

      <div className="relative space-y-4 py-4">
        {[...crafts].reverse().map((craft, idx) => {
          const isLast = idx !== crafts.length - 1;
          return (
            <LabItem
              key={`${craft.title}-${idx}`}
              craft={craft}
              isLast={isLast}
            />
          );
        })}
      </div>
    </section>
  );
}

export { Crafts };
