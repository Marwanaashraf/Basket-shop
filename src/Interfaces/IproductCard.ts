export interface product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  discountPercentage: number;
  rate: number;
  details: string;
  tags: string[];
  images: string[];
  inStock: boolean;
  stockstatus: string;
  quantity: number;
}
