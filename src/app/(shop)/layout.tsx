import { getCategories } from "@/actions/category/getCategory";
import { TopMenu, Sidebar, Footer } from "@/components";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await getCategories();
  return (
    <main className="h-screen flex flex-col">
      <TopMenu categories={response.value ?? []} />
      <Sidebar categories={response.value ?? []} />
      <div className="flex-grow overflow-y-auto px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}
