import { ObjectId } from 'mongoose';
export enum Category {
  Electronics = 'Electronics',
  Clothing = 'Clothing & Accessories',
  Home = 'Home & Kitchen',
  Health = 'Health & Beauty',
  Sports = 'Sports & Outdoors',
}

export interface ProductEntry {
  title: string;
  description: string;
  code: string;
  price: number;
  stock: number;
  category: Category;
}

export type ProductResponse = Pick<ProductEntry, 'title' | 'price' | 'stock'> & {
  id: ObjectId;
};

export interface ProductMongoDB extends ProductEntry {
  _id: ObjectId;
  status: boolean;
  __v: number;
}
