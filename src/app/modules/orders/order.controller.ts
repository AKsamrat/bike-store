/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { orderService } from './order.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import Product from '../products/product.model';


const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const product = req.body.products[0].product;
  const quantity = req.body.products[0].quantity;
  const Oproduct = await Product.findById(product);
  console.log(product)

  if (!Oproduct) {
    throw new Error('Product not found');
  }
  if (Oproduct.quantity === 0) {
    await Product.findByIdAndUpdate(product, { inStock: false });
  }
  if (Oproduct.quantity < quantity) {
    throw new Error('Insufficient product quantity');
  }
  console.log(req.body);
  const order = await orderService.createOrder(user, req.body, req.ip!);
  Oproduct.quantity -= quantity;
  await Product.findByIdAndUpdate(product, { quantity: Oproduct.quantity });


  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Order placed successfully",
    data: order,
  });
});
const updateOrder = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const body = req.body;
    console.log(productId, body);
    const result = await orderService.updateOrder(productId, body);

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
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    // const body = req.body;

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
const getOrders = catchAsync(async (req, res) => {
  const order = await orderService.getOrders();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order retrieved successfully',
    data: order,
  });
});
const getMyOrders = catchAsync(async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const order = await orderService.getMyOrders(userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order retrieved successfully',
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Order verified successfully',
    data: order,
  });
});
export const orderController = {
  createOrder,
  calculateRevenue,
  verifyPayment,
  getOrders,
  updateOrder,
  getMyOrders
};
