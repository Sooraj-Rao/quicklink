import { Button } from "@/components/ui/button";
import { AiOutlineBug } from "react-icons/ai";
import { CodeXml } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "./toggle-theme";
import icon from "../../../public/icon2.png";

export const Header = () => {
  return (
    <header className=" flex justify-between   shadow-md shadow-white  items-center px-4 sm:px-10  sm:py-4 mt-5 sm:mt-0  dark:shadow-none    poppins-medium ">
      <a href={"/"}>
        <div className="scroll-m-20  flex items-center gap-2   font-extrabold   text-3xl  tracking-tight first:mt-0">
          <div className=" h-10 w-10 bg-white rounded-xl ">
            <Image
              src={icon}
              width={100}
              height={100}
              alt=" "
              className=" scale-[1.2] mt-[1px] "
            />
          </div>
          <span>QuickLink</span>
        </div>
      </a>
      <div className="   flex items-center  sm:gap-x-4 ">
        <Button className=" flex items-center gap-x-3">
          <span>API</span>
          <CodeXml size={20} />
        </Button>
        <a href={""} target="_blank">
          <Button
            variant="ghost"
            className=" py-2 px-4 rounded md:flex hidden items-center gap-x-3"
          >
            <AiOutlineBug size={20} />
            <span>Report an Issue</span>
          </Button>
        </a>
        <ModeToggle />
      </div>
    </header>
  );
};
