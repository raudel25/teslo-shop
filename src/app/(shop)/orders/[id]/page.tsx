import {
  DeliveryAddressSummary,
  OrderSummary,
  ProductInOrder,
  Title,
} from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import { IoCartOutline } from "react-icons/io5";

interface Props {
  params: { id: string };
}

const productsInCar = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function OrderPage({ params }: Props) {
  const { id } = params;

  const getOrderState = () => (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          "bg-red-500": false,
          "bg-green-700": true,
        }
      )}
    >
      <IoCartOutline size={20} />
      <span className="mx-2">Payment</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            {getOrderState()}
            {productsInCar.map((p, idx) => (
              <ProductInOrder key={idx} p={p} />
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <DeliveryAddressSummary />

            <div className="h-0.5 w-full rounded bg-gray-200 mb-10"></div>

            <OrderSummary />

            {getOrderState()}
          </div>
        </div>
      </div>
    </div>
  );
}
