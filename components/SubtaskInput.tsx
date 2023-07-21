import Image from "next/image";
import IconCross from "../assets/icon-cross.svg";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/utils/client";

export default function SubtaskInput(props: {
  key: string;
  id: string;
  index: number;
  subtask: string;
  is_completed: boolean;
  updateSubtask: boolean;
  setSubtasks: React.Dispatch<React.SetStateAction<any>>;
}) {
  const handleSubtaskInputChange = (id: string, key: string, value: string) => {
    props.setSubtasks((prevArray: [{ id: string; value: string }]) =>
      prevArray.map((object) =>
        object.id === id ? { ...object, [key]: value } : object
      )
    );
  };

  const deleteSubtask = async () => {
    props.setSubtasks(
      (
        current: [
          {
            id: string;
            subtask: string;
            is_completed: boolean;
          }
        ]
      ) => current.filter((subtask) => subtask.id !== props.id)
    );
    const { error } = await supabase
      .from("subtasks")
      .delete()
      .eq("id", props.id);
    console.log(error);
  };

  return (
    <div key={props.id} className="flex gap-4">
      <input
        type="text"
        name="subtask"
        id="subtask"
        value={props.subtask}
        onChange={(e) =>
          handleSubtaskInputChange(props.id, "subtask", e.target.value)
        }
        className="w-full h-[40px] bg-dark-grey border border-lines-dark px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
        placeholder="e.g. Take coffee break"
      />
      <button onClick={deleteSubtask} type="button" className="h-[40px]">
        <Image src={IconCross} alt="icon-cross" />
      </button>
    </div>
  );
}
