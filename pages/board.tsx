import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/client";

// ICONS
import LogoMobile from "../assets/logo-mobile.svg";
import LogoLight from "../assets/logo-light.svg";
import IconChevronDown from "../assets/icon-chevron-down.svg";
import IconChevronUp from "../assets/icon-chevron-up.svg";
import IconPlus from "../assets/icon-plus.svg";
import IconShowSidebar from "../assets/icon-show-sidebar.svg";
import IconVerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";

// COMPONENTS
import Column from "@/components/Column";
import Sidebar from "@/components/Sidebar";
import EmptyBoardMessage from "@/components/EmptyBoardMessage";
import SidebarMobile from "@/components/SidebarMobile";
import EditDeleteBoard from "@/components/EditDeleteBoard";
import NewTaskForm from "@/components/NewTaskForm";
import DeleteBoardConfirm from "@/components/DeleteBoardConfirm";
import NewBoardForm from "@/components/NewBoardForm";
import EditBoardForm from "@/components/EditBoardForm";

interface Column {
  board_id: string;
  color: string;
  column: string;
  id: string;
}

export default function Board() {
  const [sidebarIsActive, setSidebarIsActive] = useState(false);
  const [editDeleteBoardIsActive, setEditDeleteBoardIsActive] = useState(false);
  const [newTaskFormIsActive, setNewTaskFormIsActive] = useState(false);
  const [editBoardFormIsActive, setEditBoardFormIsActive] = useState(false);
  const [newBoardFormIsActive, setNewBoardFormIsActive] = useState(false);
  const [editTaskFormIsActive, setEditTaskFormIsActive] = useState(false);
  const [deleteBoardConfirmIsActive, setDeleteBoardConfirmIsActive] =
    useState(false);
  const toggleEditDeleteBoard = () => {
    setEditDeleteBoardIsActive((current) => !current);
  };
  const toggleEditTaskForm = () => {
    setEditTaskFormIsActive((current) => !current);
  };

  // DATA
  const [boardList, setBoardList] = useState([{ id: "", board: "" }]);
  const [activeBoard, setActiveBoard] = useState("");
  const [activeBoardId, setActiveBoardId] = useState("");
  const [columns, setColumns] = useState<Column[]>([]);

  // FETCH
  async function fetchBoards() {
    const { data, error } = await supabase
      .from("users")
      .select(`boards (*)`)
      .eq("email", "nikosetiawanp@gmail.com");
    if (error) return error;
    setBoardList(data[0].boards);
    setActiveBoard(data[0].boards[0].board);
    setActiveBoardId(data[0].boards[0].id);
  }
  useEffect(() => {
    fetchBoards();
  }, []);

  async function fetchAllColumns() {
    const { data, error } = await supabase
      .from("columns")
      .select("*")
      .eq("board_id", activeBoardId);
    if (error) return error;
    setColumns(data);
  }
  useEffect(() => {
    fetchAllColumns();
  }, [activeBoardId]);

  const mappedColumn = columns.map((column) => (
    <Column key={column.id} data={column} columns={columns} />
  ));

  return (
    <>
      <div
        onClick={() => {
          setEditDeleteBoardIsActive(false);
        }}
        className="bg-very-dark-grey h-screen w-screen flex scrollbar-hide"
      >
        {/* SIDEBAR */}
        {sidebarIsActive && (
          <Sidebar
            activeBoard={activeBoard}
            boardList={boardList}
            setSidebarIsActive={setSidebarIsActive}
            setActiveBoard={setActiveBoard}
            setActiveBoardId={setActiveBoardId}
            setEditBoardFormIsActive={setEditBoardFormIsActive}
          />
        )}

        {/* NAVBAR AND VIEWPORT CONTAINER */}
        <div className="w-full flex flex-col">
          {/* NAVBAR */}
          <nav className="bg-dark-grey h-[65px] md:min-h-[80px] flex items-center gap-4 md:gap-8 px-4 md:px-6 w-full md:border-b border-lines-dark">
            {/* LOGO MOBILE*/}
            <Image
              className="md:hidden"
              priority
              src={LogoMobile}
              alt="logo-mobile"
            />
            {/* LOGO TABLET & DESKTOP */}
            {!sidebarIsActive && (
              <div className="hidden md:flex flex-col justify-center pr-8 py-6 border-r border-lines-dark h-full">
                <Image priority src={LogoLight} alt="logo-dark" />
              </div>
            )}

            {/* BOARD NAME TABLET & DESKTOP */}
            <span className="hidden md:block text-heading-lg">
              {activeBoard}
            </span>
            {/* BOARDS SELECTION BUTTON MOBILE */}
            <button
              onClick={() => setSidebarIsActive(true)}
              className="relative text-heading-lg text-white flex items-center gap-4 md:hidden"
            >
              {activeBoard}
              <Image
                priority
                src={sidebarIsActive ? IconChevronUp : IconChevronDown}
                alt="icon-chevron-down"
              />
            </button>
            <div className="flex justify-center items-center gap-6 ml-auto">
              {/* ADD NEW TASK MOBILE */}
              <button
                onClick={() => setNewTaskFormIsActive(true)}
                className="bg-main-purple w-[48px] h-[32px] rounded-full text-heading-md flex justify-center items-center hover:cursor-pointer hover:bg-main-purple-hover md:hidden"
              >
                <Image priority src={IconPlus} alt="icon-plus" />
              </button>
              {/* ADD NEW TASK TABLET & DESKTOP */}
              <button
                onClick={() => setNewTaskFormIsActive(true)}
                className="hidden md:block bg-main-purple text-heading-md p-4 px-6 rounded-full hover:bg-main-purple-hover"
              >
                + Add New Task
              </button>
              {/* EDIT DELETE TOGGLE BUTTON */}

              <button
                onClick={(event) => {
                  toggleEditDeleteBoard();
                  event.stopPropagation();
                }}
                className="hover:cursor-pointer relative h-full"
              >
                <Image
                  priority
                  src={IconVerticalEllipsis}
                  alt="icon-vertical-ellipsis"
                />
              </button>
              {editDeleteBoardIsActive && (
                <EditDeleteBoard
                  setDeleteBoardConfirmIsActive={setDeleteBoardConfirmIsActive}
                  setEditDeleteBoardIsActive={setEditDeleteBoardIsActive}
                  setEditBoardFormIsActive={setEditBoardFormIsActive}
                />
              )}
            </div>
          </nav>
          {/* POPUPS */}
          {sidebarIsActive && (
            <SidebarMobile
              activeBoard={activeBoard}
              boardList={boardList}
              setSidebarIsActive={setSidebarIsActive}
              setActiveBoard={setActiveBoard}
              setActiveBoardId={setActiveBoardId}
              setEditBoardFormIsActive={setEditBoardFormIsActive}
            />
          )}

          {newTaskFormIsActive && (
            <NewTaskForm
              newTaskFormIsActive={newTaskFormIsActive}
              setNewTaskFormIsActive={setNewTaskFormIsActive}
              columns={columns}
            />
          )}
          {deleteBoardConfirmIsActive && (
            <DeleteBoardConfirm
              activeBoard={activeBoard}
              setDeleteBoardConfirmIsActive={setDeleteBoardConfirmIsActive}
            />
          )}

          {/* VIEWPORT */}
          <section className="w-full h-full flex p-4 pt-6 gap-6 overflow-auto scrollbar-hide mb-6">
            {/* COLUMN */}
            {columns.length > 0 ? mappedColumn : <EmptyBoardMessage />}

            {columns.length > 0 && (
              <button
                onClick={() => setEditBoardFormIsActive(true)}
                className="flex justify-center items-center text-heading-xl text-medium-grey w-[280px] min-w-[280px] h-[815px] bg-gradient-to-b from-dark-grey/25 to-dark-grey/10 rounded-md mt-6"
              >
                + New Column
              </button>
            )}

            {/* EMPTY BOARD MESSAGE */}
          </section>
        </div>

        {/* BOTTOM LEFT BUTTON */}
        {!sidebarIsActive && (
          <button
            onClick={() => setSidebarIsActive((current) => !current)}
            className=" hidden md:block p-5 rounded-r-full bg-main-purple z-40 fixed bottom-8 hover:scale-105 transition-all shadow-lg"
          >
            <Image src={IconShowSidebar} alt="icon-show-sidebar" />
          </button>
        )}
        {newBoardFormIsActive && <NewBoardForm />}
        {editBoardFormIsActive && (
          <EditBoardForm
            activeBoard={activeBoard}
            activeBoardId={activeBoardId}
            columns={columns}
            setEditBoardFormIsActive={setEditBoardFormIsActive}
          />
        )}
      </div>
    </>
  );
}
