"use client";

import { motion } from "motion/react";
import { Lightbox, LightboxContent, LightboxTrigger } from "@/components/ui/lightbox";

function ImageLightbox() {
  return (
    <Lightbox>
      <LightboxTrigger className="bg-background">
        <motion.img
          src="/images/labs/transition-tabs.svg"
          alt="tabs transition using clip path logic"
          layoutId="image-2"
        />
      </LightboxTrigger>

      <LightboxContent className="bg-background">
        <motion.img
          src="/images/labs/transition-tabs.svg"
          alt="tabs transition using clip path logic"
          layoutId="image-2"
        />
      </LightboxContent>
    </Lightbox>
  );
}

export { ImageLightbox };
