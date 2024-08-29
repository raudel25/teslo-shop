import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary, Title } from "@/components";

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more articles</span>
            <Link className="underline mb-5" href="/">
              Continue shopping
            </Link>

            <ProductsInCart />
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <OrderSummary />
            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
