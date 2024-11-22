import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: (value: string) => /^\S+@\S+\.\S+$/.test(value),
        message: '{VALUE} is not a valid email',
      },
    },
    product: {
      type: String,
      required: [true, 'Product is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be negative'],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);
const Order = model<TOrder>('Order', orderSchema);

export default Order;