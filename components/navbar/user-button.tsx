"use client";

import { googleLogin, logOut } from "@/api/get/user";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface UserButtonProps {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export const UserButton = ({ isLogin, setIsLogin }: UserButtonProps) => {
  const router = useRouter();

  // toast나 modal로 에러처리
  const onClickButton = async () => {
    if (isLogin) {
      // 로그인 되어 있을 때
      const { error } = await logOut();

      if (!error) {
        setIsLogin(false);
        router.push("/");
      }
    } else {
      // 로그인 안되어 있을 때
      await googleLogin();
    }
  };

  return (
    <button onClick={onClickButton}>{isLogin ? "log-out" : "log-in"}</button>
  );
};
