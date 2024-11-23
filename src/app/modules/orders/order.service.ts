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
        _id:0,
        totalRevenue: 1
      }
    }
  ]);
  return { totalRevenue: result[0]?.totalRevenue || 0 };;
 }
export const orderService = {
  createOrder,
  calculateRevenue
  }
