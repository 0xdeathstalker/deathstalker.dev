import * as React from "react";

function CornerDiamondShapes() {
  return (
    <React.Fragment>
      <div className="absolute -top-[3px] -left-[3px] size-2 z-20 border border-mauve-500/65 bg-background rotate-45" />
      <div className="absolute -bottom-[3px] -left-[3px] size-2 z-20 border border-mauve-500/65 bg-background rotate-45" />
      <div className="absolute -top-[3px] -right-[3px] size-2 z-20 border border-mauve-500/65 bg-background rotate-45" />
      <div className="absolute -bottom-[3px] -right-[3px] size-2 z-20 border border-mauve-500/65 bg-background rotate-45" />
    </React.Fragment>
  );
}

export { CornerDiamondShapes };
