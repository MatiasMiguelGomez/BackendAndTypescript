import { Router } from 'express';
import cartController from '../controllers/cartController';
import { checkProductAndCart } from '../middlewares/checkProductAndCart';

const router = Router();

router.get('/:cid', cartController.getCartById);

router.post('/', cartController.createCart);

router.put('/:cid/product/:pid', checkProductAndCart, cartController.updateOrPushCart);

router.delete('/:cid', cartController.deleteCart);

export default router;
