import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BRANDING } from "@/config/branding";

export const metadata: Metadata = {
  title: `${BRANDING.productName} | ${BRANDING.tagline}`,
  description: BRANDING.secondaryMessage,
  keywords: [
    "NexoraGo AI",
    "Banff trip planner",
    "Canmore accommodation",
    "Lake Louise stays",
    "Calgary to Banff itinerary",
    "Canadian Rockies budget stays",
    "Parks Canada pass guide",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#080808] text-[#F2EDE4] antialiased font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
