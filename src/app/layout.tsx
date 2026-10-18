import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang";
import { AudioProvider } from "@/lib/audio";
import { Nav } from "@/components/ui";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Jàng HHA — Home Health Aide training, EN + FR",
  description: "Study for the New York Home Health Aide certificate in English and French, with audio. Lessons, 43 procedures, 188 practice questions, glossary.",
  manifest: "/hha/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Jàng HHA", statusBarStyle: "default" },
  icons: { icon: "/hha/icon.svg", apple: "/hha/icon.svg" },
};
export const viewport: Viewport = { themeColor: "#0e7c7b", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LangProvider><AudioProvider>{children}<Nav /></AudioProvider></LangProvider>
      </body>
    </html>
  );
}
