"use client";

import { KaKaoMap } from "@/components/map";
import { KaKaoMapModal } from "@/components/modals/kakao-map-modal";
import { usePlaceListSave } from "@/hooks/usePlaceListSave";
import React, { useEffect } from "react";

export default function CreateListPage() {
  const { placeList } = usePlaceListSave();

  return (
    <main className="h-screen w-full">
      <KaKaoMap />
    </main>
  );
}
