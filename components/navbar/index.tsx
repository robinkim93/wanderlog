"use client";

import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { googleLogin } from "@/supabase/auth";
import { getUser } from "@/supabase/user";
import { ChangeEvent, useEffect, useState } from "react";
import { UserResponse } from "@supabase/supabase-js";
import { LoginButton } from "./user-button";
import { Logo } from "../logo";
import { SearchInput } from "../search-input";

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserResponse>();
  const [search, setSearch] = useState<string>("");

  const onClickLoginButton = async () => {
    await googleLogin();
    setIsLogin(true);
  };

  // 전체 리스트 페이지 구현 후 검색 구현
  const onClickSearchButton = () => {};

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const setInitUserData = async () => {
      const userData = await getUser();

      if (!userData.data.user) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
        setUserData(userData);
      }
    };
    setInitUserData();
  }, []);

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
        {isLogin ? (
          <UserAvatar
            setIsLogin={setIsLogin}
            image={isLogin ? userData?.data.user?.user_metadata.picture : null}
          />
        ) : (
          <LoginButton onClickButton={onClickLoginButton} />
        )}
      </div>
    </nav>
  );
};
