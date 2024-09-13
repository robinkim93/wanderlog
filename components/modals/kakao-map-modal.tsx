"use client";

import { KaKaoMap } from "../map";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface KaKaoMapModalProps {
  children: React.ReactNode;
}

export const KaKaoMapModal = ({ children }: KaKaoMapModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-full h-screen">
        <DialogHeader className="space-y-0">
          <DialogTitle>위치 추가</DialogTitle>
        </DialogHeader>
        <KaKaoMap />
      </DialogContent>
    </Dialog>
  );
};
