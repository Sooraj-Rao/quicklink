import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickLink - About ",
  description:
    "Learn more about QuickLink and how we simplify URL shortening and link management.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
