"use client";

import * as React from "react";
import { formatTime } from "@/lib/utils";
import { Clock as ClockIcon } from "lucide-react";

type CurrentTime = { time: string | null; timezone: string | null };

function Clock() {
  const [currentTime, setCurrentTime] = React.useState<CurrentTime>({ time: null, timezone: null });

  React.useEffect(() => {
    setCurrentTime({ time: formatTime(new Date()), timezone: "UTC+5:30" });

    const timeInterval = setInterval(() => {
      setCurrentTime((prev) => ({ ...prev, time: formatTime(new Date()) }));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="flex items-center gap-1">
      {/* <ClockIcon className="size-3.5 shrink-0 text-neutral-500" /> */}
      <span className="font-mono text-[13px] text-neutral-500 tabular-nums">
        {currentTime.time} <span className="hidden sm:inline">{currentTime.timezone}</span>{" "}
        <span className="sm:hidden">IST</span>
      </span>
    </div>
  );
}

export { Clock };
