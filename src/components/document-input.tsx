import { BsCloudCheck } from "react-icons/bs";

export const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
        <span className="text-[16px] font-normal px-1.5 cursor-pointer truncate">Untitled Document</span>
        <BsCloudCheck />
    </div>
  );
}