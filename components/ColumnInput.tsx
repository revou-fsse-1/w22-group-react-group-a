import Image from "next/image";
import IconCross from "../assets/icon-cross.svg";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/utils/client";

export default function ColumnInput(props: {
  column: string;
  id: string;
  updateColumn: boolean;
  setColumns: React.Dispatch<React.SetStateAction<any>>;
  setRerenderBoard: React.Dispatch<React.SetStateAction<any>>;
  setRerenderColumn: React.Dispatch<React.SetStateAction<any>>;
}) {
  const handleColumnInputChange = (id: string, key: string, value: string) => {
    props.setColumns((prevArray: [{ id: string; value: string }]) =>
      prevArray.map((object) =>
        object.id === id ? { ...object, [key]: value } : object
      )
    );
  };

  const deleteColumn = async () => {
    const { error } = await supabase
      .from("columns")
      .delete()
      .eq("id", props.id);
    if (error) console.log(error);

    props.setColumns(
      (
        current: [
          {
            id: string;
            column: string;
            color: string;
            board_id: string;
          }
        ]
      ) => current.filter((column) => column.id !== props.id)
    );

    // props.setRerenderBoard((current: string[]) => [...current, ""]);
    // props.setRerenderColumn((current: string[]) => [...current, ""]);
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        name="column"
        id="column"
        value={props.column}
        onChange={(e) =>
          handleColumnInputChange(props.id, "column", e.target.value)
        }
        className="w-full h-[40px] bg-dark-grey border border-lines-dark px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
        placeholder="e.g. Take coffee break"
      />
      <button onClick={deleteColumn} type="button" className="h-[40px]">
        <Image src={IconCross} alt="icon-cross" />
      </button>
    </div>
  );
}
