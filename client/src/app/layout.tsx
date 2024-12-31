import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/component/theme-provider";
import { Header } from "@/components/component/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickLink - URL Shortener",
  description:
    "QuickLink is a powerful URL shortener that helps you manage and track your links easily.",
  keywords:
    "URL shortener, link management, quick link, shorten URL, link tracking",
  authors: [{ name: "Sooraj Rao" }],
  openGraph: {
    title: "QuickLink - URL Shortener",
    description:
      "Shorten your URLs and manage them efficiently with QuickLink.",
    url: "https://quicklink.soorajrao.in",
    siteName: "QuickLink",
    images: [
      {
        url: "/client/public/img.webp",
        width: 800,
        height: 600,
        alt: "QuickLink",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickLink - URL Shortener",
    description: "Manage and track your shortened URLs with ease.",
    images: ["/client/public/img.webp"],
  },
  metadataBase: new URL("https://quicklink.soorajrao.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
