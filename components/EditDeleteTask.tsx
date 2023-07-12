export default function EditDeleteTask(props: {
  setEditTaskFormIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteTaskConfirmIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleEditTaskForm = () => {
    props.setEditTaskFormIsActive((current) => !current);
  };
  const showDeleteTaskConfirm = () => {
    props.setDeleteTaskConfirmIsActive(true);
  };
  const showEditTaskForm = () => {
    props.setEditTaskFormIsActive(true);
  };

  return (
    <div className="absolute -right-24 top-10 bg-very-dark-grey shadow-md rounded-lg flex flex-col items-start z-50 w-[200px] overflow-hidden">
      <button
        type="button"
        onClick={showEditTaskForm}
        className="text-medium-grey text-body-md md:text-body-lg hover:cursor-pointer hover:bg-dark-grey w-full text-left px-4 py-3"
      >
        Edit Task
      </button>
      <button
        type="button"
        onClick={showDeleteTaskConfirm}
        className="text-red-custom text-body-md md:text-body-lg hover:cursor-pointer hover:bg-dark-grey w-full text-left px-4 py-3"
      >
        Delete Task
      </button>
    </div>
  );
}
