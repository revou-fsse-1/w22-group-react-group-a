import Image from "next/image";
import { useCallback, useState } from "react";
import ColumnInput from "./ColumnInput";

export default function EditBoardForm(props: {
  activeBoard: string;
  activeBoardId: string;
  columns: {
    board_id: string;
    color: string;
    column: string;
    id: string;
  };
}) {
  const [boardNameInput, setBoardNameInput] = useState(props.activeBoard);
  const handleBoardNameInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setBoardNameInput(event.target.value);
    },
    []
  );
  const [updateColumn, setUpdateColumn] = useState(false);

  const handleFormInput = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setUpdateColumn((current) => !current);
    alert("form submitted");
  };

  const mappedColumnInput = props.columns.map((column) => (
    <ColumnInput
      key={column.id}
      id={column.id}
      column={column.column}
      updateColumn={updateColumn}
    />
  ));

  return (
    <div className="bg-black-overlay flex justify-center items-center w-screen h-screen min-h-fit p-4 fixed z-50">
      <form
        action="submit"
        onSubmit={handleFormInput}
        className="flex flex-col w-full max-w-[480px] h-fit p-8 rounded-md bg-dark-grey"
      >
        <h3 className="text-heading-lg mb-6">Edit Board</h3>
        {/* BOARD NAME */}
        <label htmlFor="board-name" className="mb-2 text-body-md">
          Board Name
        </label>
        <input
          type="text"
          name="board-name"
          id="board-name"
          value={boardNameInput}
          onChange={handleBoardNameInputChange}
          className="h-[40px] bg-dark-grey border border-lines-dark mb-6 px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
          placeholder="e.g. Web Design"
        />

        {/* SUBTASKS */}
        <label htmlFor="subtasks" className="mb-2 text-body-md">
          Board Columns
        </label>
        {/* COLUMNS CONTAINER */}
        <div className="flex flex-col gap-3 mb-3">{mappedColumnInput}</div>
        {/* ADD NEW SUBTASK BUTTON */}
        <button className="text-body-md text-main-purple bg-white-custom h-[40px] w-full rounded-full mb-6">
          + Add New Column
        </button>

        <button className="text-body-md bg-main-purple h-[40px] w-full rounded-full">
          Update Board
        </button>
      </form>
    </div>
  );
}
