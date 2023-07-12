/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useState } from "react";

import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconChevronUp from "../assets/icon-chevron-up.svg";
import IconVerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
import IconCheck from "../assets/icon-check.svg";

import StatusList from "./StatusList";
import EditDeleteTask from "./EditDeleteTask";
import DeleteTaskConfirm from "./DeleteTaskConfirm";
import EditTaskForm from "./EditTaskForm";

export default function TaskDetail() {
  // STATUS LIST
  const [statusListIsActive, setStatusListIsActive] = useState(false);
  const toggleStatusList = () => {
    setStatusListIsActive((current) => !current);
  };
  //   EDIT TASK FORM
  const [editTaskFormIsActive, setEditTaskFormIsActive] = useState(false);

  //   EDIT DELETE TASK
  const [editDeleteTaskIsActive, setEditDeleteTaskIsActive] = useState(false);
  const toggleEditDeleteTask = () => {
    setEditDeleteTaskIsActive((current) => !current);
  };

  //   DELETE TASK CONFIRM
  const [deleteTaskConfirmIsActive, setDeleteTaskConfirmIsActive] =
    useState(false);

  return (
    <>
      <div className="bg-black-overlay flex justify-center items-center w-screen h-screen p-4 fixed z-50">
        <form
          action="submit"
          className="flex flex-col w-full max-w-[480px] h-fit p-6 rounded-md bg-dark-grey"
        >
          <div className="mb-6 gap-8 flex justify-between items-center">
            <h3 className="text-heading-lg">
              Research pricing points of various competitors and trial different
              business models
            </h3>
            <button
              onClick={toggleEditDeleteTask}
              className="relative"
              type="button"
            >
              <Image
                priority
                className="min-h-[20px] min-w-[4.62px]"
                src={IconVerticalEllipsis}
                alt="icon-vertical-ellipsis"
              />
              {editDeleteTaskIsActive && (
                <EditDeleteTask
                  setEditTaskFormIsActive={setEditTaskFormIsActive}
                  setDeleteTaskConfirmIsActive={setDeleteTaskConfirmIsActive}
                />
              )}
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
          <div className="flex flex-col gap-2 mb-6">
            {/* DONE */}
            <div className="bg-very-dark-grey px-4 py-6 gap-6 rounded-md flex items-center">
              <button className="bg-main-purple w-[16px] min-w-[16px] h-[16px] flex justify-center items-center rounded-sm">
                <Image src={IconCheck} alt="icon-check" />
              </button>
              <p className="text-body-md line-through text-white-custom/50">
                Research competitor pricing and business models
              </p>
            </div>

            {/* NOT DONE */}
            <div className="bg-very-dark-grey px-4 py-6 gap-6 rounded-md flex items-center">
              <button className="bg-white-custom w-[16px] min-w-[16px] h-[16px] flex justify-center items-center rounded-sm"></button>
              <p className="text-body-md text-white-custom">
                Surveying and testing
              </p>
            </div>
          </div>

          <label htmlFor="status" className="mb-2 text-body-md">
            Current Status
          </label>
          <button
            type="button"
            className={`flex relative justify-between items-center h-[40px] bg-dark-grey border ${
              statusListIsActive ? "border-main-purple" : "border-lines-dark"
            } hover:border-main-purple  mb-6 px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none`}
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
        {/* <EditTaskForm /> */}
      </div>

      {deleteTaskConfirmIsActive && (
        <DeleteTaskConfirm
          setDeleteTaskConfirmIsActive={setDeleteTaskConfirmIsActive}
        />
      )}
      {editTaskFormIsActive && <EditTaskForm />}
    </>
  );
}
