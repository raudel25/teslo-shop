import { DeliveryAddressSummary, OrderSummary, Title } from "@/components";
import Link from "next/link";
import { ProductsInCheckout } from "./ui/ProductsInCheckout";
import { getCountries } from "@/actions/address/getCountries";

export default async function CheckoutPage() {
  const { value: countries } = await getCountries();
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

            <ProductsInCheckout />
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <DeliveryAddressSummary countries={countries ?? []} />

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
