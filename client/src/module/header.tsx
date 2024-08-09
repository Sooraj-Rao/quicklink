import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme.toggle";
import { AiOutlineBug } from "react-icons/ai";

const Header = ({
  data,
}: {
  data: { contact: string; main: string; };
}) => {
  return (
    <header className=" flex justify-between   shadow-md shadow-white  items-center px-4 sm:px-10  sm:py-4 mt-5 sm:mt-0  dark:shadow-none    poppins-medium ">
      <a href={"/"}>
        <div className="scroll-m-20  flex items-center gap-2   font-bold   text-3xl  tracking-tight first:mt-0">
          <div className="  h-8 w-8 bg-white  rounded-xl">
            <img
              src="../../../icon2.png"
              alt=" "
              className=" scale-[1.2] mt-[1px]  "
            />
          </div>
          <span>QuickLink</span>
        </div>
      </a>
      <div className="  flex items-center  sm:gap-x-4 ">
        <a href={data.contact} target="_blank">
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

export default Header;
