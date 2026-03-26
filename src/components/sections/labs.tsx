import { LabItem } from "@/components/sections/lab-item";
import { SectionHeading } from "@/components/ui/heading";
import { labs } from "@/lib/config/lab-data";

function Labs() {
  return (
    <section id="labs">
      <SectionHeading className="px-4">labs</SectionHeading>

      <div className="relative space-y-4 py-4">
        {[...labs].reverse().map(({ component: _, ...lab }, idx) => {
          const isLast = idx !== labs.length - 1;
          return (
            <LabItem
              key={`${lab.title}-${idx}`}
              lab={lab}
              isLast={isLast}
            />
          );
        })}
      </div>
    </section>
  );
}

export { Labs };
