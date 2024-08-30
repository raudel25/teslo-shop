import { CartProduct } from "@/interfaces";
import { Size } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  products: CartProduct[];
  addProduct: (product: CartProduct) => void;
  updateProduct: (product: CartProduct) => void;
  removeProduct: (id: string, size: Size) => void;
  clearCart: () => void;
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
      updateProduct: (product: CartProduct) => {
        const { products } = get();
        set({
          products: products.map((p) =>
            p.id === product.id && p.size === product.size ? product : p
          ),
        });
      },
      removeProduct: (id: string, size: Size) => {
        const { products } = get();
        set({
          products: products.filter((p) => p.id !== id || p.size !== size),
        });
      },
      clearCart: () => set({ products: [] }),
    }),
    { name: "shopping-cart" }
  )
);
