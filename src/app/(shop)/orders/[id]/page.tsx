import { getCountries } from "@/actions/address/getCountries";
import { getOrder } from "@/actions/order/getOrder";
import { auth } from "@/auth.config";
import {
  DeliveryAddressSummary,
  OrderSummary,
  ProductInOrder,
  Title,
} from "@/components";
import clsx from "clsx";
import { notFound, redirect } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

interface Props {
  params: { id: string };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const session = await auth();

  const response = await getOrder(session!.user.id, id);
  const countries = (await getCountries()).value;

  if (!response.ok) notFound();

  const getOrderState = () => (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          "bg-red-500": response.value?.paidAt == null,
          "bg-green-700": response.value?.paidAt != null,
        }
      )}
    >
      <IoCartOutline size={20} />
      <span className="mx-2">
        {response.value?.paidAt == null ? "Not paid" : "Paid"}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            {getOrderState()}
            {response.value!.orderProducts.map((p, idx) => (
              <ProductInOrder key={idx} p={p} />
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <DeliveryAddressSummary
              address={response.value!.deliveryAddress}
              countries={countries ?? []}
            />

            <div className="h-0.5 w-full rounded bg-gray-200 mb-10"></div>

            <OrderSummary products={response.value!.orderProducts} />

            {getOrderState()}
          </div>
        </div>
      </div>
    </div>
  );
}
