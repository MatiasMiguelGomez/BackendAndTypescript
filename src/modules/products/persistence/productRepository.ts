import { ProductEntry, ProductMongoDB } from '../types/productTypes';
import { productModel } from './models/productModel';

const getAllProducts = async (
  queries: Record<string, any>,
  sorting: Record<string, any>
): Promise<Array<ProductMongoDB>> => {
  try {
    const products = await productModel
      .find(queries)
      .sort({ ...sorting })
      .lean();
    return products as unknown as Array<ProductMongoDB>;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
const getById = async (pid: string): Promise<ProductMongoDB> => {
  try {
    const product = await productModel.findById(pid).lean();
    return product as unknown as ProductMongoDB;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
const createProduct = async (object: ProductEntry): Promise<ProductMongoDB> => {
  try {
    const newProduct = await productModel.create(object);
    return newProduct as unknown as ProductMongoDB;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
const updateById = async (pid: string, updates: object): Promise<ProductMongoDB> => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(pid, updates, { new: true });
    return updatedProduct as unknown as ProductMongoDB;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
const deleteById = async (pid: string): Promise<ProductMongoDB> => {
  try {
    const deletedProduct = await productModel.findByIdAndUpdate(pid, { status: false });
    return deletedProduct as unknown as ProductMongoDB;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
export default {
  getAllProducts,
  createProduct,
  updateById,
  deleteById,
  getById,
};
