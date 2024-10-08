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
import { googleLogin, logIn } from "@/supabase/auth";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Logo } from "../logo";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface LogInModalProps {
  children: React.ReactNode;
}

export const LogInModal = ({ children }: LogInModalProps) => {
  const { login, error } = useAuthStore();

  const [open, setOpen] = useState<boolean>(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValidEmail(true);
  };

  const onChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsValidPassword(true);
  };

  const onClickLoginButton = async () => {
    const result = await login({ email, password });

    if (!result.success) {
      if (result.error === "Invalid login credentials") {
        setIsValidPassword(false);
      }
      if (result.error === "User data not found") {
        setIsValidEmail(false);
      }

      return;
    }

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
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            <Logo />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Input
                id="email"
                className={cn(
                  "col-span-3",
                  !isValidEmail && "border border-red-600"
                )}
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
              유효하지 않은 이메일입니다.
            </p>
            <div className="grid grid-cols-3 items-center gap-4">
              <Input
                id="password"
                className={cn(
                  "col-span-3",
                  !isValidPassword && "border border-red-600"
                )}
                type="password"
                onChange={onChangePasswordInput}
                autoComplete="current-password"
                placeholder="비밀번호"
              />
            </div>
            <p
              className={cn(
                "hidden text-red-600 text-sm",
                !isValidPassword && "block"
              )}
            >
              비밀번호가 틀렸습니다.
            </p>
          </div>
        </form>
        <Button type="submit" onClick={onClickLoginButton}>
          로그인
        </Button>

        <div className="flex flex-col gap-3 items-center">
          <p className="text-muted-foreground text-sm">간편 로그인</p>
          <div className="flex">
            <div
              onClick={onClickGoogleLogInButton}
              className="relative border border-slate-400 rounded-2xl"
            >
              <Image
                src={"/google_icon.png"}
                alt="google-icon"
                className="cursor-pointer bg-inherit"
                width={48}
                height={48}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
