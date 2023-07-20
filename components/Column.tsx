import { supabase } from "@/utils/client";
import { useEffect, useState } from "react";
import CircleRed from "../assets/circle-red.svg";
import CircleOrange from "../assets/circle-orange.svg";
import CircleYellow from "../assets/circle-yellow.svg";
import CircleGreen from "../assets/circle-green.svg";
import CircleBlue from "../assets/circle-blue.svg";
import CirclePurple from "../assets/circle-purple.svg";

import Image from "next/image";
import Task from "./Task";

interface Task {
  id: string;
  task: string;
  description: string;
  subtasks: object[] | any;
}

export default function Column(props: {
  data: {
    id: string;
    column: string;
    color: string;
  };
  columns: string[];
}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("id, task, description, subtasks (*)")
      .eq("column_id", props.data.id);
    if (error) return error;
    setTasks(data);
  }
  useEffect(() => {
    fetchTasks();
  }, [setTasks]);

  const mappedTasks = tasks.map((task) => (
    <Task
      key={task.id}
      id={task.id}
      task={task.task}
      subtasks={task.subtasks}
      description={task.description}
      setTaskDetailIsActive={props.setTaskDetailIsActive}
      status={props.data.column}
      columns={props.columns}
    />
  ));

  return (
    <div className="flex flex-col w-[280px] min-w-[280px]">
      <span className="flex gap-4 text-heading-sm text-medium-grey mb-2">
        <Image
          src={
            props.data.color === "red"
              ? CircleRed
              : props.data.color === "orange"
              ? CircleOrange
              : props.data.color === "yellow"
              ? CircleYellow
              : props.data.color === "green"
              ? CircleGreen
              : props.data.color === "blue"
              ? CircleBlue
              : CirclePurple
          }
          alt="circle-blue"
        />
        {props.data.column.toUpperCase()} ({tasks.length})
      </span>
      {mappedTasks}
    </div>
  );
}
