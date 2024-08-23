import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  return (
    <div className="flex">
      <button>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {3}
      </span>

      <button>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
