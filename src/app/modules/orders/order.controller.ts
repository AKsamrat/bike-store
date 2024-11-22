import { Request, Response } from "express"
import { orderService } from "./order.service"

const createOrder = async (req: Request, res: Response) => {
  try {
    const body = req.body
    // const productData = {
    //   $set: {
    //     body,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //      isDeleted: false,
    //   }
    // }
    const result = await orderService.createOrder(body)

    res.status(200).json({
      success: true,
      message: 'Book created successfully',
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
 
 
}