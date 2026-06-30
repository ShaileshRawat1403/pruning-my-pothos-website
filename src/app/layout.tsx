import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundGrid from "../components/BackgroundGrid";
import ScrollAnimations from "../components/ScrollAnimations";
export const metadata: Metadata = {
  title: "Sans Serif Systems | Open Tools for Natural Language Programming",
  description: "Sans Serif Systems offers browser-native utilities, visual canvases, and evaluation harness templates to design, govern, and validate AI-assisted developer workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="h-full">
      <body className="min-h-full flex flex-col relative bg-[var(--bg-color)] text-[var(--text-primary)]">
        <ScrollAnimations />
        <div className="glow-blob glow-cyan"></div>
        <div className="glow-blob glow-purple"></div>
        <BackgroundGrid />
        <Header />
        <main className="relative z-10 w-full max-w-[1200px] mx-auto px-8 py-8 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
