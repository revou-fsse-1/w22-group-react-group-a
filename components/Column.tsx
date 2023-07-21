import { supabase } from "@/utils/client";
import { useCallback, useEffect, useState } from "react";
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

interface Column {
  id: string;
  column: string;
  color: string;
}

export default function Column(props: {
  columnId: string;
  columnData: { id: string; column: string; color: string };
  columns: Column[];
  rerenderColumn: string[];
  setRerenderColumn: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [column, setColumn] = useState<Column>({
    id: "",
    column: "Loading",
    color: "Loading",
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [rerenderTaskList, setRerenderTaskList] = useState([]);

  const fetchColumn = async () => {
    const { data, error } = await supabase
      .from("columns")
      .select("*")
      .eq("id", props.columnId);
    if (error) return error;
    setColumn(data[0]);
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("id, task, description, subtasks (*)")
      .eq("column_id", props.columnId);
    if (error) return error;
    setTasks(data);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchColumn();
      fetchTasks();
    }, 250);
  }, [props.rerenderColumn]);

  const mappedTasks = tasks.map((task) => (
    <Task
      key={task.id}
      taskId={task.id}
      description={task.description}
      column={column.column}
      statusId={column.id}
      columns={props.columns}
      rerenderColumn={props.rerenderColumn}
      setRerenderColumn={props.setRerenderColumn}
      setRerenderTaskList={setRerenderTaskList}
    />
  ));

  return (
    <div className="flex flex-col w-[280px] min-w-[280px]">
      <span className="flex gap-4 text-heading-sm text-medium-grey mb-2">
        <Image
          src={
            props.columnData.color === "red"
              ? CircleRed
              : props.columnData.color === "orange"
              ? CircleOrange
              : props.columnData.color === "yellow"
              ? CircleYellow
              : props.columnData.color === "green"
              ? CircleGreen
              : props.columnData.color === "blue"
              ? CircleBlue
              : CirclePurple
          }
          alt="circle-blue"
        />
        {props.columnData.column.toUpperCase()} ({tasks.length})
      </span>
      {mappedTasks}
    </div>
  );
}
