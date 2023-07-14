export default function DeleteBoardConfirm(props: {
  setDeleteBoardConfirmIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const hideDeleteBoardConfirm = () => {
    props.setDeleteBoardConfirmIsActive(false);
  };
  return (
    <div className="bg-black-overlay flex justify-center items-center w-screen h-screen p-4 fixed z-50">
      <div className="bg-dark-grey p-8 flex flex-col gap-6 rounded-md max-w-[480px] shadow-md">
        <h3 className="text-red-custom text-heading-lg">Delete this board?</h3>
        <p className="text-medium-grey text-body-lg">
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="text-body-md h-[40px] w-full md:max-w-[200px] rounded-full text-white-custom bg-red-custom hover:bg-red-custom-hover">
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
