import { Router } from 'express';
import products from '../modules/products/routes/productRouter';
import carts from '../modules/carts/router/cartsRouter';

const router = Router();

router.use('/products', products);
router.use('/carts', carts);

export default router;
