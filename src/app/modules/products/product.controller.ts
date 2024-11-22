import { Request, Response } from "express"
import { productService } from "./product.service"

const createProduct = async (req: Request, res: Response) => {
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
    const result = await productService.createProduct(body)

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data:result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

export const productController = {
  createProduct,
 
}