import Link from "next/link";
import { UserAvatar } from "./user-avatar";

export const Navbar = () => {
  return (
    <nav className="py-5 px-2 border-b border-black flex justify-between items-center sticky top-0 z-50 bg-inherit">
      <div className="flex space-x-8 items-center">
        <Link href={"/"}>
          <div>logo</div>
        </Link>
        <div>menu</div>
        <div>search</div>
      </div>
      <div className="flex space-x-5 items-center">
        {/* 아바타 버튼 (비로그인 시 회원가입 버튼) */}
        <UserAvatar />
        <div>login</div>
      </div>
    </nav>
  );
};
