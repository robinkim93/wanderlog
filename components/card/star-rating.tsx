import { Star } from "lucide-react";

interface ListStarRatingProps {
  rating: number;
  count: number;
}

export const ListStarRating = ({
  rating = 0,
  count = 0,
}: ListStarRatingProps) => {
  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-1">
        <Star size={15} color="black" />
        <p>{rating}</p>
      </div>
      <p>{`(${count})`}</p>
    </div>
  );
};
