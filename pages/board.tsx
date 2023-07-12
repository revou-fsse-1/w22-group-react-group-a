import Image from "next/image";

import LogoMobile from "../assets/logo-mobile.svg";
import LogoLight from "../assets/logo-light.svg";
import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconChevronUp from "../assets/icon-chevron-up.svg";
import IconPlus from "../assets/icon-plus.svg";
import IconShowSidebar from "../assets/icon-show-sidebar.svg";
import IconBoard from "../assets/icon-board.svg";
import IconBoardWhite from "../assets/icon-board-white.svg";
import IconBoardPurple from "../assets/icon-board-purple.svg";
import IconVerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";

import Sidebar from "@/components/Sidebar";
import BoardsSelection from "@/components/SidebarMobile";
import EditDeleteSelection from "@/components/EditDeleteSelection";
import { useState } from "react";
import * as React from "react";

export default function Board() {
  // BOARDS SELECTION STATE
  const [boardsSelectionIsActive, setBoardsSelectionIsActive] = useState(false);
  const [activeBoard, setActiveBoard] = useState("");

  //   EDIT DELETE SELECTION STATE
  const [editDeleteBoardIsActive, setEditDeleteBoardIsActive] = useState(false);
  const toggleEditDeleteBoard = () => {
    setEditDeleteBoardIsActive((current) => !current);
  };

  return (
    // BACKGROUND
    <div className="bg-very-dark-grey h-screen w-screen flex">
      {/* SIDEBAR */}
      {boardsSelectionIsActive && (
        <Sidebar setBoardsSelectionIsActive={setBoardsSelectionIsActive} />
      )}

      {/* NAVBAR AND VIEWPORT CONTAINER */}
      <div className="w-full flex flex-col">
        {/* NAVBAR */}
        <nav className="bg-dark-grey h-[65px] md:min-h-[80px] flex items-center gap-4 md:gap-8 px-4 md:px-6 w-full md:border-b border-lines-dark">
          {/* LOGO MOBILE*/}
          <Image
            className="md:hidden"
            priority
            src={LogoMobile}
            alt="logo-mobile"
          />
          {/* LOGO TABLET & DESKTOP */}
          {!boardsSelectionIsActive && (
            <div className="hidden md:flex flex-col justify-center pr-8 py-6 border-r border-lines-dark h-full">
              <Image priority src={LogoLight} alt="logo-dark" />
            </div>
          )}

          {/* BOARD NAME TABLET & DESKTOP */}
          <span className="hidden md:block text-heading-lg">
            Platform Launch
          </span>
          {/* BOARDS SELECTION BUTTON MOBILE */}
          <button
            onClick={() => setBoardsSelectionIsActive(true)}
            className="relative text-heading-lg text-white flex items-center gap-4 md:hidden"
          >
            Platform Launch
            <Image
              priority
              src={boardsSelectionIsActive ? IconChevronUp : IconChevronDown}
              alt="icon-chevron-down"
            />
          </button>
          <div className="flex justify-center items-center gap-6 ml-auto">
            {/* ADD NEW TASK MOBILE */}
            <button className="bg-main-purple w-[48px] h-[32px] rounded-full text-heading-md flex justify-center items-center hover:cursor-pointer hover:bg-main-purple-hover md:hidden">
              <Image priority src={IconPlus} alt="icon-plus" />
            </button>
            {/* ADD NEW TASK TABLET & DESKTOP */}
            <button className="hidden md:block bg-main-purple text-heading-md p-4 px-6 rounded-full hover:bg-main-purple-hover">
              + Add New Task
            </button>
            {/* EDIT DELETE TOGGLE BUTTON */}

            <button
              onClick={toggleEditDeleteBoard}
              className="hover:cursor-pointer relative"
            >
              <Image
                priority
                src={IconVerticalEllipsis}
                alt="icon-vertical-ellipsis"
              />
            </button>

            {editDeleteBoardIsActive && <EditDeleteSelection />}
          </div>
        </nav>
        {/* POPUP */}
        {boardsSelectionIsActive && <BoardsSelection />}

        {/* VIEWPORT */}
        <section className="w-full h-full flex p-6">
          {/* EMPTY MESSAGE */}
          <div className="flex flex-col w-full items-center justify-center gap-8">
            <span className="text-heading-lg text-center text-medium-grey">
              This board is empty. Create a new column to get started
            </span>
            <button className="bg-main-purple text-heading-md p-4 px-6 rounded-full hover:bg-main-purple-hover">
              + Add New Column
            </button>
          </div>
        </section>
      </div>

      {/* BOTTOM LEFT BUTTON */}
      {!boardsSelectionIsActive && (
        <button
          onClick={() => setBoardsSelectionIsActive((current) => !current)}
          className=" hidden md:block p-5 rounded-r-full bg-main-purple z-40 fixed bottom-8"
        >
          <Image src={IconShowSidebar} alt="icon-show-sidebar" />
        </button>
      )}
    </div>
  );
}
