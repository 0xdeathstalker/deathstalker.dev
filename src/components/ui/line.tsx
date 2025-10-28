import * as React from "react";
import { cn } from "@/lib/utils";

type HorizontalPosition = "top" | "bottom";
type VerticalPosition = "left" | "right";

type BaseLineProps = {
  /**
   * Variant of the line
   * @default "full-screen"
   */
  variant?: "full-screen" | "contained";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Color of the line using Tailwind text color classes
   * @default "text-muted-foreground/15"
   */
  color?: string;
  /**
   * Stroke width of the line
   * @default "2"
   */
  strokeWidth?: string;
  /**
   * Dash array pattern for the line
   * @default "6 6"
   */
  dashArray?: string;
};

type HorizontalLineProps = {
  /**
   * Orientation of the line
   */
  orientation: "horizontal";
  /**
   * Position of the horizontal line (top or bottom)
   * @default "top"
   */
  position?: HorizontalPosition;
} & BaseLineProps;

type VerticalLineProps = {
  /**
   * Orientation of the line
   */
  orientation: "vertical";
  /**
   * Position of the vertical line (left or right)
   * @default "left"
   */
  position?: VerticalPosition;
} & BaseLineProps;

type LineProps = HorizontalLineProps | VerticalLineProps;

export function Line({
  orientation,
  position,
  variant = "full-screen",
  className,
  color = "text-muted-foreground/15",
  strokeWidth = "2",
  dashArray = "6 6",
}: LineProps) {
  const isHorizontal = orientation === "horizontal";
  const defaultPosition = isHorizontal ? "top" : "left";
  const finalPosition = position || defaultPosition;

  const positionClass = isHorizontal
    ? finalPosition === "top"
      ? "top-0"
      : "bottom-0"
    : finalPosition === "left" // Vertical line
      ? "left-0"
      : "right-0";

  const baseClasses = "absolute pointer-events-none z-10";
  const dimensionClasses = isHorizontal ? "w-full" : "top-0 h-full";

  if (isHorizontal) {
    return (
      <svg
        data-direction={finalPosition}
        data-variant={variant}
        data-orientation={orientation}
        className={cn(baseClasses, dimensionClasses, positionClass, color, className)}
        width="100%"
        height="1"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
        }}
      >
        <line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  return (
    <svg
      data-direction={finalPosition}
      data-variant={variant}
      data-orientation={orientation}
      className={cn(baseClasses, dimensionClasses, positionClass, color, className)}
      width="1"
      height="100%"
      viewBox="0 0 1 100"
      preserveAspectRatio="none"
    >
      <line
        x1="0.5"
        y1="0"
        x2="0.5"
        y2="100"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
