import { Request, Response } from 'express';
import cartServices from '../services/cartServices';

const getCartById = async (req: Request, res: Response): Promise<void> => {
  try {
    const findedProduct = await cartServices.getCartById(req.params.cid);
    res.status(200).json({ status: 'success', payload: findedProduct });
  } catch (error) {
    console.error(`Error: Controller error:${error}`);
    if (error) res.status(400).json({ Error: 'internal server error' });
  }
};

const createCart = async (_req: Request, res: Response): Promise<void> => {
  try {
    const newCart = await cartServices.createCart();
    res.status(201).json({ status: 'success', payload: newCart });
  } catch (error) {
    console.error(`Error: Controller error:${error}`);
    if (error) res.status(400).json({ Error: 'internal server error' });
  }
};

const updateOrPushCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pid, cid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await cartServices.updateOrPushCart(cid, pid, quantity);
    res.status(200).json({ status: 'success', payload: updatedCart });
  } catch (error) {
    console.error(`Error: Controller error:${error}`);
    if (error) res.status(400).json({ Error: 'internal server error' });
  }
};

const deleteCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCart = await cartServices.deleteCart(req.params.cid);
    res.status(200).json({ status: 'success', payload: deletedCart });
  } catch (error) {
    console.error(`Error: Controller error:${error}`);
    if (error) res.status(400).json({ Error: 'internal server error' });
  }
};

export default { getCartById, createCart, updateOrPushCart, deleteCart };
