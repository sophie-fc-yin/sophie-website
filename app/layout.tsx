import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sophie Yin — AI Systems for Creators",
  description:
    "Designing intelligent systems that automate content workflows, analyze audience signals, and scale digital media operations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f9f9f7] text-[#1a1a1a] antialiased`}>
        {/* Subtle top accent bar */}
        <div className="h-[2px] w-full bg-[#00d4aa]" />
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
