import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme.toggle";
import { AiOutlineBug } from "react-icons/ai";
import { FaGithub} from "react-icons/fa";

const Header = ({
  data,
}: {
  data: { contact: string; main: string; github: string };
}) => {
  return (
    <div className=" flex justify-between items-center px-10  py-4 mt-5 sm:mt-0  dark:shadow-none    poppins-medium ">
        <a href={"/"}>
          <div className="scroll-m-20  flex items-center gap-2  h-10 font-bold  pb-2 text-3xl  tracking-tight first:mt-0">
            <div className="  h-8 w-8 bg-white  rounded-xl">
              <img src="../../../icon2.png" alt=" " className=" scale-[1.2] mt-[1px]  " />
            </div>
            <span>QuickLink</span>
          </div>
        </a>
      <div className="  flex gap-x-4 ">
        <div className="  flex sm:gap-x-4 ">
          <a href={data.contact} target="_blank">
            <Button
              variant="ghost"
              className=" py-2 px-4 rounded md:flex hidden items-center gap-x-3"
            >
              <AiOutlineBug size={20} />
              <span>Report an Issue</span>
            </Button>
          </a>
          <a href={data.github} target="_blank">
            <Button
              variant="ghost"
              className=" py-2 px-3   rounded  md:flex hidden items-center gap-x-1"
            >
              <FaGithub size={20} />
            </Button>
          </a>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
