import { MaskScrollArea } from "@/components/ui/masked-scroll-area";

function MaskScroll() {
  return (
    <div className="mx-2 space-y-5">
      <div className="h-88 max-w-[500px] bg-neutral-100/80 border rounded-lg p-2">
        <MaskScrollArea
          orientation="vertical"
          className="space-y-1 h-full"
        >
          {ITEMS.map((item, idx) => (
            <div
              key={`${idx + 1}-item`}
              className="bg-white flex flex-col gap-2 border rounded-md py-2 px-3"
            >
              <span>{item.title}</span>
              <span className="text-xs">{item.description}</span>
            </div>
          ))}
        </MaskScrollArea>
      </div>

      <div className="h-48 w-[500px] bg-neutral-100/80 border rounded-lg p-2">
        <MaskScrollArea
          orientation="horizontal"
          className="flex items-center gap-2 h-full"
        >
          {ITEMS.map((item, idx) => (
            <div
              key={`${idx + 1}-item`}
              className="bg-white min-w-52 size-full flex flex-col justify-center gap-2 border rounded-sm py-2 px-3"
            >
              <span>{item.title}</span>
              <span className="text-xs">{item.description}</span>
            </div>
          ))}
        </MaskScrollArea>
      </div>
    </div>
  );
}

const ITEMS = [
  {
    title: "AI Code Assistants",
    description: "Tools that autocomplete and generate code using large language models.",
  },
  {
    title: "Edge Computing",
    description: "Processing data closer to the source to reduce latency.",
  },
  {
    title: "WebAssembly",
    description: "Binary format enabling near-native performance in browsers.",
  },
  {
    title: "Serverless Functions",
    description: "Event-driven compute without managing infrastructure.",
  },
  {
    title: "Micro Frontends",
    description: "Splitting frontend apps into independently deployable units.",
  },
  {
    title: "GraphQL Adoption",
    description: "Query language replacing REST for flexible data fetching.",
  },
  {
    title: "Container Orchestration",
    description: "Automating deployment and scaling of containerized apps.",
  },
  {
    title: "Zero Trust Security",
    description: "Verifying every request regardless of network location.",
  },
  {
    title: "Progressive Web Apps",
    description: "Web apps with native-like offline and install capabilities.",
  },
  {
    title: "Low-Code Platforms",
    description: "Building applications with minimal hand-written code.",
  },
  {
    title: "Real-Time Collaboration",
    description: "Multi-user editing powered by CRDTs and operational transforms.",
  },
  {
    title: "DevOps Automation",
    description: "CI/CD pipelines streamlining build, test, and deploy cycles.",
  },
  {
    title: "Blockchain Integration",
    description: "Decentralized ledgers for transparent transaction records.",
  },
  {
    title: "Observability Tools",
    description: "Unified logging, tracing, and metrics for distributed systems.",
  },
  {
    title: "Green Computing",
    description: "Reducing energy consumption and carbon footprint in software.",
  },
];

export { MaskScroll };
