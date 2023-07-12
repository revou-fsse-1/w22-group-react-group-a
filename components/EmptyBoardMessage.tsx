export default function EmptyBoardMessage() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-8">
      <span className="text-heading-lg text-center text-medium-grey">
        This board is empty. Create a new column to get started
      </span>
      <button className="bg-main-purple text-heading-md p-4 px-6 rounded-full hover:bg-main-purple-hover">
        + Add New Column
      </button>
    </div>
  );
}
