import { supabase } from "@/utils/client";
export default function StatusList(props: {
  id: string;
  status: string;
  columns: [
    {
      id: string;
      column: string;
      color: string;
      // map: any;
    }
  ];
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setStatusId: React.Dispatch<React.SetStateAction<string>>;
}) {
  // map columns
  const updateStatus = async (column: string, columnId: string) => {
    props.setStatus(column);
    const { data, error } = await supabase
      .from("tasks")
      .update({ column_id: columnId })
      .eq("id", `${props.id}`);
    // .select();
  };
  const mappedColumns = props.columns.map(
    (column: { column: string; id: string; color: string }) => (
      <li
        onClick={(event) => {
          event.preventDefault();
          updateStatus(column.column, column.id);
        }}
        key={column.id}
        className={` ${
          props.status == column.column
            ? "text-main-purple"
            : "text-medium-grey"
        } text-body-md md:text-body-lg hover:cursor-pointer hover:bg-dark-grey w-full text-left px-4 py-3`}
      >
        {column.column}
      </li>
    )
  );

  return (
    <ul className="absolute left-0 top-12 w-full bg-very-dark-grey shadow-md rounded-lg flex flex-col items-start z-50 overflow-hidden">
      {mappedColumns}
    </ul>
  );
}
