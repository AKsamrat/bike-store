import { Request, Response } from "express"
import { orderService } from "./order.service"
import Product from "../products/product.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity,totalPrice } = req.body
     // Find the product and check if the quantity is sufficient
    const Oproduct = await Product.findById(product);
    
    if (!Oproduct) {
      throw new Error('Product not found');
    }
    if (Oproduct.quantity === 0) {
      await Product.findByIdAndUpdate(product,{inStock:false});
    }
    if (Oproduct.quantity < quantity) {
      throw new Error('Insufficient product quantity');
    }
    
    const result = await orderService.createOrder(req.body)

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data:result,
    })
    // Reduce the product quantity
    Oproduct.quantity -= quantity;
    await Product.findByIdAndUpdate(product,{quantity:Oproduct.quantity});
    // console.log(Oproduct.quantity)
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message:(error.message || 'Failed to place order'),
      error,
    })
  }
}
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const body = req.body
    
    const result = await orderService.calculateRevenue()

    res.status(200).json({
      success: true,
      message: 'revenue calculate successfully',
      data:result,
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message:error.message || 'Something went wrong',
      error,
    })
  }
}
export const orderController = {
  createOrder,
  calculateRevenue,
 
 
}