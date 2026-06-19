import type { Metadata, Viewport } from "next";
import { Inter, PT_Sans } from "next/font/google";
import "@/assets/globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-ptSans-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "LandingForge | AI Landing Page Builder ✨",
  description:
    "LandingForge helps you build stunning landing pages with AI, no code required. Create high-converting pages with LandingForge and enjoy the magic of AI.",
  openGraph: {
    title: "LandingForge | AI Landing Page Builder ✨",
    description:
      "LandingForge helps you build stunning landing pages with AI, no code required. Create high-converting pages with LandingForge and enjoy the magic of AI.",
    url: "https://landingforge.app",
    siteName: "LandingForge",
    images: [
      {
        url: "/favicon-logo.png",
        width: 1200,
        height: 630,
        alt: "LandingForge Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LandingForge | AI Landing Page Builder ✨",
    description:
      "LandingForge helps you build stunning landing pages with AI, no code required. Create high-converting pages with LandingForge and enjoy the magic of AI.",
    images: ["/favicon-logo.png"],
  },
  appleWebApp: {
    capable: true,
    title: "LandingForge",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon-logo.png",
    shortcut: "/favicon-logo.png",
    apple: "/favicon-logo.png",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ptSans.variable} antialiased bg-black dark h-[100dvh] overflow-hidden`}
      >
        <Toaster richColors position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
