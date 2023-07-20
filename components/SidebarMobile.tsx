import IconBoard from "../assets/icon-board.svg";
import IconBoardWhite from "../assets/icon-board-white.svg";
import IconBoardPurple from "../assets/icon-board-purple.svg";
import Image from "next/image";
import { supabase } from "@/utils/client";

interface Board {
  id: string;
  board: string;
}

export default function BoardsSelection(props: {
  activeBoard: string;
  activeBoardId: string;
  boardList: Board[];
  setBoardList: React.Dispatch<React.SetStateAction<any>>;
  setSidebarIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveBoard: React.Dispatch<React.SetStateAction<string>>;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const mappedBoardList = props.boardList.map((board) =>
    props.activeBoardId === board.id ? (
      // SELECTED BOARD
      <button
        key={board.id}
        className="text-heading-md flex items-center gap-4 w-[100%] bg-main-purple px-6 py-4 rounded-r-full"
        onClick={() => props.setSidebarIsActive(false)}
      >
        <Image priority src={IconBoardWhite} alt="icon-board" />
        {board.board}
      </button>
    ) : (
      // NON-SELECTED BOARD
      <button
        key={board.id}
        className="text-heading-md text-medium-grey flex items-center gap-4 w-[100%] px-6 py-4 rounded-r-full"
        onClick={() => {
          props.setActiveBoard(board.board);
          props.setActiveBoardId(board.id);
          props.setSidebarIsActive(false);
        }}
      >
        <Image priority src={IconBoard} alt="icon-board" />
        {board.board}
      </button>
    )
  );
  const addNewBoard = async () => {
    const { data, error } = await supabase
      .from("boards")
      .insert([{ board: "New Board", user_email: "nikosetiawanp@gmail.com" }])
      .select();
    props.setBoardList((current) => [...current, data[0]]);
  };

  return (
    <div
      onClick={() => props.setSidebarIsActive(false)}
      className="w-screen h-screen bg-black-overlay fixed flex justify-center z-50 top-0 left-0 p-24 md:hidden"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="pr-6 pb-3 bg-dark-grey absolute rounded-lg min-w-[265px] flex flex-col"
      >
        <span className="text-medium-grey text-heading-sm mb-4 mt-4 ml-6 ">
          ALL BOARDS ({props.boardList.length})
        </span>
        {/* ACTIVE */}
        {mappedBoardList}
        {/* CREATE NEW BOARD */}
        <button
          onClick={() => {
            addNewBoard();
          }}
          className="text-heading-md flex items-center gap-4 w-[100%] px-6 py-4 rounded-r-full text-main-purple"
        >
          <Image priority src={IconBoardPurple} alt="icon-board" />+ Create New
          Board
        </button>
      </div>
    </div>
  );
}
