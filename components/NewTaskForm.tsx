import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/utils/client";

import IconCross from "../assets/icon-cross.svg";
import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconChevronUp from "../assets/icon-chevron-up.svg";
import StatusListNew from "./StatusListNew";
import SubtaskInput from "./SubtaskInput";
import SubtaskInputNew from "./SubtaskInputNew";

export default function NewTaskForm(props: {
  newTaskFormIsActive: boolean;
  setNewTaskFormIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  columns: string[];
}) {
  // STATUS LIST
  const taskId = crypto.randomUUID();
  // const [taskId, setTaskId] = useState();
  const [statusListIsActive, setStatusListIsActive] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [status, setStatus] = useState(props.columns[0].column);
  const [statusId, setStatusId] = useState(props.columns[0].id);
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    console.log(subtasks);
  }, [subtasks]);

  const handleTitleInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setTitleInput(event.target.value);
    },
    []
  );
  const handleDescriptionInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setDescriptionInput(event.target.value);
    },
    []
  );

  const createAllSubtask = async () => {
    if (subtasks.length > 0) {
      const { data, error } = await supabase
        .from("subtasks")
        .insert(subtasks)
        .select();
      if (error) console.log(error);
      console.log(data);
    }
  };
  const createTask = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          id: taskId,
          task: titleInput,
          description: descriptionInput,
          column_id: statusId,
        },
      ])
      .select();
    if (error) console.log(error);
  };

  const toggleStatusList = () => {
    setStatusListIsActive((current) => !current);
  };
  const handleFormSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    createTask();
  };

  // const mappedSubtasks = subtasks.map((subtask, index) => (
  //   <SubtaskInputNew
  //     key={index}
  //     id={index}
  //     subtasks={subtasks}
  //     setSubtasks={setSubtasks}
  //   />
  // ));

  return (
    <div
      onClick={() => props.setNewTaskFormIsActive(false)}
      className="bg-black-overlay flex justify-center items-center w-screen h-screen min-h-fit p-4 fixed z-50 top-0 left-0 overflow-scroll"
    >
      <form
        onSubmit={handleFormSubmit}
        onClick={(event) => event.stopPropagation()}
        action="submit"
        className="flex flex-col w-full max-w-[480px] h-fit p-8 rounded-md bg-dark-grey"
      >
        <h3 className="text-heading-lg mb-6">Add New Task</h3>
        {/* TITLE */}
        <label htmlFor="title" className="mb-2 text-body-md">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleTitleInputChange}
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
          onChange={handleDescriptionInputChange}
          className="min-h-[115px] bg-dark-grey border border-lines-dark p-4 mb-6 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none resize-none"
          placeholder="e.g. It’s always good to take a break. This 
          15 minute break will  recharge the batteries 
          a little."
        ></textarea>

        {/* SUBTASKS */}
        {/* <label htmlFor="subtasks" className="mb-2 text-body-md">
          Subtasks
        </label>
        <div className="flex flex-col gap-3 mb-3">{mappedSubtasks}</div>
        <button
          onClick={addNewSubtask}
          type="button"
          className="text-body-md text-main-purple bg-white-custom h-[40px] w-full rounded-full mb-6"
        >
          + Add New Subtask
        </button> */}

        <label htmlFor="status" className="mb-2 text-body-md">
          Status
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
            <StatusListNew
              columns={props.columns}
              status={status}
              setStatus={setStatus}
              setStatusId={setStatusId}
            />
          )}
        </button>
        <button className="text-body-md bg-main-purple h-[40px] w-full rounded-full">
          Create Task
        </button>
      </form>
    </div>
  );
}
