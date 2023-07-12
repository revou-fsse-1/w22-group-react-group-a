export default function DeleteTaskConfirm(props: {
  setDeleteTaskConfirmIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const hideDeleteTaskConfirm = () => {
    props.setDeleteTaskConfirmIsActive(false);
  };
  return (
    <div className="bg-black-overlay flex justify-center items-center w-screen h-screen p-4 fixed z-50">
      <div className="bg-dark-grey p-8 flex flex-col gap-6 rounded-md max-w-[480px] shadow-md">
        <h3 className="text-red-custom text-heading-lg">Delete this task?</h3>
        <p className="text-medium-grey text-body-lg">
          Are you sure you want to delete the ‘Build settings UI’ task and its
          subtasks? This action cannot be reversed.
        </p>
        <div className="flex gap-4">
          <button className="text-body-md h-[40px] w-[200px] rounded-full text-white-custom bg-red-custom">
            Delete
          </button>
          <button
            onClick={hideDeleteTaskConfirm}
            className="text-body-md h-[40px] w-[200px] rounded-full text-main-purple bg-white-custom"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
