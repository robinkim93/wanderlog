import { IMarker } from "@/components/map";
import { create } from "zustand";

interface IPlaceListSave {
  placeList: IMarker[];
  addPlaceList: (place: IMarker) => void;
  removePlaceList: (placeId: string) => void;
  status: "success" | "" | "duplicate";
}

export const usePlaceListSave = create<IPlaceListSave>((set) => ({
  placeList: [],
  status: "success",
  addPlaceList: async (place) =>
    set((prev) => {
      const isExistPlaceList = prev.placeList.findIndex(
        (value) => value.id === place.id
      );
      return isExistPlaceList === -1
        ? {
            placeList: [...prev.placeList, place],
            status: "success",
          }
        : { placeList: [...prev.placeList], status: "duplicate" };
    }),
  removePlaceList: (placeId) =>
    set((prev) => {
      const prevList = [...prev.placeList];
      const newList = prevList.filter((prevPlace) => prevPlace.id !== placeId);

      return {
        placeList: [...newList],
        status: "success",
      };
    }),
}));
