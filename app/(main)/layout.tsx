export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full h-full">{children}</main>;
}
