import { Download } from "lucide-react";

interface ListSaveProps {
  count?: number;
}

export const ListSave = ({ count = 0 }: ListSaveProps) => {
  return (
    <div className="flex space-x-1 items-center">
      <Download size={20} />
      <p>{count}</p>
    </div>
  );
};
