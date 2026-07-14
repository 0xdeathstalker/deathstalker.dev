import { DialogFormModalDemo } from "@/components/labs/demo/dialog-form.demo";
import { labs } from "@/lib/config/labs-data";

export default async function Playground({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lab = labs.find((l) => l.slug === slug);

  if (!lab?.component) return null;

  return (
    <main className="relative min-h-screen w-full font-sans p-4 bg-mauve-100">
      <div className="flex h-[calc(100vh-2rem)] flex-col gap-4">
        {/* navbar */}
        <div className="h-14 shrink-0 rounded-xl border border-mauve-200 bg-background" />

        <div className="flex min-h-0 flex-1 gap-4">
          {/* sidebar */}
          <div className="hidden w-56 shrink-0 flex-col gap-3 rounded-xl border border-mauve-200 bg-background p-3 sm:flex">
            <div className="h-8 rounded-lg border border-mauve-300 bg-mauve-50" />
            <div className="h-8 rounded-lg border border-mauve-300 bg-mauve-50" />
            <div className="h-8 rounded-lg border border-mauve-300 bg-mauve-50" />
            <div className="h-8 rounded-lg border border-mauve-300 bg-mauve-50" />
          </div>

          {/* content */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex-1 rounded-xl border border-mauve-200 bg-white" />
            <div className="grid shrink-0 grid-cols-3 gap-4">
              <div className="h-40 rounded-xl border border-mauve-200 bg-white" />
              <div className="col-span-2 h-40 rounded-xl border border-mauve-200 bg-white" />
            </div>
            <div className="grid shrink-0 grid-cols-3 gap-4">
              <div className="h-40 rounded-xl border border-mauve-200 bg-white" />
              <div className="h-40 rounded-xl border border-mauve-200 bg-white" />
              <div className="h-40 rounded-xl border border-mauve-200 bg-white" />
            </div>
          </div>
        </div>
      </div>

      <DialogFormModalDemo />
    </main>
  );
}
