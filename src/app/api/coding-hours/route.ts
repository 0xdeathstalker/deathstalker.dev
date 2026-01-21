import { env } from "@/env";
import type { ProjectDuration } from "@/lib/types";

export async function GET() {
  try {
    if (!env.WAKATIME_API_KEY) {
      console.error("[ERROR] wakatime api key not found");
      return Response.json({ error: "Wakatime API Key missing" }, { status: 500 });
    }

    const now = new Date();
    now.setDate(now.getDate() - 1);
    const yesterday = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    const response = await fetch(`https://wakatime.com/api/v1/users/current/durations?date=${yesterday}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${env.WAKATIME_API_KEY}:`).toString("base64")}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json({ error: "[ERROR] Wakatime API error" }, { status: response.status });
    }

    const data: Array<ProjectDuration> = (await response.json()).data || [];

    const totalSeconds = data.reduce((acc, curr) => acc + curr.duration, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return Response.json({ hours, minutes });
  } catch (error) {
    console.error("[ERROR] active-time api failed:: ", error);
    const errorMsg = error instanceof Error && error.message;
    return Response.json({ message: errorMsg ?? "Something went wrong" }, { status: 500 });
  }
}
