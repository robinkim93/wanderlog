import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface UserAvatarProps {
  image?: string;
}

export const UserAvatar = ({ image }: UserAvatarProps) => {
  if (!image) return;

  return (
    <Avatar className="h-7 w-7">
      <AvatarImage src={image} />
      <AvatarFallback />
    </Avatar>
  );
};
