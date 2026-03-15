import { ScrollGradients } from "@/components/scroll-gradients";
import { CornerBorder } from "@/components/ui/corner-border";
import { Line } from "@/components/ui/line";
import { type ComponentTitles, labsComponents } from "@/lib/config/site-data";

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug as ComponentTitles;
  const Component = labsComponents[slug];

  return (
    <main className="relative min-h-screen font-sans w-full overflow-y-hidden">
      <ScrollGradients />
      <VerticalLines />

      {/* creating top space */}
      <div className="h-28 w-full" />

      <div className="mx-auto max-w-[650px] max-[690px]:mx-4">
        <ComponentHeader slug={slug} />

        <div className="p-2">
          <div className="h-8 w-full" />

          <div className="flex items-center justify-center min-h-72">{Component && <Component />}</div>

          <div className="h-8 w-full" />
        </div>
      </div>
    </main>
  );
}

function VerticalLines() {
  return (
    <div className="absolute inset-0 max-w-[650px] max-[690px]:mx-4 mx-auto pointer-events-none">
      <Line
        orientation="vertical"
        position="left"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />
      <Line
        orientation="vertical"
        position="right"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />
    </div>
  );
}

function ComponentHeader({ slug }: { slug: string }) {
  return (
    <div className="relative py-4 px-4">
      <CornerBorder />

      <Line
        orientation="horizontal"
        position="top"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />
      <Line
        orientation="horizontal"
        position="bottom"
        color="text-muted-foreground/25 dark:text-muted-foreground/20"
      />

      <h1 className="text-[32px] sm:text-4xl font-medium text-shadow-sm dark:shadow-black/65">{slug}</h1>
    </div>
  );
}
