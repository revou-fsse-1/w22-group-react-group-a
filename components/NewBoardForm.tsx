import Image from "next/image";
import IconCross from "../assets/icon-cross.svg";

export default function NewBoardForm() {
  return (
    <div className="bg-black-overlay flex justify-center items-center w-screen h-screen min-h-fit p-4 fixed z-50">
      <form
        action="submit"
        className="flex flex-col w-full max-w-[480px] h-fit p-8 rounded-md bg-dark-grey"
      >
        <h3 className="text-heading-lg mb-6">Add New Board</h3>
        {/* BOARD NAME */}
        <label htmlFor="board-name" className="mb-2 text-body-md">
          Board Name
        </label>
        <input
          type="text"
          name="board-name"
          id="board-name"
          className="h-[40px] bg-dark-grey border border-lines-dark mb-6 px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
          placeholder="e.g. Web Design"
        />

        {/* SUBTASKS */}
        <label htmlFor="subtasks" className="mb-2 text-body-md">
          Board Columns
        </label>
        {/* COLUMNS CONTAINER */}
        <div className="flex flex-col gap-3 mb-3">
          <div className="flex gap-4">
            <input
              type="text"
              name="subtasks"
              id="subtasks"
              className="w-full h-[40px] bg-dark-grey border border-lines-dark px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
              placeholder="e.g. Take coffee break"
            />
            <button type="button" className="h-[40px]">
              <Image src={IconCross} alt="icon-cross" />
            </button>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              name="subtasks"
              id="subtasks"
              className="w-full h-[40px] bg-dark-grey border border-lines-dark px-4 rounded-md text-white-custom text-body-lg placeholder:text-white-custom/25 placeholder:text-body-lg outline-none"
              placeholder="e.g. Take coffee break"
            />
            <button type="button" className="h-[40px]">
              <Image src={IconCross} alt="icon-cross" />
            </button>
          </div>
        </div>
        {/* ADD NEW SUBTASK BUTTON */}
        <button className="text-body-md text-main-purple bg-white-custom h-[40px] w-full rounded-full mb-6">
          + Add New Column
        </button>

        <button className="text-body-md bg-main-purple h-[40px] w-full rounded-full">
          Create New Board
        </button>
      </form>
    </div>
  );
}
