"use client";

import * as React from "react";
import { formatTime } from "@/lib/utils";

type CurrentTime = { time: string | null; timezone: string | null };

function Clock() {
  const [currentTime, setCurrentTime] = React.useState<CurrentTime>({ time: null, timezone: null });

  React.useEffect(() => {
    setCurrentTime((prev) => ({ ...prev, timezone: "UTC+5:30" }));

    const timeInterval = setInterval(() => {
      setCurrentTime((prev) => ({ ...prev, time: formatTime(new Date()) }));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <span className="text-[13px] text-neutral-500 tabular-nums">
      {currentTime.time} {currentTime.timezone}
    </span>
  );
}

export { Clock };
