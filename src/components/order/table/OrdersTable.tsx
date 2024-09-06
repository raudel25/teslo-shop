import { Order } from "@/interfaces";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  orders: Order[];
}

export const OrdersTable = ({ orders }: Props) => {
  return (
    <div className="mb-10">
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              #ID
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Full name
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              State
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.id.split("-").at(-1)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {order.deliveryAddress?.firstName}{" "}
                {order.deliveryAddress?.lastName}
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {order.paidAt != null ? (
                  <>
                    <IoCardOutline className="text-green-800" />
                    <span className="mx-2 text-green-800">Paid</span>
                  </>
                ) : (
                  <>
                    <IoCardOutline className="text-red-800" />
                    <span className="mx-2 text-red-800">Not paid</span>
                  </>
                )}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="hover:underline"
                >
                  See order
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
