import { supabase } from "@/utils/client";

export default function DeleteBoardConfirm(props: {
  activeBoard: string;
  activeBoardId: string;
  setActiveBoard: React.Dispatch<React.SetStateAction<any>>;
  setActiveBoardId: React.Dispatch<React.SetStateAction<any>>;
  setDeleteBoardConfirmIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardList: React.Dispatch<React.SetStateAction<any>>;
  setRerenderBoard: React.Dispatch<React.SetStateAction<any>>;
}) {
  const hideDeleteBoardConfirm = () => {
    props.setDeleteBoardConfirmIsActive(false);
  };

  const deleteBoard = async () => {
    const { error } = await supabase
      .from("boards")
      .delete()
      .eq("id", props.activeBoardId);
    props.setDeleteBoardConfirmIsActive(false);
    props.setRerenderBoard((current: string[]) => [...current, ""]);
    props.setActiveBoard("");
    props.setActiveBoardId("");
  };

  return (
    <div className="bg-black-overlay flex justify-center items-center w-screen h-screen p-4 fixed top-0 left-0 z-50">
      <div className="bg-dark-grey p-8 flex flex-col gap-6 rounded-md max-w-[480px] shadow-md">
        <h3 className="text-red-custom text-heading-lg">Delete this board?</h3>
        <p className="text-medium-grey text-body-lg">
          Are you sure you want to delete the ‘{props.activeBoard}’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={deleteBoard}
            className="text-body-md h-[40px] w-full md:max-w-[200px] rounded-full text-white-custom bg-red-custom hover:bg-red-custom-hover"
          >
            Delete
          </button>
          <button
            onClick={hideDeleteBoardConfirm}
            className="text-body-md h-[40px] w-full md:max-w-[200px] rounded-full text-main-purple bg-white-custom hover:bg-lines-light"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
