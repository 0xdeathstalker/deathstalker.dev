import { BatterySprite, FireEyeSprite, RainSprite } from "@/components/labs/components/sprites";
import { labs } from "@/lib/config/labs-data";

export default async function Playground({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lab = labs.find((l) => l.slug === slug);

  if (!lab?.component) return null;

  return (
    <main className="min-h-screen w-full font-sans flex items-center justify-center">
      {lab.slug === "sprites" ? (
        <div className="relative flex items-center justify-center gap-10">
          <FireEyeSprite />
          <BatterySprite />
          <RainSprite />
        </div>
      ) : (
        <lab.component />
      )}
    </main>
  );
}
