import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconChevronUp from "../assets/icon-chevron-up.svg";
import SubtaskInput from "./SubtaskInput";

import StatusList from "./StatusList";
import { supabase } from "@/utils/client";

interface Subtask {
  id: string;
  is_completed: boolean;
  subtask: string;
  task_id: string;
}

export default function EditTaskForm(props: {
  id: string;
  task: string;
  description: string;
  subtasks: [
    {
      id: string;
      subtask: string;
      is_completed: boolean;
    }
  ];
  columns: string[];
  status: string;
}) {
  const [status, setStatus] = useState(props.status);
  const [titleInput, setTitleInput] = useState(props.task);
  const [descriptionInput, setDescriptionInput] = useState(props.description);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [statusListIsActive, setStatusListIsActive] = useState(false);
  const [updateSubtask, setUpdateSubtask] = useState(false);
  const toggleStatusList = () => {
    setStatusListIsActive((current) => !current);
  };

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

  const fetchSubtasks = async () => {
    const { data, error } = await supabase
      .from("subtasks")
      .select(`( * )`)
      .eq("task_id", props.id);
    if (error) return error;
    setSubtasks(data);
  };
  useEffect(() => {
    fetchSubtasks();
  }, []);

  const mappedSubtasks = subtasks.map((subtask) => (
    <SubtaskInput
      key={subtask.id}
      id={subtask.id}
      subtask={subtask.subtask}
      is_completed={subtask.is_completed}
      updateSubtask={updateSubtask}
    />
  ));
  const handleFormInput = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setUpdateSubtask((current) => !current);
    alert("form submitted");
  };

  return (
    <div className="bg-black-overlay flex justify-center items-center w-screen h-screen min-h-fit p-4 fixed z-50 top-0 left-0">
      <form
        onSubmit={handleFormInput}
        action="submit"
        className="flex flex-col w-full max-w-[480px] h-fit p-8 rounded-md bg-dark-grey"
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
          onChange={handleTitleInputChange}
          value={titleInput}
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
          value={descriptionInput || ""}
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
        <div className="flex flex-col gap-3 mb-3">{mappedSubtasks}</div>
        {/* ADD NEW SUBTASK BUTTON */}
        <button className="text-body-md text-main-purple bg-white-custom h-[40px] w-full rounded-full mb-6">
          + Add New Subtask
        </button>

        <label htmlFor="status" className="mb-2 text-body-md">
          Status
        </label>
        <div
          className={`flex relative justify-between items-center h-[40px] bg-dark-grey border ${
            statusListIsActive ? "border-main-purple" : "border-lines-dark"
          } hover:border-main-purple mb-6 px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none`}
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
              columns={props.columns}
              status={status}
              setStatus={setStatus}
            />
          )}
        </div>
        <button className="text-body-md bg-main-purple h-[40px] w-full rounded-full">
          Update Task
        </button>
      </form>
    </div>
  );
}
