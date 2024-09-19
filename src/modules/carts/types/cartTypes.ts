interface SimpleProduct {
  product: string;
  quantity: number;
}

export interface Cart {
  products: Array<SimpleProduct>;
}
