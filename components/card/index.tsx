import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ListStarRating } from "@/components/card/star-rating";
import { ListSave } from "./list-save";
import Link from "next/link";

interface ListCardProps {
  id: number;
  title: string;
  rating: number;
  ratingCount: number;
  userName: string;
  concept: string;
  saveCount: number;
}

export const ListCard = ({
  id,
  title,
  rating,
  ratingCount,
  userName,
  concept,
  saveCount,
}: ListCardProps) => {
  return (
    <Link href={`/list/${id}`}>
      <Card className="aspect-[100/110] max-w-[300px] p-4 border-none flex flex-col bg-neutral-100 overflow-hidden hover:opacity-90 rounded-none">
        <CardContent className="w-full h-[200px] relative">
          <div className="w-full">
            <Image
              src={"/sample-image.jpeg"}
              fill
              alt="image"
              className="object-fill"
            />
          </div>
        </CardContent>
        <CardFooter className="w-full p-0 pt-5">
          <div className="flex flex-col w-full space-y-1">
            <div className="flex justify-between">
              <p className="font-semibold text-lg truncate ">{title}</p>
              <ListStarRating count={ratingCount} rating={rating} />
            </div>
            <p className="text-muted-foreground">{userName}</p>
            <div className="flex justify-between">
              <p>{concept}</p>
              <ListSave count={saveCount} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
