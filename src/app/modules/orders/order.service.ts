import { TOrder } from "./order.interface";
import Order from "./order.model";

const createOrder = async (payload: TOrder) => {
   const newOrder = await Order.create(payload);
  return newOrder;
}

const calculateRevenue= async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" }
      }
    },
    {
      $project: {
        totalRevenue: 1
      }
    }
  ]);
  return result;
 }
export const orderService = {
  createOrder,
  calculateRevenue
  }
