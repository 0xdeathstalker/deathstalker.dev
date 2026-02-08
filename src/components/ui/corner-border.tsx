import * as React from "react";

function CornerBorder() {
  return (
    <React.Fragment>
      <div className="absolute top-0 left-0 size-2 z-20 border-l border-t border-neutral-500" />
      <div className="absolute bottom-0 left-0 size-2 z-20 border-l border-b border-neutral-500" />
      <div className="absolute top-0 right-0 size-2 z-20 border-r border-t border-neutral-500" />
      <div className="absolute bottom-0 right-0 size-2 z-20 border-r border-b border-neutral-500" />
    </React.Fragment>
  );
}

export { CornerBorder };
