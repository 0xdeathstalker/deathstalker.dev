"use client";

import { BadgeCheck } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type Position = {
  x: number;
  y: number;
};

const AVATAR_COLORS = [
  "bg-red-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
];

function getAvatarColor(seed: string): string {
  const sum = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function getInitials(seed: string): string {
  const parts = seed.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (seed[0] ?? "").toUpperCase();
}

type TestimonialProps = {
  showSpotlight?: boolean;
  spotlightColor?: `rgba(${number},${number},${number},${number})`;
} & React.ComponentProps<"figure">;

function Testimonial({
  className,
  children,
  showSpotlight = false,
  spotlightColor = `rgba(255,255,255,0.25)`,
  ...props
}: TestimonialProps) {
  const figureRef = React.useRef<HTMLElement | null>(null);

  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState<0 | 1>(0);
  const [isFocused, setIsFocused] = React.useState(false);

  const isHoverDevice = React.useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches,
    [],
  );
  const enableSpotlight = showSpotlight && isHoverDevice;

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!figureRef.current || isFocused) return;

    const figure = figureRef.current;
    const rect = figure.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleMouseEnter() {
    setOpacity(1);
  }

  function handleMouseLeave() {
    setOpacity(0);
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <figure
      ref={figureRef}
      data-slot="testimonial"
      onMouseEnter={enableSpotlight ? handleMouseEnter : undefined}
      onMouseLeave={enableSpotlight ? handleMouseLeave : undefined}
      onMouseMove={enableSpotlight ? handleMouseMove : undefined}
      onFocus={enableSpotlight ? handleFocus : undefined}
      onBlur={enableSpotlight ? handleBlur : undefined}
      className={cn(
        "relative flex flex-col justify-between overflow-hidden ring-1 ring-inset ring-foreground/40",
        className,
      )}
      {...props}
    >
      {showSpotlight && (
        <TestimonialSpotlight
          opacity={opacity}
          position={position}
          spotlightColor={spotlightColor}
        />
      )}
      {children}
    </figure>
  );
}

function TestimonialQuote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      data-slot="quote"
      className={cn("px-4 py-3", className)}
      {...props}
    />
  );
}

function TestimonialAuthor({ className, ...props }: React.ComponentProps<"figcaption">) {
  return (
    <figcaption
      data-slot="author"
      className={cn("flex flex-row items-center gap-2 md:gap-4 px-4 pb-3", className)}
      {...props}
    />
  );
}

function TestimonialAuthorImg({ src, alt, className, ...props }: React.ComponentProps<"img">) {
  return (
    <img
      data-slot="author-img"
      src={src}
      alt={alt}
      className={cn("size-8 md:size-10 rounded-full select-none", className)}
      {...props}
    />
  );
}

function TestimonialAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar"
      className={cn("relative size-8 md:size-10 shrink-0", className)}
      {...props}
    />
  );
}

function TestimonialAvatarFallback({ seed, className, ...props }: { seed: string } & React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "size-8 md:size-10 shrink-0 rounded-full flex items-center justify-center text-white text-xs font-semibold select-none",
        getAvatarColor(seed),
        className,
      )}
      {...props}
    >
      {getInitials(seed)}
    </div>
  );
}

function TestimonialAvatarRing({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-ring"
      className={cn("pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-black/10", className)}
      {...props}
    />
  );
}

function TestimonialAuthorInfo({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col grow", className)}
      {...props}
    />
  );
}

function TestimonialAuthorName({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="author-name"
      className={cn("leading-4 text-balance font-semibold", className)}
      {...props}
    />
  );
}

function TestimonialAuthorTagline({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="author-tagline"
      className={cn("text-xs leading-4 text-balance text-muted-foreground font-medium", className)}
      {...props}
    />
  );
}

function TestimonialVerifiedBadge({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <BadgeCheck
      data-slot="verified-badge"
      className="ml-1 inline-block size-4 -translate-y-px text-info fill-[#009CF5] text-white"
      {...props}
    />
  );
}

type TestimonialSpotlightProps = {
  position: Position;
  opacity: 0 | 1;
  spotlightColor: string;
};
function TestimonialSpotlight({ position, opacity, spotlightColor }: TestimonialSpotlightProps) {
  return (
    <div
      className="pointer-events-none absolute -inset-px transition-all duration-500"
      style={{
        opacity,
        background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
      }}
    />
  );
}

export {
  Testimonial,
  TestimonialQuote,
  TestimonialAuthor,
  TestimonialAvatar,
  TestimonialAuthorImg,
  TestimonialAvatarRing,
  TestimonialAuthorInfo,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialVerifiedBadge,
  TestimonialSpotlight,
  TestimonialAvatarFallback,
};
