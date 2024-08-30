import { CartProduct } from "@/interfaces";
import { currencyFormat } from "@/utils";

interface Props {
  products: CartProduct[];
}

export const OrderSummary = ({ products }: Props) => {
  return (
    <div>
      <h2 className="text-2xl mb-2">Order summary</h2>

      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">
          {products.reduce((total, item) => item.quantity + total, 0)}{" "}
          {products.reduce((total, item) => item.quantity + total, 0) === 1
            ? "article"
            : "articles"}
        </span>

        <span>Subtotal</span>
        <span className="text-right">
          {currencyFormat(
            products.reduce(
              (price, item) => item.quantity * item.price + price,
              0
            )
          )}
        </span>

        <span>Taxes (15%)</span>
        <span className="text-right">
          {currencyFormat(
            products.reduce(
              (price, item) => item.quantity * item.price + price,
              0
            ) * 0.15
          )}
        </span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(
            products.reduce(
              (price, item) => item.quantity * item.price + price,
              0
            ) * 1.15
          )}
        </span>
      </div>
    </div>
  );
};
