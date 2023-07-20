import TaskDetail from "@/components/TaskDetail";
import { useState } from "react";

export default function Task(props: {
  id: string;
  task: string;
  subtasks: [
    {
      id: string;
      is_completed: boolean;
      subtask: string;
    }
  ];
  description: string;
  columns: string[];
  status: string;
  rerenderTasks: boolean;
  setRerenderTasks: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [taskDetailIsActive, setTaskDetailIsActive] = useState(false);
  const [subtasks, setSubtasks] = useState([]);

  return (
    <>
      <div
        onClick={() => setTaskDetailIsActive(true)}
        className="bg-dark-grey rounded-lg px-4 py-6 flex flex-col hover:cursor-pointer hover:bg-lines-dark mb-4"
      >
        <h2 className="text-heading-md mb-2 text-left">{props.task}</h2>
        <p className="text-body-md text-medium-grey">
          (
          {
            props.subtasks.filter((subtask) => subtask.is_completed == true)
              .length
          }
          of {props.subtasks.length}) &nbsp; subtasks
        </p>
      </div>

      {taskDetailIsActive && (
        <TaskDetail
          key={props.id}
          id={props.id}
          task={props.task}
          subtasks={props.subtasks}
          description={props.description}
          columns={props.columns}
          status={props.status}
          setTaskDetailIsActive={setTaskDetailIsActive}
          rerenderTasks={props.rerenderTasks}
          setRerenderTasks={props.setRerenderTasks}
        />
      )}
    </>
  );
}
