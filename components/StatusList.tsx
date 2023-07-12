export default function StatusList() {
  return (
    <div className="absolute left-0 top-12 w-full bg-very-dark-grey shadow-md rounded-lg flex flex-col items-start z-50 overflow-hidden">
      <button className="text-medium-grey text-body-md md:text-body-lg hover:cursor-pointer hover:bg-dark-grey w-full text-left px-4 py-3">
        Todo
      </button>
      <button className="text-medium-grey text-body-md md:text-body-lg hover:cursor-pointer hover:bg-dark-grey w-full text-left px-4 py-3">
        Doing
      </button>
      <button className="text-medium-grey text-body-md md:text-body-lg hover:cursor-pointer hover:bg-dark-grey w-full text-left px-4 py-3">
        Done
      </button>
    </div>
  );
}
