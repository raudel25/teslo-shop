import { TopMenu, Sidebar } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex flex-col">
      <TopMenu />
      <Sidebar />
      <div className="flex-grow overflow-y-auto px-0 sm:px-10">{children}</div>
    </main>
  );
}
