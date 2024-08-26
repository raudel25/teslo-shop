export interface Product {
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

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
