import { type ComponentTitles, labsComponents } from "@/lib/config/site-data";

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug as ComponentTitles;
  const Component = labsComponents[slug];

  return (
    <main className="font-sans h-screen max-h-screen flex flex-col overflow-y-hidden">
      <div className="relative size-full flex flex-col items-center justify-center">{Component && <Component />}</div>
    </main>
  );
}
