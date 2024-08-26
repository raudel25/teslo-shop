import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  maxQuantity: number;
  onChange: (quantity: number) => void;
}

export const QuantitySelector = ({
  quantity,
  maxQuantity,
  onChange,
}: Props) => {
  return (
    <div className="flex">
      <button onClick={() => onChange(quantity - 1)} disabled={quantity === 0}>
        <IoRemoveCircleOutline size={20} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {quantity}
      </span>

      <button
        onClick={() => onChange(quantity + 1)}
        disabled={quantity === maxQuantity}
      >
        <IoAddCircleOutline size={20} />
      </button>
    </div>
  );
};
