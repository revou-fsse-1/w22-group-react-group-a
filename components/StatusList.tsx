export default function StatusList(props: {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  columns: {
    column: string;
    id: string;
    map: any;
  };
}) {
  const mappedColumns = props.columns.map(
    (column: { column: string; id: string; color: string }) => (
      <span
        onClick={() => props.setStatus(column.column)}
        key={column.id}
        className={` ${
          props.status == column.column
            ? "text-main-purple"
            : "text-medium-grey"
        } text-body-md md:text-body-lg hover:cursor-pointer hover:bg-dark-grey w-full text-left px-4 py-3`}
      >
        {column.column}
      </span>
    )
  );

  return (
    <div className="absolute left-0 top-12 w-full bg-very-dark-grey shadow-md rounded-lg flex flex-col items-start z-50 overflow-hidden">
      {mappedColumns}
    </div>
  );
}
