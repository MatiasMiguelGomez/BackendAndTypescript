import productDto from '../dto/productDto';
import productRepository from '../persistence/productRepository';
import { ProductResponse } from '../types/productTypes';
import generateRandomCode from '../utils/productUtils';

const getAllProducts = async (object: any): Promise<Array<ProductResponse>> => {
  try {
    const { sort, category, price } = object;
    const sorting: Record<string, number> = {};
    if (price) {
      sorting.price = price === 'cheaper' ? 1 : -1;
    } else if (sort) {
      sorting.title = sort === 'asc' ? 1 : -1;
    }
    const queries: Record<string, any> = { status: true };
    if (category) queries.category = category;

    const products = await productRepository.getAllProducts(queries, sorting);
    const resProductsDTO = productDto.transformAllProductsDto(products);
    return resProductsDTO;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
const getById = async (pid: string): Promise<ProductResponse> => {
  try {
    const product = await productRepository.getById(pid);
    const resProductDTO = productDto.transformProductDto(product);
    return resProductDTO;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
const postProduct = async (object: any): Promise<ProductResponse> => {
  try {
    const code = generateRandomCode();
    const newProduct = {
      ...object,
      code,
    };
    const product = await productRepository.createProduct(newProduct);
    const resProductDTO = productDto.transformProductDto(product);
    return resProductDTO;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
const updateById = async (pid: string, updates: object): Promise<ProductResponse> => {
  try {
    const updatedProduct = await productRepository.updateById(pid, updates);
    const resProductDTO = productDto.transformProductDto(updatedProduct);
    return resProductDTO;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
const deleteById = async (pid: string): Promise<ProductResponse> => {
  try {
    const deletedProduct = await productRepository.deleteById(pid);
    const resProductDTO = productDto.transformProductDto(deletedProduct);
    return resProductDTO;
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};

export default { getAllProducts, getById, postProduct, updateById, deleteById };
