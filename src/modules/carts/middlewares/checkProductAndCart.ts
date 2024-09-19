import { NextFunction, Request, Response } from 'express';
import productSevices from '../../products/services/productSevices';
import cartServices from '../services/cartServices';
export const checkProductAndCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { cid, pid } = req.params;
  const existingProduct = await productSevices.getById(pid);
  if (!existingProduct) res.status(400).json({ status: 'Error', message: "Product doesn't exist" });
  const existingCart = await cartServices.getCartById(cid);
  if (!existingCart) res.status(400).json({ statuss: 'Error', message: "Cart doesn't exist" });
  next();
};
