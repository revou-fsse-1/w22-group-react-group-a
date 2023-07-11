import IconBoard from "../assets/icon-board.svg";
import IconBoardWhite from "../assets/icon-board-white.svg";
import IconBoardPurple from "../assets/icon-board-purple.svg";

import Image from "next/image";
export default function BoardsSelection() {
  return (
    <div className="w-screen h-screen bg-black-overlay fixed flex justify-center z-50 top-0 left-0 p-24 md:hidden">
      <div className="pr-6 pb-3 bg-dark-grey absolute rounded-lg min-w-[265px] flex flex-col">
        <span className="text-medium-grey text-heading-sm mb-4 mt-4 ml-4 ">
          ALL BOARDS (3)
        </span>
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
        {/* CREATE NEW BOARD */}
        <button className="text-heading-md flex items-center gap-4 w-[100%] px-6 py-4 rounded-r-full text-main-purple">
          <Image priority src={IconBoardPurple} alt="icon-board" />+ Create New
          Board
        </button>
      </div>
    </div>
  );
}
