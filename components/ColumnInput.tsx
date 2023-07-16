import Image from "next/image";
import IconCross from "../assets/icon-cross.svg";
import { useCallback, useEffect, useState } from "react";

export default function ColumnInput(props: {
  column: string;
  id: string;
  updateColumn: boolean;
}) {
  const [columnInput, setColumnInput] = useState(props.column);
  const handleColumnInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setColumnInput(event.target.value);
    },
    []
  );

  const updateColumn = () => {
    alert(`${props.column} updated`);
  };

  useEffect(() => {
    props.updateColumn && updateColumn();
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
      <button type="button" className="h-[40px]">
        <Image src={IconCross} alt="icon-cross" />
      </button>
    </div>
  );
}
