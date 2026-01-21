export interface Category {
  _id: string;
  name: string;
  image_uris: string[];
}

export interface Product {
  _id: string;
  name: string;
  image_uris: string[];
  price: number;
  original_price: number;
  weight: string;
  description: string;
  category: string[];
}

export interface AllProducts {
  updatedAt: string;
  products: Product[];
}

export type HomeHeaderImperativeRef = {
  handleSearchTextChange: (query: string) => void;
} | null;

export type ItemDetailParams =
  | {
      itemId?: string;
    }
  | undefined;
