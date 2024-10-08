import { Navbar } from "@/components/navbar";
import "./globals.css";
import { Footer } from "@/components/footer";
import Script from "next/script";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "wanderlog",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const KAKAO_SDK_URL = process.env.NEXT_PUBLIC_KAKAO_SDK_URL!;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar-hide">
      <head>
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={KAKAO_SDK_URL}
        ></Script>
      </head>
      <body className="px-10 bg-neutral-100">
        <ModalProvider />
        <Toaster />
        <Navbar />
        <div className="mt-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
