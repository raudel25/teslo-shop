import {
  DeliveryAddressSummary,
  OrderSummary,
  ProductInOrder,
} from "@/components";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Link from "next/link";

const productsInCar = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Checkout order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more articles</span>
            <Link className="underline mb-5" href="/">
              Edit cart
            </Link>

            {productsInCar.map((p, idx) => (
              <ProductInOrder key={idx} p={p} />
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <DeliveryAddressSummary />

            <div className="h-0.5 w-full rounded bg-gray-200 mb-10"></div>

            <OrderSummary />

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/orders/321"
              >
                Submit order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
