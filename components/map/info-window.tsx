import { IMarker } from ".";

interface InfoWindowProps {
  marker: IMarker;
}

export const InfoWindow = ({ marker }: InfoWindowProps) => {
  return (
    <div className="w-[200px] flex justify-center">
      <div>{marker.place_name}</div>
    </div>
  );
};
