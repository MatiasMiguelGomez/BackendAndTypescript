import { ProductMongoDB, ProductResponse } from '../types/productTypes';

const transformProductDto = (product: ProductMongoDB): ProductResponse => {
  const { title, stock, price, _id } = product;
  return { title, stock, price, id: _id };
};

const transformAllProductsDto = (products: Array<ProductMongoDB>): Array<ProductResponse> => {
  const productsResponse = products.map(p => {
    return {
      title: p.title,
      stock: p.stock,
      price: p.price,
      id: p._id,
    };
  });

  return productsResponse;
};

export default { transformProductDto, transformAllProductsDto };
