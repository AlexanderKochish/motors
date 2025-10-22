import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/shared/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monksland Motors - Car Repair & Maintenance",
  description: "Professional car repair and maintenance services in Athlone",
  keywords: [
    "auto repair",
    "car repair",
    "car maintenance",
    "car service",
    "car diagnostics",
    "body repair",
    "engine repair",
    "oil change",
    "replacing brake pads",
    "computer diagnostics",
    "suspension repair",
    "urgent car repair",
    "high-quality repairs at a low price",
    "budget car repair",
    "car repair in Athlone",
    "car repair in Monksland",
  ],
  openGraph: {
    title: "Monksland Motors - Professional car service in Athlone",
    description:
      "A full range of car repair and maintenance services. Diagnostics, maintenance, body repair, oil changes. Quality guaranteed!",
    url: "https://monksland-motors.vercel.app/",
    siteName: "Monksland Motors",
    images: [
      {
        url: "https://monksland-motors.vercel.app/logo.png",
        width: 400,
        height: 400,
        alt: "Monksland Motors - Professional Auto Repair",
      },
    ],
    locale: "en_EN",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
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
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
