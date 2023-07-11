import LogoLight from "../assets/logo-light.svg";
import Image from "next/image";
import IconBoard from "../assets/icon-board.svg";
import IconBoardWhite from "../assets/icon-board-white.svg";
import IconBoardPurple from "../assets/icon-board-purple.svg";
import IconHideSidebar from "../assets/icon-hide-sidebar.svg";

export default function Sidebar(props: {
  setBoardsSelectionIsActive: React.Dispatch<SetStateAction<boolean>>;
}) {
  const hideSidebar = () => {
    props.setBoardsSelectionIsActive(false);
  };

  return (
    <div className="hidden md:flex flex-col pr-6 bg-dark-grey h-screen min-w-[260px] border-r border-r-lines-dark">
      <div className="w-full h-[80px] p-6 flex items-center ">
        <Image priority src={LogoLight} alt="logo-dark" />
      </div>
      <span className="text-medium-grey text-heading-sm mb-4 mt-4 ml-6 ">
        ALL BOARDS (3)
      </span>

      {/* BOARD LIST CONTAINER */}
      <div>
        {/* ACTIVE */}
        <button className="text-heading-md flex items-center gap-4 w-[100%] bg-main-purple px-6 py-4 rounded-r-full">
          <Image priority src={IconBoardWhite} alt="icon-board" />
          Platform Launch
        </button>
        {/* DISABLED */}
        <button className="text-heading-md text-medium-grey flex items-center gap-4 w-[100%] px-6 py-4 rounded-r-full">
          <Image priority src={IconBoard} alt="icon-board" />
          Marketing Plan
        </button>
        <button className="text-heading-md text-medium-grey flex items-center gap-4 w-[100%] px-6 py-4 rounded-r-full">
          <Image priority src={IconBoard} alt="icon-board" />
          Roadmap
        </button>
      </div>

      {/* CREATE NEW BOARD */}
      <button className="text-heading-md flex items-center gap-4 w-[100%] px-6 py-4 rounded-r-full text-main-purple">
        <Image priority src={IconBoardPurple} alt="icon-board" />+ Create New
        Board
      </button>

      <button
        type="button"
        onClick={hideSidebar}
        // onClick={props.setBoardsSelectionIsActive(false)}
        className="text-medium-grey text-heading-md flex items-center gap-4  mb-8 mt-auto px-6 py-4 rounded-r-full hover:bg-white-custom"
      >
        <Image priority src={IconHideSidebar} alt="icon-hide-sidebar" />
        Hide Sidebar
      </button>
    </div>
  );
}
