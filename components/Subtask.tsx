import Image from "next/image";
import IconCheck from "../assets/icon-check.svg";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/client";

export default function Subtask(props: {
  id: string;
  subtask: string;
  is_completed: boolean;
  setCompletedTaskCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    setIsCompleted(props.is_completed);
  }, [props.is_completed]);

  const check = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    props.setCompletedTaskCount((current) => current + 1);
    setIsCompleted(true);
    const { data, error } = await supabase
      .from("subtasks")
      .update({ is_completed: true })
      .eq("id", props.id)
      .select();
  };
  const uncheck = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    props.setCompletedTaskCount((current) => current - 1);
    setIsCompleted(false);

    const { data, error } = await supabase
      .from("subtasks")
      .update({ is_completed: false })
      .eq("id", props.id)
      .select();
  };

  return (
    <>
      {isCompleted ? (
        <li
          onClick={uncheck}
          className="bg-very-dark-grey px-4 py-6 gap-6 rounded-md flex items-center hover:cursor-pointer"
        >
          <button className="bg-main-purple w-[16px] min-w-[16px] h-[16px] flex justify-center items-center rounded-sm">
            <Image src={IconCheck} alt="icon-check" />
          </button>
          <p className="text-body-md line-through text-white-custom/50">
            {props.subtask}
          </p>
        </li>
      ) : (
        <li
          onClick={check}
          className="bg-very-dark-grey px-4 py-6 gap-6 rounded-md flex items-center hover:cursor-pointer"
        >
          <button className="bg-white-custom w-[16px] min-w-[16px] h-[16px] flex justify-center items-center rounded-sm"></button>
          <p className="text-body-md text-white-custom">{props.subtask}</p>
        </li>
      )}
    </>
  );
}
