import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize: Size;
  availableSizes: Size[];
  onChange: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onChange,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="mb-4 font-bold">Available sizes</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
