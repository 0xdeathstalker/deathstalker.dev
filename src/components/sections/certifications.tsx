import Link from "next/link";
import { LinkArrowIcon } from "@/components/ui/link-arrow-icon";
import { SectionHeading } from "@/components/ui/heading";
import { type Certificate, certificates } from "@/lib/config/site-data";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
      <div className="relative inline-flex items-center justify-between gap-3 link overflow-x-hidden">
        <div className="size-6 shrink-0 border rounded p-0.5 bg-accent">
          <Image
            src={certificate.icon}
            alt={certificate.name}
            width={24}
            height={24}
          />
        </div>

        <div className="inline-flex items-center gap-1 overflow-x-hidden">
          <Link
            href={certificate.link}
            target="_blank"
            className={cn(
              "text-lg text-nowrap relative",
              "before:content-[''] before:-z-10 before:absolute before:bottom-0.5 before:w-0 before:h-px before:bg-mauve-900",
              "before:transition-all before:ease-circ-in-out hover:before:w-full",
            )}
          >
            {certificate.name}
          </Link>

          <div className="relative">
            {/* <div className="sm:hidden absolute top-0 right-5 h-full w-10 bg-linear-to-l from-background to-transparent" /> */}
            <LinkArrowIcon className="size-5" />
          </div>
        </div>
      </div>

      <span className="font-mono text-xs tracking-tighter hidden min-[440px]:inline text-mauve-500">
        {certificate.date}
      </span>
    </div>
  );
}

export { Certifications };
