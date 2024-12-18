import { Request, Response } from 'express';
import { orderService } from './order.service';
import Product from '../products/product.model';
import orderValidationZodSchema from './order.validationZod';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { product, quantity } = req.body;

    const zodParsedata = orderValidationZodSchema.parse(req.body);
    // Find the product and check if the quantity is sufficient
    const Oproduct = await Product.findById(product);

    if (!Oproduct) {
      throw new Error('Product not found');
    }
    if (Oproduct.quantity === 0) {
      await Product.findByIdAndUpdate(product, { inStock: false });
    }
    if (Oproduct.quantity < quantity) {
      throw new Error('Insufficient product quantity');
    }

    const result = await orderService.createOrder(zodParsedata);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
    // Reduce the product quantity
    Oproduct.quantity -= quantity;
    await Product.findByIdAndUpdate(product, { quantity: Oproduct.quantity });
    // console.log(Oproduct.quantity)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to place order',
      stack: error.stack,
      error,
    });
  }
};
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const result = await orderService.calculateRevenue();

    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};
export const orderController = {
  createOrder,
  calculateRevenue,
};
