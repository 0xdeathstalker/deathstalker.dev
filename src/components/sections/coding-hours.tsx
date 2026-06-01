import Image from "next/image";
import { getCodingHours } from "@/lib/actions/coding-hours";

async function CodingHours() {
  const time = await getCodingHours();

  if (!time) return null;

  return (
    <div className="flex items-center text-muted-foreground text-xs">
      <Image
        src="/images/cursor-light.svg"
        alt="cursor logo"
        width={12}
        height={12}
        className="mr-1.5"
      />

      <p>
        Yesterday worked for{" "}
        <span className="text-sm text-foreground">
          {time?.hours ? `${time.hours}h` : null} {time.minutes ? `${time?.minutes}m` : null}
        </span>
      </p>
    </div>
  );
}

export { CodingHours };
