export default function EditDeleteBoard(props: {
  setDeleteBoardConfirmIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setEditDeleteBoardIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setEditBoardFormIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const showDeleteBoardConfirm = () => {
    props.setDeleteBoardConfirmIsActive(true);
  };
  const hideEditDeleteBoard = () => {
    props.setEditDeleteBoardIsActive(false);
  };
  const showEditBoardForm = () => {
    props.setEditBoardFormIsActive(true);
  };

  return (
    <ul className="fixed right-6 top-16 bg-very-dark-grey shadow-md rounded-lg flex flex-col items-start z-50 w-[200px] overflow-hidden">
      <li
        onClick={showEditBoardForm}
        className="text-medium-grey text-body-md md:text-body-lg hover:cursor-pointer hover:bg-dark-grey w-full text-left px-4 py-3"
      >
        Edit Board
      </li>
      <li
        onClick={() => {
          showDeleteBoardConfirm();
          hideEditDeleteBoard();
        }}
        className="text-red-custom text-body-md md:text-body-lg hover:cursor-pointer hover:bg-dark-grey w-full text-left px-4 py-3"
      >
        Delete Board
      </li>
    </ul>
  );
}
