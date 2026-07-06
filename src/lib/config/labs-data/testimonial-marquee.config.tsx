import { TestimonialMarquee } from "@/components/labs/demo/testimonial-marquee.demo";
import { Code } from "@/components/ui/code";
import { CodeBlock } from "@/components/ui/code-block";

const getPointerTrackingLogic = () =>
  `if (!figureRef.current || isFocused) return;

const figure = figureRef.current;
const rect = figure.getBoundingClientRect();

setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });`;

const getHoverDeviceCheckLogic = () =>
  `const isHoverDevice = React.useMemo(
  () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches,
  [],
);`;

const getMarqueeCSSVarsLogic = () =>
  `<div
  {...props}
  style={
    {
      ...(duration && { "--duration": duration }),
      ...(gap && { "--gap": gap }),
      ...style,
    } as React.CSSProperties
  }
  className={cn(
    "relative group flex overflow-hidden [--duration:40s] [--gap:32px] gap-(--gap)",
    ...
  )}>
  ...
</div>`;

const getMarqueeContentLogic = () =>
  `{Array(repeat)
  .fill(0)
  .map((_, i) => (
    <div
      className={cn("flex gap-(--gap) justify-around shrink-0", {
        "flex-col": vertical,
        "flex-row animate-marquee": !vertical,
        "group-hover:paused": pauseOnHover,
        "direction-reverse": reverse,
      })}
      {...props}
    >
      {children}
    </div>
))}`;

const testimonialMarqueeConfig = {
  slug: "testimonial-marquee",
  title: "testimonial marquee",
  subHeading: "an infinitely scrolling marquee to showcase testimonials.",
  description: (
    <>
      <p>
        this is an example which combines two components: <span className="font-semibold">testimonial</span> &{" "}
        <span className="font-semibold">marquee</span>. i created both of them while working on a marketing website for
        a client.
      </p>
      <div>
        <h3 className="font-semibold mb-2">testimonial</h3>
        <p>
          this component features an opt-in spotlight hover effect using a classic layout for showcasing testimonials.
          the effect works by tracking the mouse position within the card. it also respects keyboard navigation. when
          the component receives keyboard focus, the spotlight effect is suppressed.
        </p>
      </div>
      <CodeBlock
        code={getPointerTrackingLogic()}
        language="typescript"
      />
      <p>
        on touch-only devices that do not support hover, the spotlight effect serves no purpose. to detect hover
        capability, we check the <Code>(hover: hover)</Code> media query.
      </p>
      <CodeBlock
        code={getHoverDeviceCheckLogic()}
        language="typescript"
      />
      <div>
        <h3 className="font-semibold mb-2">marquee</h3>
        <p>
          the marquee component features an infinite scrolling marquee with faded edges. it can be oriented to both
          horizontal and vertical direction along with single and multiple row layouts. one can also opt in to pause the
          marquee if hovered and reverse the direction of scrolling. it allows easy composition with other components;
          here testimonial is used.
        </p>
      </div>
      <CodeBlock
        code={getMarqueeContentLogic()}
        language="typescript"
      />
      <p>
        the children are rendered <Code>repeat</Code> times to create the illusion of infinite scrolling — as one copy
        scrolls out of view, the next fills the gap seamlessly. animation behaviour is controlled via tailwind utility
        classes: <Code>group-hover:paused</Code> freezes the marquee on hover, and <Code>direction-reverse</Code> flips
        the scroll direction.
      </p>
      <p>
        animation speed and item spacing are driven by two css custom properties: <Code>--duration</Code> (default{" "}
        <Code>40s</Code>) and <Code>--gap</Code> (default <Code>32px</Code>). they are set as inline css variables on
        the root element and consumed by the animation and layout which is overridable via the <Code>duration</Code> and{" "}
        <Code>gap</Code> props.
      </p>
      <CodeBlock
        code={getMarqueeCSSVarsLogic()}
        language="typescript"
      />
      <p>
        <Code>MarqueeFade</Code> is a separate absolutely-positioned overlay that renders a gradient fade on any of the
        four sides. it fades from the background colour to transparent, creating the soft edge effect.
      </p>
      <p>
        <Code>MarqueeItem</Code> is a minimal wrapper with <Code>shrink-0</Code> applied, preventing items from being
        squeezed when the container is too narrow. it is the recommended way to wrap each item in the marquee.
      </p>
      <p>composing the two gives us an infinite scrolling marquee that showcases testimonials.</p>
    </>
  ),
  tech: "css",
  video: "https://cdn.deathstalker.dev/videos/testimonial-marquee.mp4",
  component: TestimonialMarquee,
};

export { testimonialMarqueeConfig };
