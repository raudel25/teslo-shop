export const revalidate = 0;

import { getCategories } from "@/actions/category/getCategory";
import { Title } from "@/components";

import Link from "next/link";

export default async function AdminCategoriesPage() {
  const response = await getCategories();
  const categories = response.value ?? [];

  return (
    <>
      <Title title="Categories maintenance" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/category/new" className="btn-primary">
          New category
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Subtitle
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Label
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/category/${category.slug}`}
                    className="hover:underline"
                  >
                    {category.title}
                  </Link>
                </td>
                <td className="text-sm font-light  text-gray-900 px-6 py-4 whitespace-nowrap">
                  {category.subTitle ?? "-"}
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {category.label}
                </td>

                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {category.isMain ? "Main" : "Secondary"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
