"use client";

import * as React from "react";

const quotes = [
  "Find Flow.",
  "Stay Curious.",
  "Keep Building.",
  "Think Different.",
  "Less is More.",
  "Make it Simple.",
  "Trust the Process.",
];

function RandomQuotes() {
  const [quote, setQuote] = React.useState<string | null>(null);

  React.useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return <span className="font-mono text-sm text-neutral-500">{quote}</span>;
}

export { RandomQuotes, quotes };
