"use client";

import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { getUser } from "@/api/get/user";
import { useEffect, useState } from "react";
import { UserResponse } from "@supabase/supabase-js";
import { UserButton } from "./user-button";

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserResponse>();

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

  useEffect(() => {
    console.log(userData);
  }, [userData]);

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
        <UserAvatar image={userData?.data.user?.user_metadata.picture} />
        <UserButton isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </nav>
  );
};
