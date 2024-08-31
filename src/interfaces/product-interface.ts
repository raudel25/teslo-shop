import { Address } from ".";

export interface Image {
  url: string;
  id: string;
}

export interface Product {
  id: string;
  description: string;
  images: Image[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  title: string;
  categoryId: string;
  category: string;
}

export interface Category {
  id: string;
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
  image?: string;
  inStock: number;
}

export interface Order {
  id: string;
  paidAt: Date | null;

  // createdAt DateTime @default(now())
  // updatedAt DateTime @updatedAt

  userId: string;

  orderProducts: CartProduct[];

  deliveryAddress: Address;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
