import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  onChangeSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
  search?: string;
  onClickButton: () => void;
  placeholder?: string;
}

export const SearchInput = ({
  onChangeSearchInput,
  search,
  onClickButton,
  placeholder,
}: SearchInputProps) => {
  return (
    <div className="relative w-full">
      <Input
        onChange={onChangeSearchInput}
        value={search}
        className="pl-10 text-muted-foreground"
        placeholder={placeholder}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
      <Button
        className={cn(
          "hidden whitespace-nowrap absolute top-1/2 -translate-y-1/2 right-0 h-full",
          search && "block"
        )}
        onClick={onClickButton}
        variant={"ghost"}
        size={"sm"}
      >
        검색
      </Button>
    </div>
  );
};
