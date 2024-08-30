import { string } from "zod";
import { Address } from ".";

export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  title: string;
  categoryId: string;
}

export interface Category {
  isMain: boolean;
  slug: string;
  label: string;
  title: string;
  subTitle: string | null;
}

export interface CartProduct {
  id: string;
  slug: string;
  quantity: number;
  size: Size;
  price: number;
  title: string;
  image: string;
  inStock: number;
}

export interface Order {
  id: string;
  // paidAt :string;

  // createdAt DateTime @default(now())
  // updatedAt DateTime @updatedAt

  userId: string;

  // orderProducts OrderProduct[]

  deliveryAddress: Address;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
