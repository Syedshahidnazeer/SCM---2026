import type { Metadata, Viewport } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000"
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Syed Cycle Mart Kadapa",
  description:
    "A premium scrollytelling website for Syed Cycle Mart, a cycle shop on Trunk Road, Ganagapeta, Kadapa.",
  openGraph: {
    title: "Syed Cycle Mart Kadapa",
    description: "Cycles, accessories, and repair support from Trunk Road, Ganagapeta, Kadapa.",
    images: ["/resources/ezgif-frame-001.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
