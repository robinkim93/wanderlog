"use client";

interface LoginButtonProps {
  onClickButton: () => void;
}

export const LoginButton = ({ onClickButton }: LoginButtonProps) => {
  return <button onClick={onClickButton}>로그인</button>;
};
