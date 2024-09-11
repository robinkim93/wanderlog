import { IMarker } from "@/components/map";
import { create } from "zustand";

interface IPlaceListSave {
  placeList: IMarker[];
  addPlaceList: (place: IMarker) => void;
  removePlaceList: (placeId: string) => void;
}

export const usePlaceListSave = create<IPlaceListSave>((set) => ({
  placeList: [],
  addPlaceList: (place) =>
    set((prev) => {
      return {
        placeList: [...prev.placeList, place],
      };
    }),
  removePlaceList: (placeId) =>
    set((prev) => {
      const prevList = [...prev.placeList];
      const newList = prevList.filter((prevPlace) => prevPlace.id !== placeId);

      return {
        placeList: [...newList],
      };
    }),
}));
