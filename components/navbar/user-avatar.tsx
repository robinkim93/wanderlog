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
import { logOut } from "@/api/get/user";
import { useRouter } from "next/navigation";

interface UserAvatarProps {
  image?: string;
}

export const UserAvatar = ({ image }: UserAvatarProps) => {
  if (!image) return;

  const router = useRouter();

  const onClickLogoutButton = async () => {
    await logOut();
    router.push("/");
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
        <Avatar className="h-7 w-7">
          <AvatarImage src={image} />
          <AvatarFallback />
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
