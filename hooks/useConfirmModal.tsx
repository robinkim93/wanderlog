import { create } from "zustand";

const defaultValue = {
  title: "",
  content: "",
};

interface IConfirmModal {
  isOpen: boolean;
  value: typeof defaultValue;
  onOpen: ({
    title,
    content,
    onClickConfirmButton,
  }: {
    title: string;
    content: string;
    onClickConfirmButton: () => Promise<void>;
  }) => void;
  onClose: () => void;
  onClickConfirmButton: () => Promise<void>;
}

export const useConfirmModal = create<IConfirmModal>((set) => ({
  isOpen: false,
  value: defaultValue,
  onOpen: ({
    title,
    content,
    onClickConfirmButton,
  }: {
    title: string;
    content: string;
    onClickConfirmButton: () => Promise<void>;
  }) => {
    set({ isOpen: true, value: { title, content }, onClickConfirmButton });
  },
  onClose: () => {
    set({ isOpen: false, value: { title: "", content: "" } });
  },
  onClickConfirmButton: async () => {},
}));
