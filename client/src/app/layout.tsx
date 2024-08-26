import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, ThemeProvider } from "@/components/component";
import { Toaster } from "@/components/ui/toaster";

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
        url: "/client/public/icon2.png",
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
    images: ["/client/public/icon2.png"],
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:locale" content="en_US" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
