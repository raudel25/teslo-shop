import { getCategories } from "@/actions/category/getCategory";
import { TopMenu, Sidebar, Footer, Spinner } from "@/components";
import { Suspense } from "react";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await getCategories();
  return (
    <main className="h-screen flex flex-col">
      <TopMenu categories={response.value ?? []} />
      <Suspense fallback={<Spinner />}>
        <Sidebar categories={response.value ?? []} />
      </Suspense>
      <div className="flex-grow overflow-y-auto px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}
