"use client";

import { motion } from "motion/react";
import { Lightbox, LightboxContent, LightboxTrigger } from "@/components/ui/lightbox";

function StepsLightbox() {
  return (
    <Lightbox>
      <LightboxTrigger className="bg-background">
        <motion.img
          src="/images/labs/step-css.svg"
          alt="step position values visualisation"
          layoutId="image-2"
          className="md:max-w-[300px] mx-auto rounded-md"
        />
      </LightboxTrigger>

      <LightboxContent className="bg-background">
        <motion.img
          src="/images/labs/step-css.svg"
          alt="step position values visualisation"
          layoutId="image-2"
          className="mx-auto"
        />
      </LightboxContent>
    </Lightbox>
  );
}

export { StepsLightbox };
