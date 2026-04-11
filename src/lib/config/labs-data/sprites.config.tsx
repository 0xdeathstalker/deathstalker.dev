import { BatterySprite, FireEyeSprite, RainSprite } from "@/components/labs/components/sprites";
import { StepsLightbox } from "@/components/steps-lightbox";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/code-block";
import { InlineLink } from "@/components/ui/inline-link";

function getKeyframeAnimation() {
  return `--animate-sprite: sprite 1.5s steps(16, jump-none) infinite;
@keyframes sprite {
  from {
    object-position: 0% 0%;
  }
  to {
    object-position: 100% 0%;
  }
}`;
}

const spritesConfig = {
  slug: "sprites",
  title: "sprites",
  subHeading: "creating sprites with ai and css.",
  description: (
    <>
      <p>
        i got inspired to create sprites after coming across{" "}
        <InlineLink href="https://pqoqubbw.dev/crafts/sprite-animation-is-fun">@pqoqubbw's work</InlineLink>. after
        learning more about sprites from{" "}
        <InlineLink href="https://www.joshwcomeau.com/animation/sprites">@joshwcomeau's blog</InlineLink>, tried my hand
        in creating sprites.
      </p>

      <p>
        first things first. we need a spritesheet to create a sprite. spritesheet is a single image where multiple
        frames are stacked side by side. now we use an <Code>img</Code> element and calculate its size based on one of
        the frames in spritesheet. then we use <Code>object-fit</Code> and <Code>object-position</Code> properties to
        control which part of the sprite is currently visible and by a css keyframe animation, we can flip through
        different frames.
      </p>

      <p>
        <Code>img</Code> will show all the frames of the spritesheet crammed together by default, because of the{" "}
        <Code>object-fit</Code> property default value - <Code>fill</Code>. <Code>object-fit</Code> determines what
        happens when the size of the image and the img element differ.
      </p>

      <div className="py-12 px-6 border rounded-lg">
        <img
          src="https://cdn.deathstalker.dev/images/eye-fire.png"
          alt="fire eye sprite"
          className="h-32 mx-auto"
        />
      </div>

      <p>
        we need to use <Code>cover</Code> so that it scales the image to cover the entire area of <Code>img</Code>{" "}
        element. even though it scales the image, it's still not quite right.
      </p>

      <div className="py-12 px-6 border rounded-lg">
        <img
          src="https://cdn.deathstalker.dev/images/eye-fire.png"
          alt="fire eye sprite"
          className="size-32 object-cover mx-auto"
        />
      </div>

      <p>
        we need <Code>object-position</Code> to determine which part of the image needs to be shown.
      </p>

      <div className="py-12 px-6 border rounded-lg">
        <img
          src="https://cdn.deathstalker.dev/images/eye-fire.png"
          alt="fire eye sprite"
          className="size-32 object-cover object-left mx-auto"
        />
      </div>

      <p>
        now, we need to add a looping keyframe animation to flip between each frame. currently the problem is that we're
        sliding the image smoothly instead of displaying each of the frames for an equal amount of time.
      </p>

      <style>{`
        @keyframes labs-sprites-fire-eye {
          from {
            object-position: 0% 0%;
          }
          to {
            object-position: 100% 0%;
          }
        }
      `}</style>
      <div className="py-12 px-6 border rounded-lg">
        <img
          src="https://cdn.deathstalker.dev/images/eye-fire.png"
          alt="fire eye sprite"
          className="size-32 object-cover object-left mx-auto"
          style={{
            animation: "labs-sprites-fire-eye 5s linear infinite",
          }}
        />
      </div>

      <p>
        in order to achieve the same effect, we can use the css timing function: <Code>steps()</Code>. this function
        defines a transition that divides the input time into a specified number of intervals that are equal in length.{" "}
        <Code>steps()</Code> accepts two parameters. an <strong>integer</strong> value which represents the number of
        equidistant intervals or 'steps' and it must be a positive integer. <strong>step-position</strong> which
        specifies when the jump between values occurs. if omitted, it defaults to end. the possible values include:{" "}
        <Code>jump-start</Code>, <Code>jump-end</Code>, <Code>jump-none</Code> & <Code>jump-both</Code>. it can be
        better understood if visualised.
      </p>

      <StepsLightbox />

      <p>
        the <Code>steps()</Code> splits the progression into discrete values. in our case, we need 16 steps{" "}
        <Code>steps(16, jump-none)</Code>, as a result the animation will spend 1/16th of the animation duration on each
        step.
      </p>

      <CodeBlock
        code={getKeyframeAnimation()}
        language="css"
      />

      <p>
        therefore, by sliding the image within the <Code>img</Code> element via <Code>object-position</Code> css
        property we can animate sprites.
      </p>

      <div className="py-12 px-6 border rounded-lg flex items-center justify-center">
        <FireEyeSprite />
      </div>

      <p>
        here are some more examples. to create an interactive sprite animation{" "}
        <InlineLink href="https://kbravh.dev/interactive-pixel-spritesheet-animations-with-css">
          @kbravh's blog
        </InlineLink>{" "}
        comes highly recommended. i might try this next.
      </p>

      <div className="py-12 px-6 border rounded-lg flex items-center justify-center gap-10">
        <RainSprite />
        <BatterySprite />
      </div>
    </>
  ),
  tech: "css",
  video: "",
  component: FireEyeSprite,
};

export { spritesConfig };
