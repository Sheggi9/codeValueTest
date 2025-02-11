export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  createdDate: number;
}

export type EmptyProductCardState = Omit<ProductCardProps, "id" | "createdDate"> & {
  createdDate: null,
  id: null
  price: null
}
