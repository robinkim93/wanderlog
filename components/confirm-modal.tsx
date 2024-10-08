"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { useConfirmModal } from "@/hooks/useConfirmModal";

export const ConfirmModal = () => {
  const {
    onClose,
    isOpen,
    value: { title, content },
    onClickConfirmButton,
  } = useConfirmModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {content}
        <div className="flex justify-end gap-2">
          <Button onClick={onClickConfirmButton}>확인</Button>
          <Button onClick={() => onClose()}>취소</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
