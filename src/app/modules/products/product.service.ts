import { TProduct } from './product.interface';
import Product from './product.model';

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};
const getAllProduct = async () => {
  const result = await Product.find();
  return result;
};
const getSingleProduct = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};
const updateProduct = async (productId: string, payload: TProduct) => {
  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
  });
  return result;
};
const deleteProduct = async (productId: string) => {
  // console.log(productId);
  const result = await Product.findByIdAndUpdate(productId, {
    isDeleted: true,
  },{
    new: true,
  });
  return result;
};
export const productService = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
