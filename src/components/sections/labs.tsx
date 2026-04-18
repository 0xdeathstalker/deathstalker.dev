import { LabItem } from "@/components/sections/lab-item";
import { SectionHeading } from "@/components/ui/heading";
import { labs } from "@/lib/config/labs-data";
import { ViewAllButton } from "./view-all-button";

function Labs() {
  return (
    <section id="labs">
      <SectionHeading className="px-4">labs</SectionHeading>

      <div className="relative space-y-4 pt-4">
        {[...labs]
          .slice(5, labs.length)
          .reverse()
          .map(({ component: _, ...lab }, idx) => {
            const isLast = idx !== 3;
            return (
              <LabItem
                key={`${lab.title}-${idx}`}
                lab={lab}
                isLast={isLast}
              />
            );
          })}

        <div className="relative mt-6 mb-4 mx-4 flex justify-center">
          <ViewAllButton />
        </div>
      </div>
    </section>
  );
}

export { Labs };
