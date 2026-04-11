"use client";

import { type MotionProps, motion } from "motion/react";
import type * as React from "react";
import { Lightbox, LightboxContent, LightboxTrigger } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";

type ImageLightboxProps = React.ComponentProps<"img"> &
  MotionProps & { triggerImageClassName?: string; contentImageClassName?: string };

function ImageLightbox({ src, alt, triggerImageClassName, contentImageClassName, ...props }: ImageLightboxProps) {
  return (
    <Lightbox>
      <LightboxTrigger className="bg-background">
        <motion.img
          src={src}
          alt={alt}
          layoutId="image"
          className={cn(triggerImageClassName)}
          {...props}
        />
      </LightboxTrigger>

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
