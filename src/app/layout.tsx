import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sergii Pavlov — Full-Stack Developer",
    template: "%s | Sergii Pavlov",
  },
  description:
    "Interactive portfolio of Full-Stack Developer Sergii Pavlov: React/Next.js, Node.js, AI assistants, and real production projects.",
  openGraph: {
    title: "Sergii Pavlov — Interactive Portfolio",
    description:
      "Skill balloons, AI-powered projects, and real-world apps built with React/Next.js and Node.js.",
    siteName: "Sergii Pavlov Portfolio",
    images: [
      {
        url: "/logo-sp.svg",
        width: 400,
        height: 120,
        alt: "Logo SP — Sergii Pavlov",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
