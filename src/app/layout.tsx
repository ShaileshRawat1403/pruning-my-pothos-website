import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundGrid from "../components/BackgroundGrid";
import ScrollAnimations from "../components/ScrollAnimations";
import ScrollProgress from "../components/ScrollProgress";
import ConsoleToastHost from "../components/ConsoleToastHost";
export const metadata: Metadata = {
  title: "Sans Serif Systems | Open Tools for Natural Language Programming",
  description: "Sans Serif Systems is a solo-builder systems laboratory and utility bench for making AI-assisted work predictable, verifiable, and secure. Built for anyone who builds by intent, not only by code. Natural language is the new API.",
  icons: {
    icon: [
      { url: "/my-self-portrait.svg", type: "image/svg+xml" },
      { url: "/my-self-portrait.png", type: "image/png" },
    ],
    shortcut: "/my-self-portrait.png",
    apple: "/my-self-portrait.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="h-full">
      <body
        className="min-h-full flex flex-col relative overflow-x-hidden"
        style={{ background: "var(--bg-color)", color: "var(--text-primary)" }}
      >
        <ScrollAnimations />
        <ScrollProgress />
        <BackgroundGrid />
        <div className="masthead-scrim" aria-hidden />
        <Header />
        <main className="relative z-10 w-full flex-grow">
          <div className="app-shell">
            {children}
          </div>
        </main>
        <Footer />
        <ConsoleToastHost />
      </body>
    </html>
  );
}
