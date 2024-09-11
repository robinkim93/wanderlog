import { ListCard } from "./card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CardCarouselProps {
  title: string;
  cardData: {
    id: number;
    title: string;
    rating: number;
    ratingCount: number;
    userName: string;
    concept: string;
    saveCount: number;
  }[];
}

export const CardCarousel = ({ title, cardData = [] }: CardCarouselProps) => {
  return (
    <Carousel className="relative">
      <div className="flex items-center p-4">
        <div className="flex items-center space-x-3">
          <p className="font-bold text-2xl">{title}</p>
          <p className="text-muted-foreground text-sm">더보기</p>
        </div>
        <div className="absolute right-12">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent>
        {cardData.map(
          ({
            id,
            title,
            rating,
            ratingCount,
            userName,
            concept,
            saveCount,
          }) => (
            <CarouselItem
              key={id}
              className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
            >
              <ListCard
                id={id}
                title={title}
                rating={rating}
                ratingCount={ratingCount}
                userName={userName}
                concept={concept}
                saveCount={saveCount}
              />
            </CarouselItem>
          )
        )}
      </CarouselContent>
    </Carousel>
  );
};
