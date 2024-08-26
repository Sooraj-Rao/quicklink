import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickLink - API Documentation",
  description:
    "Explore the QuickLink API documentation to learn how to integrate URL shortening and link management into your applications.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
