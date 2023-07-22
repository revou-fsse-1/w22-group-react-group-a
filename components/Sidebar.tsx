import LogoLight from "../assets/logo-light.svg";
import Image from "next/image";
import IconBoard from "../assets/icon-board.svg";
import IconBoardWhite from "../assets/icon-board-white.svg";
import IconBoardPurple from "../assets/icon-board-purple.svg";
import IconHideSidebar from "../assets/icon-hide-sidebar.svg";
import EditBoardForm from "./EditBoardForm";
import { supabase } from "@/utils/client";

interface Board {
  id: string;
  board: string;
}
export default function Sidebar(props: {
  activeBoard: string;
  activeBoardId: string;
  boardList: Board[];
  setBoardList: React.Dispatch<React.SetStateAction<any>>;
  setSidebarIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveBoard: React.Dispatch<React.SetStateAction<string>>;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
  setRerenderBoard: React.Dispatch<React.SetStateAction<any>>;
  userId: string;
}) {
  const addNewBoard = async () => {
    const { data, error } = await supabase
      .from("boards")
      .insert([{ board: "New Board", user_id: props.userId }])
      .select();
    props.setRerenderBoard((current: string[]) => [...current, ""]);
  };

  const mappedBoardList = props.boardList.map((board) =>
    props.activeBoardId === board.id ? (
      // SELECTED BOARD
      <button
        key={board.id}
        className="text-heading-md flex items-center gap-4 w-[100%] bg-main-purple px-6 py-4 rounded-r-full"
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
        }}
      >
        <Image priority src={IconBoard} alt="icon-board" />
        {board.board}
      </button>
    )
  );

  return (
    <div className="hidden md:flex flex-col pr-6 sticky left-0 bg-dark-grey h-screen min-w-[260px] border-r border-r-lines-dark">
      <div className="w-full h-[80px] p-6 flex items-center ">
        <Image priority src={LogoLight} alt="logo-dark" />
      </div>
      <span className="text-medium-grey text-heading-sm mb-4 mt-4 ml-6 ">
        ALL BOARDS ({props.boardList.length})
      </span>

      {/* BOARD LIST CONTAINER */}
      <div>{mappedBoardList}</div>

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

      <button
        type="button"
        onClick={() => props.setSidebarIsActive(false)}
        // onClick={props.setBoardsSelectionIsActive(false)}
        className="text-medium-grey text-heading-md flex items-center gap-4  mb-8 mt-auto px-6 py-4 rounded-r-full hover:bg-white-custom"
      >
        <Image priority src={IconHideSidebar} alt="icon-hide-sidebar" />
        Hide Sidebar
      </button>
    </div>
  );
}
