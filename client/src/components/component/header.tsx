"use client";
import { Button } from "@/components/ui/button";
import { AiOutlineBug } from "react-icons/ai";
import { CodeXml, Menu } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "./toggle-theme";
import icon from "../../../public/icon2.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteMetaData } from "@/data/siteMetaData";
import fetchData from "./fetchData";
import { useZustandStore } from "./zustand.store";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export const Header = () => {
  const path = usePathname();
  const { Ref } = useZustandStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SendData = (data: string) => {
    fetchData(data, Ref || "search", "quicklink-header", "none");
  };

  const NavLink = ({
    href,
    onClick,
    children,
    target = "_self",
    icon = null,
  }: {
    href: string;
    onClick?: () => void;
    target?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <Link target={target} href={href} onClick={onClick}>
      <Button
        variant={`${href.includes("docs") ? "default" : "ghost"}`}
        size="sm"
        className="w-full text-sm justify-start "
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Button>
    </Link>
  );

  const NavContent = () => (
    <>
      <NavLink href="/" onClick={() => setIsSidebarOpen(false)}>
        Home
      </NavLink>
      <NavLink
        href="/about"
        onClick={() => {
          SendData("click:about-page");
          setIsSidebarOpen(false);
        }}
      >
        About
      </NavLink>
      <NavLink
        target={"_blank"}
        href={siteMetaData.report + "quicklink_header"}
        onClick={() => {
          SendData("click:report-issue");
          setIsSidebarOpen(false);
        }}
      >
        Report an Issue
      </NavLink>
      <NavLink
        icon={<CodeXml className="h-4 w-4" />}
        href="/docs/api"
        onClick={() => {
          SendData("click:API-page");
          setIsSidebarOpen(false);
        }}
      >
        API
      </NavLink>
    </>
  );

  return (
    <header className="flex justify-between sticky top-0 bg-background/70 backdrop-blur shadow-md shadow-foreground/5 items-center px-4 sm:px-10 py-2 sm:py-4 dark:border-b border-b-foreground/20 dark:shadow-none z-50">
      <Link
        href="/"
        className="flex items-center gap-2 font-extrabold tracking-tight"
      >
        <span className="text-xl sm:text-3xl">QuickLink</span>
      </Link>
      <div className="flex items-center justify-end gap-x-2 sm:gap-x-4">
        <div className="hidden sm:flex items-center gap-x-2">
          <NavContent />
        </div>
        <ModeToggle />
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <NavContent />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
