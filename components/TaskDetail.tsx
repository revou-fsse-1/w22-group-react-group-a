/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useState } from "react";

import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconChevronUp from "../assets/icon-chevron-up.svg";
import IconVerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";

import StatusList from "./StatusList";
import EditDeleteTask from "./EditDeleteTask";
import DeleteTaskConfirm from "./DeleteTaskConfirm";
import EditTaskForm from "./EditTaskForm";
import Subtask from "./Subtask";

export default function TaskDetail(props: {
  id: string;
  task: string;
  description: string;
  subtasks: [
    {
      id: string;
      is_completed: boolean;
      subtask: string;
    }
  ];
}) {
  const [completedTaskCount, setCompletedTaskCount] = useState(
    props.subtasks.filter((subtask) => subtask.is_completed == true).length
  );
  const [statusListIsActive, setStatusListIsActive] = useState(false);
  const [editTaskFormIsActive, setEditTaskFormIsActive] = useState(false);
  const [editDeleteTaskIsActive, setEditDeleteTaskIsActive] = useState(false);
  const [deleteTaskConfirmIsActive, setDeleteTaskConfirmIsActive] =
    useState(false);
  const toggleStatusList = () => {
    setStatusListIsActive((current) => !current);
  };
  const toggleEditDeleteTask = () => {
    setEditDeleteTaskIsActive((current) => !current);
  };

  const mappedSubtasks = props.subtasks.map((subtask) => (
    <Subtask
      key={subtask.id}
      id={subtask.id}
      subtask={subtask.subtask}
      is_completed={subtask.is_completed}
      setCompletedTaskCount={setCompletedTaskCount}
    />
  ));

  return (
    <>
      <div className="bg-black-overlay flex justify-center items-center w-screen h-screen p-4 fixed top-0 left-0 z-50">
        <form
          action="submit"
          className="flex flex-col w-full max-w-[480px] h-fit p-6 rounded-md bg-dark-grey"
        >
          <div className="mb-6 gap-8 flex justify-between items-center">
            <h3 className="text-heading-lg">{props.task}</h3>
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
            {props.description}
          </p>

          {/* SUBTASKS */}
          <label htmlFor="subtasks" className="mb-4 text-body-md">
            Subtasks ({completedTaskCount} &nbsp; of &nbsp;{" "}
            {props.subtasks.length})
          </label>

          {/* SUBTASKS CONTAINER */}
          <div className="flex flex-col gap-2 mb-6">{mappedSubtasks}</div>

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
      </div>

      {deleteTaskConfirmIsActive && (
        <DeleteTaskConfirm
          setDeleteTaskConfirmIsActive={setDeleteTaskConfirmIsActive}
        />
      )}
      {editTaskFormIsActive && (
        <EditTaskForm
          key={props.id}
          id={props.id}
          task={props.task}
          description={props.description}
          subtasks={props.subtasks}
        />
      )}
    </>
  );
}
