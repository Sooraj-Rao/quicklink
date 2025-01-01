import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/component/theme-provider";
import { Header } from "@/components/component/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickLink - URL Shortener | Simplify Your Links",
  description:
    "QuickLink is a powerful URL shortener that helps you manage, track, and simplify your links with ease.",
  metadataBase: new URL("https://quicklink.soorajrao.in"),
  authors: [{ name: "Sooraj Rao" }],
  creator: "Sooraj Rao",
  publisher: "Sooraj Rao",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "QuickLink - URL Shortener | Simplify Your Links",
    description:
      "Shorten, manage, and track your URLs efficiently with QuickLink.",
    url: "https://quicklink.soorajrao.in",
    siteName: "QuickLink",
    images: [
      {
        url: "https://quicklink.soorajrao.in/client/public/img.webp",
        width: 1200,
        height: 630,
        alt: "QuickLink URL Shortener Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickLink - URL Shortener | Simplify Your Links",
    description:
      "Manage and track your shortened URLs with ease using QuickLink.",
    creator: "@SoorajRaoo",
    images: ["https://quicklink.soorajrao.in/client/public/img.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: [
    "URL shortener",
    "link management",
    "quick link",
    "shorten URL",
    "link tracking",
    "QuickLink",
  ],
  category: "Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
