export interface BasketItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  image: string;
  maxStock?: number;
}

export interface Basket {
  id: string;
  basketItems: BasketItem[];
  discountValue: number;
  percentage: number;
  total: number;
}
