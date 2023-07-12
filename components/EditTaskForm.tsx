import Image from "next/image";
import { useState } from "react";

import IconCross from "../assets/icon-cross.svg";
import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconChevronUp from "../assets/icon-chevron-up.svg";

import StatusList from "./StatusList";

export default function EditTaskForm() {
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
        <h3 className="text-heading-lg mb-6">Edit Task</h3>
        {/* TITLE */}
        <label htmlFor="title" className="mb-2 text-body-md">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="h-[40px] bg-dark-grey border border-lines-dark mb-6 px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
          placeholder="e.g. Take coffee break"
        />

        {/* DESCRIPTION */}
        <label htmlFor="description" className="mb-2 text-body-md">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={5}
          className="min-h-[115px] bg-dark-grey border border-lines-dark p-4 mb-6 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none resize-none"
          placeholder="e.g. It’s always good to take a break. This 
          15 minute break will  recharge the batteries 
          a little."
        ></textarea>

        {/* SUBTASKS */}
        <label htmlFor="subtasks" className="mb-2 text-body-md">
          Subtasks
        </label>
        {/* SUBTASKS CONTAINER */}
        <div className="flex flex-col gap-3 mb-3">
          <div className="flex gap-4">
            <input
              type="text"
              name="subtasks"
              id="subtasks"
              className="w-full h-[40px] bg-dark-grey border border-lines-dark px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
              placeholder="e.g. Take coffee break"
            />
            <button type="button" className="h-[40px]">
              <Image src={IconCross} alt="icon-cross" />
            </button>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              name="subtasks"
              id="subtasks"
              className="w-full h-[40px] bg-dark-grey border border-lines-dark px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
              placeholder="e.g. Take coffee break"
            />
            <button type="button" className="h-[40px]">
              <Image src={IconCross} alt="icon-cross" />
            </button>
          </div>
        </div>
        {/* ADD NEW SUBTASK BUTTON */}
        <button className="text-body-md text-main-purple bg-white-custom h-[40px] w-full rounded-full mb-6">
          + Add New Subtask
        </button>

        <label htmlFor="status" className="mb-2 text-body-md">
          Status
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
        <button className="text-body-md bg-main-purple h-[40px] w-full rounded-full">
          Create Task
        </button>
      </form>
    </div>
  );
}
