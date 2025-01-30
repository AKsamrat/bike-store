/* eslint-disable prettier/prettier */
import AppError from '../../errors/AppError';
import Product from '../products/product.model';
import { IUser } from '../user/user.interface';
import httpStatus from "http-status";
import Order from './order.model';
import { orderUtils } from './order.utils';
import { TProduct } from '../products/product.interface';

const createOrder = async (
  user: IUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string
) => {
  if (!payload?.products?.length)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.product);
      // console.log(product);
      if (product) {

        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    })
  );

  let order = await Order.create({
    user,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};
const calculateRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return { totalRevenue: result[0]?.totalRevenue || 0 };
};
const getOrders = async () => {
  const data = await Order.find().populate('user', 'name email').populate('products.product', 'title price').exec();
  return data;
};
const getMyOrders = async (userId: string) => {
  console.log(userId)
  const data = await Order.find({ user: userId }).populate("products.product");
  return data;
};
const updateOrder = async (productId: string, payload: TProduct) => {
  const result = await Order.findByIdAndUpdate(productId, payload, {
    new: true,
  });
  return result;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
              ? "Pending"
              : verifiedPayment[0].bank_status == "Cancel"
                ? "Cancelled"
                : "",
      }
    );
  }

  return verifiedPayment;
};
export const orderService = {
  createOrder,
  updateOrder,
  calculateRevenue,
  getOrders,
  verifyPayment,
  getMyOrders
};
