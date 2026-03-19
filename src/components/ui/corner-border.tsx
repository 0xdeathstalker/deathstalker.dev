import * as React from "react";

function CornerBorder() {
  return (
    <React.Fragment>
      <div className="absolute top-0 left-0 size-2 z-20 border-l border-t border-[oklch(14.5%_0.008_326)]" />
      <div className="absolute bottom-0 left-0 size-2 z-20 border-l border-b border-[oklch(14.5%_0.008_326)]" />
      <div className="absolute top-0 right-0 size-2 z-20 border-r border-t border-[oklch(14.5%_0.008_326)]" />
      <div className="absolute bottom-0 right-0 size-2 z-20 border-r border-b border-[oklch(14.5%_0.008_326)]" />
    </React.Fragment>
  );
}

export { CornerBorder };
