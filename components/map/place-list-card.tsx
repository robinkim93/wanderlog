import {
  Dispatch,
  MouseEvent,
  MutableRefObject,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { IMarker } from ".";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface PlaceListCardProps {
  marker: IMarker;
  setInfo: Dispatch<SetStateAction<IMarker | undefined>>;
  onClickSaveButton: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  info: IMarker | undefined;
  buttonType: "save" | "remove";
}

export const PlaceListCard = ({
  marker,
  setInfo,
  info,
  onClickSaveButton,
  buttonType,
}: PlaceListCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const onClickCard = () => {
    setInfo(marker);
    // console.log(cardRef.current?.scrollIntoView({ behavior: "smooth" }));
  };

  return (
    <div
      onClick={onClickCard}
      className={cn(
        "cursor-pointer hover:bg-slate-300 pr-2 group",
        info && info.id === marker.id && "bg-slate-300"
      )}
      ref={cardRef}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col py-5 px-2 space-y-2">
          <div className="flex space-x-5">
            <p>{marker.place_name}</p>
          </div>
          <p className="text-sm">{marker.road_address_name}</p>
          <p className="text-muted-foreground text-xs">{marker.address_name}</p>
        </div>
        <div className="flex items-center z-10">
          <Button
            className="hidden group-hover:block"
            onClick={(e) => onClickSaveButton(e)}
          >
            {buttonType === "save" ? "저장" : "제거"}
          </Button>
        </div>
      </div>
    </div>
  );
};
