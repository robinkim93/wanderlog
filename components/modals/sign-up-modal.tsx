"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { googleLogin, logIn, signUp } from "@/supabase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface LogInModalProps {
  children: React.ReactNode;
}

export const SignUpModal = ({ children }: LogInModalProps) => {
  const { initializeAuth } = useAuthStore();

  const [open, setOpen] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidNickname, setIsValidNickname] = useState<boolean>(true);

  const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValidEmail(true);
  };

  const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeNicknameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsValidNickname(true);
  };

  const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClickSubmitButton = async () => {
    const { data, error } = await signUp({ email, password, name, nickname });

    if (error === "exist email") return setIsValidEmail(false);
    if (error === "duplicated nickname") return setIsValidNickname(false);

    initializeAuth();

    setOpen(false);
  };

  const onClickGoogleLogInButton = async () => {
    const { data, error } = await googleLogin();
  };

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
                className="col-span-3"
                onChange={onChangeEmailInput}
                autoComplete="email"
                placeholder="이메일"
              />
            </div>
            <p
              className={cn(
                "hidden text-red-600 text-sm",
                !isValidEmail && "block"
              )}
            >
              이미 존재하는 이메일입니다.
            </p>
            <div className="grid grid-cols-3 items-center gap-4">
              <Input
                id="password"
                className="col-span-3"
                type="password"
                onChange={onChangePasswordInput}
                autoComplete="current-password"
                placeholder="비밀번호"
              />
            </div>
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
                className="col-span-3"
                type="text"
                onChange={onChangeNicknameInput}
                placeholder="닉네임"
              />
            </div>
            <p
              className={cn(
                "hidden text-red-600 text-sm",
                !isValidNickname && "block"
              )}
            >
              이미 존재하는 닉네임입니다.
            </p>
          </div>
        </form>
        <Button type="submit" onClick={onClickSubmitButton}>
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
