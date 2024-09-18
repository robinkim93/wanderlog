"use client";

import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { getUser, googleLogin } from "@/api/get/user";
import { useEffect, useState } from "react";
import { UserResponse } from "@supabase/supabase-js";
import { LoginButton } from "./user-button";

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserResponse>();

  const onClickLoginButton = async () => {
    await googleLogin();
    setIsLogin(true);
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
    <nav className="py-5 px-2 border-b border-black flex justify-between items-center sticky top-0 z-50 bg-inherit">
      <div className="flex space-x-8 items-center">
        <Link href={"/"}>
          <div>logo</div>
        </Link>
        <div>menu</div>
        <div>search</div>
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
