/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useState } from "react";

import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconChevronUp from "../assets/icon-chevron-up.svg";
import IconVerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import StatusList from "./StatusList";

export default function TaskDetail() {
  // STATUS LIST
  const [statusListIsActive, setStatusListIsActive] = useState(false);
  const toggleStatusList = () => {
    setStatusListIsActive((current) => !current);
  };

  return (
    <div className="bg-black-overlay flex justify-center items-center w-screen h-screen min-h-fit p-4 fixed z-50">
      <form
        action="submit"
        className="flex flex-col w-full max-w-[480px] h-fit p-6 rounded-md bg-dark-grey"
      >
        <div className="mb-6 gap-4 flex justify-between items-center">
          <h3 className="text-heading-lg">
            Research pricing points of various competitors and trial different
            business models
          </h3>
          <button type="button">
            <Image
              priority
              className="min-h-[20px] min-w-[4.62px]"
              src={IconVerticalEllipsis}
              alt="icon-vertical-ellipsis"
            />
          </button>
        </div>
        <p className="text-body-lg mb-6 text-medium-grey">
          We know what we're planning to build for version one. Now we need to
          finalise the first pricing model we'll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>

        {/* SUBTASKS */}
        <label htmlFor="subtasks" className="mb-2 text-body-md">
          Subtasks (2 of 3)
        </label>
        {/* SUBTASKS CONTAINER */}
        <label htmlFor="status" className="mb-2 text-body-md">
          Current Status
        </label>
        <button
          type="button"
          className="flex relative justify-between items-center h-[40px] bg-dark-grey border border-lines-dark mb-6 px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
          onClick={toggleStatusList}
        >
          Todo
          {!statusListIsActive ? (
            <Image src={IconChevronDown} alt="icon-chevron-down" />
          ) : (
            <Image src={IconChevronUp} alt="icon-chevron-up" />
          )}
          {/* STATUS LIST */}
          {statusListIsActive && <StatusList />}
        </button>
      </form>
    </div>
  );
}
