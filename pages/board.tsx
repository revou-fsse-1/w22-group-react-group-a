import LogoMobile from "../assets/logo-mobile.svg";
import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconPlus from "../assets/icon-plus.svg";
import Image from "next/image";
import IconVerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";

export default function Board() {
  return (
    // BACKGROUND PAGE
    <div className="bg-very-dark-grey h-screen w-screen">
      <nav className="bg-dark-grey h-[65px] flex items-center gap-4 p-4">
        <Image priority src={LogoMobile} alt="logo-mobile" />
        <button className="text-heading-lg text-white flex items-center gap-4">
          Platform Launch
          <Image priority src={IconChevronDown} alt="icon-chevron-down" />
        </button>
        <div className="flex justify-center items-center gap-4 ml-auto">
          <button className="bg-main-purple w-[48px] h-[32px] rounded-full text-heading-md flex justify-center items-center hover:cursor-pointer hover:bg-main-purple-hover">
            <Image priority src={IconPlus} alt="icon-plus" />
          </button>
          <button className="hover:cursor-pointer">
            <Image
              priority
              src={IconVerticalEllipsis}
              alt="icon-vertical-ellipsis"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
