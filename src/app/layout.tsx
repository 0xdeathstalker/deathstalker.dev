import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Provider from "@/components/provider";
import Footer from "@/components/sections/footer";
import { Favicon } from "@/components/ui/favicon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soumya",
  description: "What I’ve been crafting instead of sleeping.",
  icons: {
    icon: "/images/favicons/s-favicon-light.ico", // default favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <Favicon />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
