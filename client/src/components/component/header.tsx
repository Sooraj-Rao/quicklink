"use client";
import { Button } from "@/components/ui/button";
import { AiOutlineBug } from "react-icons/ai";
import { CodeXml } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "./toggle-theme";
import icon from "../../../public/icon2.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteMetaData } from "@/data/siteMetaData";
import fetchData from "./fetchData";
import { useZustandStore } from "./zustand.store";

export const Header = () => {
  const path = usePathname();
  const { Ref } = useZustandStore();

  const SendData = (data: string) => {
    fetchData(data, Ref || "search", "quicklink-header", "none");
  };

  return (
    <header className=" flex justify-between sticky top-0  bg-background/70  backdrop-blur   shadow-md shadow-foreground/5  items-center px-4 sm:px-10  sm:py-4 py-2 dark:border-b  border-b-foreground/20 sm:mt-0  dark:shadow-none ">
      <a href={"/"}>
        <div className="  flex items-center gap-2   font-extrabold  tracking-tight first:mt-0">
          <div className=" sm:block hidden scale-75 sm:scale-100 h-10 w-10 bg-white rounded-xl ">
            <Image
              src={icon}
              width={100}
              height={100}
              alt=" "
              className="  scale-[1.2] mt-[1px] "
            />
          </div>
          <span className=" text-xl  sm:text-3xl ">QuickLink</span>
        </div>
      </a>
      <div className="   flex items-center justify-end sm:gap-x-4    ">
        <Link
          href={"/"}
          className={`
        ${!path.includes("about") ? "hidden sm:block" : "block"}
        `}
        >
          <Button
            variant="ghost"
            className=" py-2 px-4  text-xs sm:text-sm rounded flex items-center gap-x-3"
          >
            <span>Home</span>
          </Button>
        </Link>
        <Link
          onClick={() => SendData("click:about-page")}
          href={"/about"}
          className={`
          ${path.includes("about") ? "hidden sm:block" : "block"}
          `}
        >
          <Button
            variant="ghost"
            className=" py-2 px-4 text-xs sm:text-sm rounded flex items-center gap-x-3"
          >
            <span>About</span>
          </Button>
        </Link>

        <a
          onClick={() => SendData("click:report-issue")}
          href={siteMetaData.report + "quicklink_header"}
          target="_blank"
        >
          <Button
            variant="ghost"
            className=" py-2 px-4   text-xs sm:text-sm  rounded md:flex hidden items-center gap-x-2"
          >
            <span>Report an Issue</span>
            <AiOutlineBug size={16} />
          </Button>
        </a>
        <Link onClick={() => SendData("click:API-page")} href={"/docs/api"}>
          <Button className=" scale-[.9] sm:flex hidden  text-xs sm:text-base    items-center gap-x-2 sm:gap-x-3">
            <span>API</span>
            <CodeXml size={20} />
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};
