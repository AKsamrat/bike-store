"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (value) => /^\S+@\S+\.\S+$/.test(value),
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
}, {
    timestamps: true,
    versionKey: false
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
