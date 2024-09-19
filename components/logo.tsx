import { cn } from "@/lib/utils";
import { Alumni_Sans } from "next/font/google";
const inter = Alumni_Sans({ subsets: ["latin"], weight: "600", preload: true });

export const Logo = () => {
  return <div className={cn("text-2xl", inter.className)}>Wanderlog</div>;
};
