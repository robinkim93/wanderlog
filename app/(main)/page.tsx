"use client";

import { ListCard } from "@/components/card";
import { CardCarousel } from "@/components/card-carousel";
import { useEffect } from "react";

const cardData = [
  {
    id: 1,
    title: "테스트 데이터1",
    rating: 4.4,
    ratingCount: 22,
    userName: "robin",
    concept: "데이트",
    saveCount: 10,
  },
  {
    id: 2,
    title: "테스트 데이터2",
    rating: 4.1,
    ratingCount: 3322,
    userName: "robin",
    concept: "데이트",
    saveCount: 101,
  },
  {
    id: 3,
    title: "테스트 데이터3",
    rating: 4.2,
    ratingCount: 22,
    userName: "robin",
    concept: "맛집",
    saveCount: 10,
  },
  {
    id: 4,
    title: "테스트 데이터4",
    rating: 4.4,
    ratingCount: 22,
    userName: "robin",
    concept: "카페",
    saveCount: 1044,
  },
  {
    id: 5,
    title: "테스트 데이터5",
    rating: 4.6,
    ratingCount: 522,
    userName: "robin",
    concept: "데이트",
    saveCount: 10,
  },
  {
    id: 6,
    title: "테스트 데이터6",
    rating: 4.4,
    ratingCount: 22,
    userName: "robin",
    concept: "서울",
    saveCount: 10,
  },
  {
    id: 7,
    title: "테스트 데이터7",
    rating: 4.7,
    ratingCount: 22,
    userName: "robin",
    concept: "데이트",
    saveCount: 10,
  },
  {
    id: 8,
    title: "테스트 데이터8",
    rating: 3.3,
    ratingCount: 22,
    userName: "robin",
    concept: "충남",
    saveCount: 10555,
  },
  {
    id: 9,
    title: "테스트 데이터9",
    rating: 4.1,
    ratingCount: 122,
    userName: "robin",
    concept: "데이트",
    saveCount: 10,
  },
  {
    id: 10,
    title: "테스트 데이터10",
    rating: 4.0,
    ratingCount: 22,
    userName: "robin",
    concept: "데이트",
    saveCount: 10,
  },
];

export default function MainPage() {
  return (
    <main className="w-full h-full">
      <div className="w-full h-full space-y-5">
        <CardCarousel title={"많이 찾는"} cardData={cardData} />
        <CardCarousel title={"최신 리스트"} cardData={cardData} />
        <CardCarousel title={"컨셉 별"} cardData={cardData} />
        <CardCarousel title={"많이 저장한"} cardData={cardData} />
      </div>
    </main>
  );
}
