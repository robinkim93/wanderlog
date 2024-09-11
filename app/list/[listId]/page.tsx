"use client";

import { KaKaoMap } from "@/components/map";
import { usePlaceListSave } from "@/hooks/usePlaceListSave";
import React, { useEffect } from "react";

interface ListDetailPage {
  params: {
    listId: number;
  };
}

export default function ListDetailPage({ params }: ListDetailPage) {
  const { placeList } = usePlaceListSave();

  return (
    <main className="h-screen w-full">
      {/* {params.listId} */}
      <KaKaoMap />
    </main>
  );
}
