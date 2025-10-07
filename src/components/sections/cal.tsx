"use client";

import { getCalApi } from "@calcom/embed-react";
import { Calendar } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const ScheduleCallButton = () => {
  React.useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "meeting" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-7"
          data-cal-namespace="meeting"
          data-cal-link="soumya-mukherjee/meeting"
          data-cal-config='{"layout":"month_view"}'
        >
          <Calendar />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="font-sans">Schedule a call</TooltipContent>
    </Tooltip>
  );
};
