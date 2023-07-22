/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useState, useEffect } from "react";

import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconChevronUp from "../assets/icon-chevron-up.svg";
import IconVerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";

import StatusList from "./StatusList";
import EditDeleteTask from "./EditDeleteTask";
import DeleteTaskConfirm from "./DeleteTaskConfirm";
import EditTaskForm from "./EditTaskForm";
import Subtask from "./Subtask";
import { supabase } from "@/utils/client";

interface Column {
  id: string;
  column: string;
  color: string;
}

interface TaskDetail {
  task: string;
  description: string;
}

interface Subtask {
  id: string;
  is_completed: boolean;
  subtask: string;
  task_id: string;
}

export default function TaskDetail(props: {
  taskId: string;
  columns: Column[];
  column: string;
  columnId: string;
  setTaskDetailIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  completedTaskCount: number;
  setCompletedTaskCount: React.Dispatch<React.SetStateAction<any>>;
  setRerenderTask: React.Dispatch<React.SetStateAction<any>>;
  rerenderColumn: string[];
  setRerenderColumn: React.Dispatch<React.SetStateAction<any>>;
  setRerenderTaskList: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [status, setStatus] = useState(props.column);
  const [statusId, setStatusId] = useState(props.columnId);
  const [statusListIsActive, setStatusListIsActive] = useState(false);
  const [editTaskFormIsActive, setEditTaskFormIsActive] = useState(false);
  const [editDeleteTaskIsActive, setEditDeleteTaskIsActive] = useState(false);
  const [deleteTaskConfirmIsActive, setDeleteTaskConfirmIsActive] =
    useState(false);
  const toggleStatusList = () => {
    setStatusListIsActive((current) => !current);
  };
  const [taskDetail, setTaskDetail] = useState<TaskDetail>({
    task: "Loading",
    description: "Loading",
  });
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [rerenderTaskDetail, setRerenderTaskDetail] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const fetchTaskDetail = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", props.taskId);
    if (error) return error;
    setTaskDetail(data[0]);
  };

  const fetchSubtasks = async () => {
    const { data, error } = await supabase
      .from("subtasks")
      .select("*")
      .eq("task_id", props.taskId);
    if (error) return error;
    setSubtasks(data);
    setCompletedTaskCount(
      data.filter((subtask) => subtask.is_completed === true).length
    );
  };

  useEffect(() => {
    fetchTaskDetail();
    setTimeout(() => fetchSubtasks(), 200);
  }, [rerenderTaskDetail]);

  const mappedSubtasks = subtasks.map((subtask) => (
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
      <div
        onClick={() => {
          {
            props.setTaskDetailIsActive(false);
            props.setRerenderTask((current: string[]) => [...current, ""]);
            props.setRerenderColumn((current: string[]) => [...current, ""]);
            props.setRerenderTaskList((current: string[]) => [...current, ""]);
          }
        }}
        className="bg-black-overlay flex justify-center items-center w-screen h-screen p-4 fixed top-0 left-0 z-50"
      >
        <form
          onClick={(event) => {
            event.stopPropagation();
            setEditDeleteTaskIsActive(false);
          }}
          action="submit"
          className="flex flex-col w-full max-w-[480px] h-fit p-6 rounded-md bg-dark-grey"
        >
          <div className="mb-6 gap-8 flex justify-between items-center">
            <h3 className="text-heading-lg">{taskDetail.task}</h3>
            <button
              onClick={(event) => {
                event?.stopPropagation();
                setEditDeleteTaskIsActive(true);
              }}
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
                  setEditDeleteTaskIsActive={setEditDeleteTaskIsActive}
                />
              )}
            </button>
          </div>
          <p className="text-body-lg mb-6 text-medium-grey">
            {taskDetail.description}
          </p>

          {/* SUBTASKS */}
          <label htmlFor="subtasks" className="mb-4 text-body-md">
            Subtasks ({completedTaskCount} &nbsp; of &nbsp; {subtasks.length})
          </label>

          {/* SUBTASKS CONTAINER */}
          <ul className="flex flex-col gap-2 mb-6">{mappedSubtasks}</ul>

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
            {status}
            {!statusListIsActive ? (
              <Image src={IconChevronDown} alt="icon-chevron-down" />
            ) : (
              <Image src={IconChevronUp} alt="icon-chevron-up" />
            )}
            {/* STATUS LIST */}
            {statusListIsActive && (
              <StatusList
                id={props.taskId}
                columns={props.columns}
                status={status}
                setStatus={setStatus}
                statusId={statusId}
                setStatusId={setStatusId}
              />
            )}
          </button>
        </form>
      </div>

      {deleteTaskConfirmIsActive && (
        <DeleteTaskConfirm
          id={props.taskId}
          task={taskDetail.task}
          setTaskDetailIsActive={props.setTaskDetailIsActive}
          setDeleteTaskConfirmIsActive={setDeleteTaskConfirmIsActive}
          rerenderColumn={props.rerenderColumn}
          setRerenderColumn={props.setRerenderColumn}
        />
      )}
      {editTaskFormIsActive && (
        <EditTaskForm
          key={props.taskId}
          taskId={props.taskId}
          task={taskDetail.task}
          description={taskDetail.description}
          subtasks={subtasks}
          columns={props.columns}
          status={props.column}
          setEditTaskFormIsActive={setEditTaskFormIsActive}
          setRerenderTaskDetail={setRerenderTaskDetail}
        />
      )}
    </>
  );
}
