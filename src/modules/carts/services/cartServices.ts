import cartRepository from '../persistence/cartRepository';
import { Cart } from '../types/cartTypes';

const getCartById = async (cid: string): Promise<Cart> => {
  try {
    return await cartRepository.getCartById(cid);
  } catch (error) {
    console.error(`Error services:${error}`);
    throw new Error('Error: Internal server error');
  }
};

const createCart = async (): Promise<Cart> => {
  try {
    return await cartRepository.createCart();
  } catch (error) {
    console.error(`Error services:${error}`);
    throw new Error('Error: Internal server error');
  }
};

const updateOrPushCart = async (cid: string, pid: string, quantity: number = 1): Promise<Cart> => {
  try {
    return await cartRepository.updateOrPushProductsInCart(pid, cid, quantity);
  } catch (error) {
    console.error(`Error services:${error}`);
    throw new Error('Error: Internal server error');
  }
};

const deleteCart = async (cid: string): Promise<string> => {
  try {
    return await cartRepository.deleteCart(cid);
  } catch (error) {
    console.error(`Error services:${error}`);
    throw new Error('Error: Internal server error');
  }
};

export default { getCartById, createCart, updateOrPushCart, deleteCart };
