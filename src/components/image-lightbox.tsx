"use client";

import { type MotionProps, motion } from "motion/react";
import type * as React from "react";
import { Lightbox, LightboxContent, LightboxTrigger } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
  triggerImageClassName?: string;
  contentImageClassName?: string;
  children?: React.ReactNode;
} & React.ComponentProps<"img"> &
  MotionProps;

function ImageLightbox({
  src,
  alt,
  triggerImageClassName,
  contentImageClassName,
  children,
  ...props
}: ImageLightboxProps) {
  return (
    <Lightbox>
      <div className="space-y-2">
        <LightboxTrigger className="bg-background cursor-zoom-in border border-mauve-200">
          <motion.img
            src={src}
            alt={alt}
            layoutId="image"
            className={cn(triggerImageClassName)}
            {...props}
          />
        </LightboxTrigger>
        {children}
      </div>

      <LightboxContent className="bg-background">
        <motion.img
          src={src}
          alt={alt}
          layoutId="image"
          className={cn(contentImageClassName)}
          {...props}
        />
      </LightboxContent>
    </Lightbox>
  );
}

export { ImageLightbox };
