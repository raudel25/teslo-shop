export const OrderSummary = () => {
  return (
    <div>
      <h2 className="text-2xl mb-2">Order summary</h2>

      <div className="grid grid-cols-2">
        <span>No. Products</span>
        <span className="text-right">3 articles</span>

        <span>Subtotal</span>
        <span className="text-right">$ 100</span>

        <span>Impuestos</span>
        <span className="text-right">$ 100</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">$ 100</span>
      </div>
    </div>
  );
};
