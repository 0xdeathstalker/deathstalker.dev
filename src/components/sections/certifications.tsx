import Link from "next/link";
import { LinkArrowIcon } from "@/components/link-arrow-icon";
import { SectionHeading } from "@/components/ui/heading";
import { type Certificate, certificates } from "@/lib/config/site-data";
import { cn } from "@/lib/utils";

function Certifications() {
  return (
    <section id="work">
      <SectionHeading className="px-4">certifications</SectionHeading>

      <div className="space-y-4 py-6">
        {certificates.map((certificate) => (
          <CertificateItem
            key={certificate.id}
            certificate={certificate}
          />
        ))}
      </div>
    </section>
  );
}

function CertificateItem({ certificate }: { certificate: Certificate }) {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="relative flex items-center gap-3">
        <div className="size-6 rounded flex items-center justify-center overflow-hidden">{certificate.icon}</div>

        <div className="group/title flex items-center gap-1.5 link">
          <Link
            href={certificate.link}
            target="_blank"
            className={cn(
              "relative w-full text-lg",
              "before:content-[''] before:-z-10 before:absolute before:bottom-0.5 before:w-0 before:h-px before:bg-mauve-900",
              "before:ease-circ-in-out before:transition-[width] group-hover/title:before:w-full",
            )}
          >
            {certificate.name}
          </Link>

          <LinkArrowIcon />
        </div>
      </div>

      <span className="font-mono text-xs tracking-tighter hidden min-[440px]:inline text-mauve-500">
        {certificate.date}
      </span>
    </div>
  );
}

export { Certifications };
