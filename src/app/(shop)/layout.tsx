import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex flex-col">
      <TopMenu />
      <div className="flex-grow overflow-y-auto px-0 sm:px-10">{children}</div>
    </main>
  );
}
