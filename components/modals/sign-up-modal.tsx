"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/hooks/useAuth";
import { cn, isCheckValidEmail } from "@/lib/utils";
import { googleLogin, signUp } from "@/supabase/auth";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

interface LogInModalProps {
  children: React.ReactNode;
}

export const SignUpModal = ({ children }: LogInModalProps) => {
  const { initializeAuth } = useAuthStore();

  const [open, setOpen] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSamePassword, setIsSamePassword] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isExistEmail, setIsExistEmail] = useState<boolean>(true);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isExistNickname, setIsExistNickname] = useState<boolean>(true);

  const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isCheckValidEmail(e.target.value)) {
      setIsValidEmail(false);
      return;
    }
    setIsExistEmail(true);
    setIsValidEmail(true);
  };

  const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCheckPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    // password과 같고, 1글자 이상일 때
    if (
      password.length > 1 &&
      e.target.value.length > 0 &&
      password === e.target.value
    ) {
      setIsSamePassword(true);
    } else {
      setIsSamePassword(false);
    }
  };

  const onChangeNicknameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsExistNickname(true);
  };

  const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClickSubmitButton = async () => {
    const { data, error } = await signUp({ email, password, name, nickname });

    if (error === "exist email") return setIsExistEmail(false);
    if (error === "duplicated nickname") return setIsExistNickname(false);

    initializeAuth();

    setOpen(false);
  };

  const onClickGoogleLogInButton = async () => {
    const { data, error } = await googleLogin();
  };

  useEffect(() => {
    if (!open) {
      // 모달이 닫힐 때 상태 초기화
      setEmail("");
      setPassword("");
      setIsSamePassword(true);
      setNickname("");
      setName("");
      setIsExistEmail(true);
      setIsExistNickname(true);
    }
  }, [open]);

  const isButtonDisabled = useMemo(() => {
    return !(
      email.length > 1 &&
      password.length > 6 &&
      isSamePassword &&
      isValidEmail &&
      nickname.length > 1 &&
      name.length > 1 &&
      isExistEmail &&
      isExistNickname
    );
  }, [
    email,
    password,
    isSamePassword,
    nickname,
    name,
    isExistEmail,
    isExistNickname,
    isValidEmail,
  ]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
          <DialogDescription>
            이메일과 비밀번호를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Input
                id="email"
                className={cn(
                  "col-span-3",
                  !(isExistEmail || isValidEmail) && "border border-red-600"
                )}
                type="email"
                onChange={onChangeEmailInput}
                autoComplete="email"
                placeholder="이메일"
              />
            </div>
            <p
              className={cn(
                "hidden text-red-600 text-sm",
                !isExistEmail && "block"
              )}
            >
              이미 존재하는 이메일입니다.
            </p>
            <p
              className={cn(
                "hidden text-red-600 text-sm",
                !isValidEmail && "block"
              )}
            >
              이메일 형식이 맞지 않습니다.
            </p>
            <div className="grid grid-cols-3 items-center gap-4">
              <Input
                id="current-password"
                className="col-span-3"
                type="password"
                minLength={6}
                onChange={onChangePasswordInput}
                autoComplete="current-password"
                placeholder="비밀번호"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Input
                id="check-password"
                className={cn(
                  "col-span-3",
                  !isSamePassword && "border border-red-600"
                )}
                type="password"
                minLength={6}
                onChange={onChangeCheckPasswordInput}
                autoComplete="check-password"
                placeholder="비밀번호 확인"
              />
            </div>
            <p
              className={cn(
                "hidden text-red-600 text-sm",
                !isSamePassword && "block"
              )}
            >
              비밀번호가 일치하지 않습니다.
            </p>
            <div className="grid grid-cols-3 items-center gap-4">
              <Input
                id="name"
                className="col-span-3"
                type="text"
                onChange={onChangeNameInput}
                placeholder="이름"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Input
                id="nickname"
                className={cn(
                  "col-span-3",
                  !isExistNickname && "border border-red-600"
                )}
                type="text"
                onChange={onChangeNicknameInput}
                placeholder="닉네임"
              />
            </div>
            <p
              className={cn(
                "hidden text-red-600 text-sm",
                !isExistNickname && "block"
              )}
            >
              이미 존재하는 닉네임입니다.
            </p>
          </div>
        </form>
        <Button
          type="submit"
          onClick={onClickSubmitButton}
          disabled={isButtonDisabled}
        >
          회원가입
        </Button>
        <div className="flex flex-col gap-3 items-center">
          <p className="text-muted-foreground text-sm">간편 가입</p>
          <div className="flex">
            <div
              onClick={onClickGoogleLogInButton}
              className="relative w-12 h-12 border border-slate-400 rounded-2xl"
            >
              <Image
                src={"/google_icon.png"}
                alt="google-icon"
                className="cursor-pointer bg-inherit"
                fill
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
