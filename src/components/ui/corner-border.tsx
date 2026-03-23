import * as React from "react";

function CornerBorder() {
  return (
    <React.Fragment>
      <div className="absolute top-0 left-0 size-2 z-20 border-l border-t border-mauve-950" />
      <div className="absolute bottom-0 left-0 size-2 z-20 border-l border-b border-mauve-950" />
      <div className="absolute top-0 right-0 size-2 z-20 border-r border-t border-mauve-950" />
      <div className="absolute bottom-0 right-0 size-2 z-20 border-r border-b border-mauve-950" />
    </React.Fragment>
  );
}

export { CornerBorder };
