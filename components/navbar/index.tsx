"use client";

import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { getUser } from "@/supabase/user";
import { ChangeEvent, useEffect, useState } from "react";
import { Logo } from "../logo";
import { SearchInput } from "../search-input";
import { LogInModal } from "../modals/login-modal";
import { Button } from "../ui/button";
import { SignUpModal } from "../modals/sign-up-modal";
import { UsersTable } from "@/supabase";
import { useAuthStore } from "@/hooks/useAuth";

export const Navbar = () => {
  const [search, setSearch] = useState<string>("");

  const { user, initializeAuth, logout } = useAuthStore();

  // 전체 리스트 페이지 구현 후 검색 구현
  const onClickSearchButton = () => {};

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <nav className="py-5 px-2 border-b border-black flex justify-between items-center sticky top-0 z-50 bg-inherit space-x-32">
      <div className="flex flex-1 space-x-8 items-center max-w-[800px]">
        <Link href={"/"}>
          <Logo />
        </Link>
        {/* <div>menu</div> */}
        <SearchInput
          onChangeSearchInput={onChangeSearchInput}
          search={search}
          onClickButton={onClickSearchButton}
          placeholder="검색어를 입력해주세요."
        />
      </div>
      <div className="flex space-x-5 items-center">
        {/* 추후 db에 유저데이터 저장하고 그 데이터를 불러와서 image src로 지정 */}
        {user ? (
          <UserAvatar
            image={user.profile_image || "/default_profile_image.jpeg"}
          />
        ) : (
          <div className="flex space-x-2">
            <SignUpModal>
              <Button>회원가입</Button>
            </SignUpModal>
            <LogInModal>
              <Button variant={"outline"}>로그인</Button>
            </LogInModal>
          </div>
        )}
      </div>
    </nav>
  );
};
