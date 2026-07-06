import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/marquee";
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorInfo,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarFallback,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/components/ui/testimonial";

function TestimonialMarquee() {
  return (
    <div className="space-y-4 w-full min-w-0">
      <div className="bg-neutral-900 flex flex-col justify-center border rounded-md py-14 space-y-4">
        <Marquee gap="0.5rem">
          <MarqueeFade
            align="left"
            className="from-neutral-900"
          />
          <MarqueeFade
            align="right"
            className="from-neutral-900"
          />

          <MarqueeContent pauseOnHover>
            {TESTIMONIALS.map((t) => (
              <MarqueeItem
                key={`item-${t.authorName}`}
                className="w-xs"
              >
                <Testimonial
                  showSpotlight
                  className="h-full bg-neutral-800 text-neutral-100 rounded-sm ring-1 ring-inset ring-foreground/40"
                >
                  <TestimonialQuote className="text-sm">{t.quote}</TestimonialQuote>

                  <TestimonialAuthor>
                    <TestimonialAvatar>
                      <TestimonialAvatarFallback seed={t.authorName} />
                      <TestimonialAvatarRing />
                    </TestimonialAvatar>

                    <TestimonialAuthorInfo>
                      <TestimonialAuthorName className="text-sm">{t.authorName}</TestimonialAuthorName>
                      <TestimonialAuthorTagline className="text-neutral-400">
                        {t.authorTagline}
                      </TestimonialAuthorTagline>
                    </TestimonialAuthorInfo>
                  </TestimonialAuthor>
                </Testimonial>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>

      <div className="bg-background flex flex-col justify-center border rounded-md py-14 space-y-4">
        <Marquee gap="0.5rem">
          <MarqueeFade align="left" />
          <MarqueeFade align="right" />

          <MarqueeContent
            reverse
            pauseOnHover
          >
            {TESTIMONIALS.map((t) => (
              <MarqueeItem
                key={`item-${t.authorName}`}
                className="w-xs"
              >
                <Testimonial
                  showSpotlight
                  spotlightColor="rgba(0, 201, 81, 0.25)"
                  className="h-full bg-card rounded-sm ring-1 ring-inset ring-border"
                >
                  <TestimonialQuote className="text-sm">{t.quote}</TestimonialQuote>

                  <TestimonialAuthor>
                    <TestimonialAvatar>
                      <TestimonialAvatarFallback seed={t.authorName} />
                      <TestimonialAvatarRing />
                    </TestimonialAvatar>

                    <TestimonialAuthorInfo>
                      <TestimonialAuthorName className="text-sm">{t.authorName}</TestimonialAuthorName>
                      <TestimonialAuthorTagline className="text-neutral-400">
                        {t.authorTagline}
                      </TestimonialAuthorTagline>
                    </TestimonialAuthorInfo>
                  </TestimonialAuthor>
                </Testimonial>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </div>
  );
}

export { TestimonialMarquee };

const TESTIMONIALS = [
  {
    authorName: "Maya Thornton",
    authorTagline: "Lead Designer @company",
    quote: "Stumbled across this portfolio and couldn't stop clicking through it. The interactions feel alive.",
  },
  {
    authorName: "Rafael Osei",
    authorTagline: "Founder @XYZ",
    quote: "The level of craft here sets a new bar. I'm sending this to our entire design team.",
  },
  {
    authorName: "Priya Menon",
    authorTagline: "Staff Engineer @coolcompany",
    quote: "Rarely do I see someone nail both the engineering and the aesthetics this consistently.",
  },
  {
    authorName: "Luca Ferreira",
    authorTagline: "Creative Director @bigcompany",
    quote: "Every scroll, every transition — nothing is accidental here. Beautifully intentional work.",
  },
  {
    authorName: "Nora Halstrom",
    authorTagline: "Co-founder @startup",
    quote: "This is the portfolio I wish I had built. The micro-interactions alone are worth studying.",
  },
  {
    authorName: "Dmitri Volkov",
    authorTagline: "Design Engineer @pbcompany",
    quote: "You can feel the hours of iteration behind every component. Exceptional taste.",
  },
  {
    authorName: "Selin Aydın",
    authorTagline: "Product @another",
    quote: "I've reviewed hundreds of portfolios this year. This one is in a category of its own.",
  },
];
