import { Code } from "@/components/ui/code";
import { InlineLink } from "@/components/ui/inline-link";
import { slugify } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import * as React from "react";
import { codeToHtml } from "shiki";

function Table({ data }: { data: { headers: Array<string>; rows: Array<Array<string>> } }) {
  const headers = data.headers.map((header, index) => <th key={`${index + 1}`}>{header}</th>);
  const rows = data.rows.map((row, index) => (
    <tr key={`${index + 1}`}>
      {row.map((cell, cellIndex) => (
        <td key={`${cellIndex + 1}`}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink({ href, ...props }: React.ComponentProps<typeof Link> & { href: string }) {
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        {...props}
      >
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

function CustomImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      alt={props.alt}
      className="rounded"
      {...props}
    />
  );
}

async function Pre({ children, ...props }: React.HtmlHTMLAttributes<HTMLPreElement>) {
  const codeElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === "code",
  ) as React.ReactElement<HTMLPreElement> | undefined;

  const className = codeElement?.props.className ?? "";
  const isCodeBlock = typeof className === "string" && className.startsWith("language-");

  if (isCodeBlock) {
    const lang = className.split(" ")[0]?.split("-")[1] ?? "";

    if (!lang) {
      return <code {...props}>{children}</code>;
    }

    const html = await codeToHtml(String(codeElement?.props.children), {
      lang,
      themes: {
        dark: "poimandres",
        light: "github-light-default",
      },
    });

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return <pre {...props}>{children}</pre>;
}

function createHeading(level: number) {
  const HeadingComponent = ({ children }: { children: React.ReactNode }) => {
    const childrenString = React.Children.toArray(children).join("");
    const slug = slugify(childrenString);
    return React.createElement(`h${level}`, { id: slug }, [
      React.createElement(
        "a",
        {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        },
        children,
      ),
    ]);
  };
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

const components = {
  a: CustomLink,
  img: CustomImage,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  pre: Pre,
  Code,
  InlineLink,
  Table,
};

export function BlogContent(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  );
}
