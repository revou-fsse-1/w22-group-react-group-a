import TaskDetail from "@/components/TaskDetail";
import { useState } from "react";

export default function Task(props: {
  setTaskDetailIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleTaskDetail = () => {
    props.setTaskDetailIsActive((current) => !current);
  };
  return (
    <>
      <button
        onClick={toggleTaskDetail}
        className="bg-dark-grey rounded-lg px-4 py-6 flex flex-col hover:cursor-pointer"
      >
        <h2 className="text-heading-md mb-2">Build UI for onboarding flow</h2>
        <p className="text-body-md text-medium-grey">0 of 3 subtasks</p>
      </button>
    </>
  );
}
