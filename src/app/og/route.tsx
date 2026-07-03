import { join } from "node:path";
import { readFileSync } from "fs";
import { ImageResponse } from "next/og";

const geistPixelSquare = readFileSync(join(process.cwd(), "src/assets/fonts/GeistPixel-Square.ttf"));
const geistSansRegular = readFileSync(join(process.cwd(), "src/assets/fonts/Geist-Regular.ttf"));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return new ImageResponse(
    <div tw="relative w-full h-full mx-auto bg-[#fbfaf9] text-[#463947] flex">
      <div tw="absolute z-10 top-0 h-full left-1/13 text-[#79697b]/65 flex">
        <svg
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
            stroke-width="2"
            stroke-dasharray="1 1"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div tw="absolute z-10 top-0 h-full right-1/13 text-[#79697b]/65 flex">
        <svg
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
            stroke-width="2"
            stroke-dasharray="1 1"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div tw="absolute z-10 w-full top-1/8 text-[#79697b]/65 flex">
        <svg
          data-direction="top"
          data-variant="full-screen"
          data-orientation="horizontal"
          width="100%"
          height="1"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0.5"
            x2="100"
            y2="0.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-dasharray="0.5 0.5"
            vector-effect="non-scaling-stroke"
          ></line>
        </svg>
      </div>

      <div tw="absolute z-10 w-full bottom-1/8 text-[#79697b]/65 flex">
        <svg
          data-direction="top"
          data-variant="full-screen"
          data-orientation="horizontal"
          width="100%"
          height="1"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0.5"
            x2="100"
            y2="0.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-dasharray="0.5 0.5"
            vector-effect="non-scaling-stroke"
          ></line>
        </svg>
      </div>

      <div tw="absolute top-1/8.25 left-1/13.65 h-2 w-2 z-20 border border-[#796697]/65 bg-[#fbfaf9] flex" />
      <div tw="absolute bottom-1/8.25 left-1/13.65 h-2 w-2 z-20 border border-[#796697]/65 bg-[#fbfaf9] flex" />
      <div tw="absolute top-1/8.25 right-1/13.65 h-2 w-2 z-20 border border-[#796697]/65 bg-[#fbfaf9] flex" />
      <div tw="absolute bottom-1/8.25 right-1/13.65 h-2 w-2 z-20 border border-[#796697]/65 bg-[#fbfaf9] flex" />

      <div tw="absolute inset-x-0 bottom-30 left-30 flex flex-col justify-end">
        <h1
          style={{
            fontFamily: "GeistPixelSquare",
            fontWeight: 800,
            fontSize: 64,
            lineHeight: 1,
            textWrap: "balance",
            letterSpacing: "-0.025em",
            color: "#463947",
          }}
        >
          {title}
        </h1>
      </div>

      <div tw="absolute inset-x-0 bottom-22 left-31 flex flex-col justify-end">
        <p
          style={{
            fontFamily: "GeistSans",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: 1.25,
            textWrap: "balance",
            color: "#79697b",
          }}
        >
          {description}
        </p>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "GeistSans",
          data: geistSansRegular,
          weight: 400,
        },
        {
          name: "GeistPixelSquare",
          data: geistPixelSquare,
        },
      ],
    },
  );
}
