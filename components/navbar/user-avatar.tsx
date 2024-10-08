import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteUser } from "@/supabase/auth";
import { useRouter } from "next/navigation";
import { getUser } from "@/supabase/user";
import { useAuthStore } from "@/hooks/useAuth";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { toast } from "sonner";

interface UserAvatarProps {
  image?: string;
}

export const UserAvatar = ({ image }: UserAvatarProps) => {
  const { user, initializeAuth, logout } = useAuthStore();
  const { onOpen: openConfirmModal, onClose } = useConfirmModal();

  if (!image) return;

  const router = useRouter();

  const onClickLogoutButton = async () => {
    openConfirmModal({
      title: "로그아웃",
      content: "로그아웃 하시겠습니까?",
      onClickConfirmButton: async () => {
        const { data, error } = await getUser();
        if (!data) return;
        await logout();
        onClose();
        toast.success("로그아웃 되었습니다.");
      },
    });
  };

  const onClickDeleteUserButton = async () => {
    openConfirmModal({
      title: "회원탈퇴",
      content: "탈퇴하시겠습니까?",
      onClickConfirmButton: async () => {
        const { data, error } = await getUser();
        if (!data) return;
        await deleteUser();
        await logout();
        onClose();
        toast.success("탈퇴되었습니다.");
      },
    });
  };

  const onClickAddPlaceButton = () => {
    router.push("/create-list");
  };

  const onClickMyPageButton = () => {
    router.push("/my-page");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10">
          <AvatarImage src={image} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        alignOffset={-10}
        className="w-40 text-center"
      >
        <DropdownMenuLabel>마이 메뉴</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onClickMyPageButton}
          className="font-semibold justify-center"
        >
          마이 페이지
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onClickAddPlaceButton}
          className="justify-center"
        >
          장소 리스트 추가
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onClickLogoutButton}
          className="text-red-600 font-semibold text-lg justify-center"
        >
          로그아웃
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onClickDeleteUserButton}
          className="text-red-600 font-semibold text-lg justify-center"
        >
          회원탈퇴
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
