import Image from "next/image";
import IconCross from "../assets/icon-cross.svg";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/utils/client";

export default function ColumnInput(props: {
  column: string;
  id: string;
  updateColumn: boolean;
  setColumns: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [columnInput, setColumnInput] = useState(props.column);
  const handleColumnInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setColumnInput(event.target.value);
    },
    []
  );
  const deleteColumn = async () => {
    const { error } = await supabase
      .from("columns")
      .delete()
      .eq("id", props.id);

    props.setColumns((current) =>
      current.filter((column) => column.id !== props.id)
    );
  };

  const updateColumn = async () => {
    const { data, error } = await supabase
      .from("columns")
      .update({ column: columnInput })
      .eq("id", props.id)
      .select();
    if (error) console.log(error);

    console.log("column updated");
  };
  useEffect(() => {
    props.updateColumn && updateColumn();
    console.log();
  }, [props.updateColumn]);

  return (
    <div className="flex gap-4">
      <input
        type="text"
        name="column"
        id="column"
        value={columnInput}
        onChange={handleColumnInputChange}
        className="w-full h-[40px] bg-dark-grey border border-lines-dark px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
        placeholder="e.g. Take coffee break"
      />
      <button onClick={deleteColumn} type="button" className="h-[40px]">
        <Image src={IconCross} alt="icon-cross" />
      </button>
    </div>
  );
}
