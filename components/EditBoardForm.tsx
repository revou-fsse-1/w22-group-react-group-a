import { useCallback, useState } from "react";
import ColumnInput from "./ColumnInput";
import { supabase } from "@/utils/client";

export default function EditBoardForm(props: {
  activeBoard: string;
  activeBoardId: string;
  columns: [
    {
      board_id: string;
      color: string;
      column: string;
      id: string;
      map: any;
    }
  ];
  setBoardList: React.Dispatch<React.SetStateAction<boolean>>;
  setEditBoardFormIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setColumns: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveBoard: React.Dispatch<React.SetStateAction<string>>;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [updateColumn, setUpdateColumn] = useState(false);
  const [boardNameInput, setBoardNameInput] = useState(props.activeBoard);
  const handleBoardNameInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setBoardNameInput(event.target.value);
    },
    []
  );

  async function fetchBoards() {
    const { data, error } = await supabase
      .from("users")
      .select(`boards (*)`)
      .eq("email", "nikosetiawanp@gmail.com");
    if (error) return error;
    props.setBoardList(data[0].boards);
    props.setActiveBoard(data[0].boards[0].board);
    props.setActiveBoardId(data[0].boards[0].id);
  }

  const updateBoard = async () => {
    const { data, error } = await supabase
      .from("boards")
      .update({ board: boardNameInput })
      .eq("id", props.activeBoardId)
      .select();
    if (error) console.log(error);
  };

  const handleFormSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    updateBoard();
    fetchBoards();
    setUpdateColumn((current) => !current);
    console.log(updateColumn);
    props.setEditBoardFormIsActive(false);
  };

  const mappedColumnInput = props.columns.map((column) => (
    <ColumnInput
      key={column.id}
      id={column.id}
      column={column.column}
      updateColumn={updateColumn}
      setColumns={props.setColumns}
    />
  ));

  const addNewColumn = async () => {
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    const { data, error } = await supabase
      .from("columns")
      .insert([
        {
          column: "New Column",
          board_id: props.activeBoardId,
          color: randomColor,
        },
      ])
      .select();
    props.setColumns((current) => [...current, data[0]]);
  };

  return (
    <div
      onClick={() => props.setEditBoardFormIsActive(false)}
      className="bg-black-overlay flex justify-center items-center w-screen h-screen min-h-fit p-4 fixed z-50"
    >
      <form
        action="submit"
        onSubmit={handleFormSubmit}
        className="flex flex-col w-full max-w-[480px] h-fit p-8 rounded-md bg-dark-grey"
        onClick={(event) => event.stopPropagation()}
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
        <button
          type="button"
          onClick={addNewColumn}
          className="text-body-md text-main-purple bg-white-custom h-[40px] w-full rounded-full mb-6"
        >
          + Add New Column
        </button>

        <button
          type="button"
          className="text-body-md bg-main-purple h-[40px] w-full rounded-full"
          onClick={handleFormSubmit}
        >
          Update Board
        </button>
      </form>
    </div>
  );
}
