import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  products: CartProduct[];
  addProduct: (product: CartProduct) => void;
}

export const cartStore = create<State>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product: CartProduct) => {
        const { products } = get();

        if (
          !products.some((p) => product.size === p.size && product.id === p.id)
        ) {
          set({ products: [...products, product] });
          return;
        }

        set({
          products: products.map((p) =>
            p.id === product.id && p.size === product.size
              ? { ...p, quantity: (p.quantity += product.quantity) }
              : p
          ),
        });
      },
    }),
    { name: "shopping-cart" }
  )
);
