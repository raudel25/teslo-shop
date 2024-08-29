import { Address, CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address;
  setAddress: (address: Address) => void;
}

export const addressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        city: "",
        countryId: "",
        phone: "",
      },
      setAddress: (address: Address) => set({ address }),
    }),
    { name: "address-store" }
  )
);
