import Image from "next/image";
import IconCross from "../assets/icon-cross.svg";
import { useCallback, useEffect, useState } from "react";

export default function SubtaskInput(props: {
  subtasks: [
    {
      id: number;
      subtask: string;
    }
  ];
  setSubtasks: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [subtaskInput, setSubtaskInput] = useState(
    props.subtasks[props.id].subtask
  );
  const handleSubtaskInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setSubtaskInput(event.target.value);
    },
    []
  );

  const deleteSubtask = async () => {
    alert("not yet implemented");
  };
  const createSubtask = () => {
    alert(`created ${subtaskInput}`);
  };

  return (
    <div key={props.id} className="flex gap-4">
      <input
        type="text"
        name="subtask"
        id="subtask"
        value={subtaskInput}
        onChange={handleSubtaskInputChange}
        className="w-full h-[40px] bg-dark-grey border border-lines-dark px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
        placeholder="e.g. Take coffee break"
      />
      <button onClick={deleteSubtask} type="button" className="h-[40px]">
        <Image src={IconCross} alt="icon-cross" />
      </button>
    </div>
  );
}
