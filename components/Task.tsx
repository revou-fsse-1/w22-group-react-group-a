import TaskDetail from "@/components/TaskDetail";
import { supabase } from "@/utils/client";
import { useState, useEffect } from "react";

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
  subtask: string;
  is_completed: boolean;
}

export default function Task(props: {
  taskId: string;
  description: string;
  columns: Column[];
  column: string;
  columnId: string;
  rerenderColumn: string[];
  setRerenderColumn: React.Dispatch<React.SetStateAction<any>>;
  setRerenderTaskList: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [taskDetail, setTaskDetail] = useState<TaskDetail>({
    task: "Loading",
    description: "Description",
  });
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [taskDetailIsActive, setTaskDetailIsActive] = useState(false);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [rerenderTask, setRerenderTask] = useState([]);

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
    fetchSubtasks();
  }, [rerenderTask]);

  return (
    <>
      <div
        onClick={() => setTaskDetailIsActive(true)}
        className="bg-dark-grey rounded-lg px-4 py-6 flex flex-col hover:cursor-pointer hover:bg-lines-dark mb-4"
      >
        <h2 className="text-heading-md mb-2 text-left">{taskDetail.task}</h2>
        <p className="text-body-md text-medium-grey">
          ({completedTaskCount}
          of {subtasks.length}) &nbsp; subtasks
        </p>
      </div>

      {taskDetailIsActive && (
        <TaskDetail
          key={props.taskId}
          taskId={props.taskId}
          columns={props.columns}
          column={props.column}
          columnId={props.columnId}
          setTaskDetailIsActive={setTaskDetailIsActive}
          completedTaskCount={completedTaskCount}
          setCompletedTaskCount={setCompletedTaskCount}
          setRerenderTask={setRerenderTask}
          rerenderColumn={props.rerenderColumn}
          setRerenderColumn={props.setRerenderColumn}
          setRerenderTaskList={props.setRerenderTaskList}
        />
      )}
    </>
  );
}
