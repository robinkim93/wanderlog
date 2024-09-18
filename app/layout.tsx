import { Navbar } from "@/components/navbar";
import "./globals.css";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "location",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className="px-10 bg-neutral-100">
        <Navbar />
        <div className="mt-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
