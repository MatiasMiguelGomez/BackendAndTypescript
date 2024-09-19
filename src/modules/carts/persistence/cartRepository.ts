import { Cart } from '../types/cartTypes';
import { cartModel } from './models/cartModel';

const getCartById = async (cid: string): Promise<Cart> => {
  try {
    const findedCart = await cartModel.findById(cid);
    return findedCart as unknown as Cart;
  } catch (error) {
    console.error(`Error repository: ${error}`);
    throw new Error(`Error: internal server error`);
  }
};

const createCart = async (): Promise<Cart> => {
  try {
    const newCart = await cartModel.create({ products: [] });
    return newCart as unknown as Cart;
  } catch (error) {
    console.error(`Error repository: ${error}`);
    throw new Error(`Error internal server error`);
  }
};

const updateOrPushProductsInCart = async (
  pid: string,
  cid: string,
  quantity: number
): Promise<Cart> => {
  try {
    const cart = await cartModel.findOne({ _id: cid });
    if (!cart) throw new Error("Cart doesn't exist");
    const existingProduct = cart.products.find(p => p.product?.toString() === pid);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity: quantity });
    }
    cart.save();
    const cartWithSimpleProduct: Cart = {
      products: cart.products.map(p => ({
        product: p.product?.toString() || 'unknown',
        quantity: p.quantity,
      })),
    };
    return cartWithSimpleProduct;
  } catch (error) {
    console.error(`Error repository: ${error}`);
    throw new Error(`Error internal server error`);
  }
};

const deleteCart = async (cid: string): Promise<string> => {
  try {
    await cartModel.findByIdAndDelete(cid);
    return 'cart has been deleted';
  } catch (error) {
    console.error(`Error repository: ${error}`);
    throw new Error(`Error internal server error`);
  }
};

export default { getCartById, createCart, updateOrPushProductsInCart, deleteCart };
