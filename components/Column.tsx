import CircleBlue from "../assets/circle-blue.svg";
import Image from "next/image";
import Task from "./Task";

export default function Column() {
  return (
    <div className="flex flex-col gap-4 w-[280px] min-w-[280px]">
      <span className="flex gap-4 text-heading-sm text-medium-grey mb-2">
        <Image src={CircleBlue} alt="circle-blue" />
        TODO (4)
      </span>
      <Task />
      <Task />
      <Task />
    </div>
  );
}
