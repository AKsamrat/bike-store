import { Request, Response } from 'express';
import { productService } from './product.service';
import productZodValidationSchema from './product.validationZod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body;
   

    //validation using zod
    const zodParsedata= productZodValidationSchema.parse(body);
    const result = await productService.createProduct(zodParsedata);

    res.status(200).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      stack: error.stack,
      error,
    });
  }
};
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProduct();

    if (!result) {
      throw new Error('Book not found');
    }

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      stack: error.stack,
      error,
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getSingleProduct(productId);
    if (!result) {
      throw new Error('Book not found');
    }
    res.status(200).json({
      success: true,
      message: 'Book retrive successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
      stack: error.stack,
      error,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const body = req.body;
    const result = await productService.updateProduct(productId, body);

    res.status(200).json({
      success: true,
      message: 'Book Update successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      stack: error.stack,
      error,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.deleteProduct(productId);
    if (!result) {
      throw new Error('Book not found');
    }
    res.status(200).json({
      success: true,
      message: 'Book Delete successfully',

      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      stack: error.stack,
      error,
    });
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
