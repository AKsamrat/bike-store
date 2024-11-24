"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationZodSchema = void 0;
/* eslint-disable prettier/prettier */
const zod_1 = require("zod");
// Define the Zod schema
exports.orderValidationZodSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Invalid email address') // Ensures the email is valid
        .min(1, 'Email is required'), // Email cannot be empty
    product: zod_1.z.string().min(1, 'Product ID is required'), // Product is a required string
    quantity: zod_1.z
        .number()
        .int('Quantity must be an integer') // Quantity must be an integer
        .positive('Quantity must be greater than zero'), // Quantity must be greater than 0
    totalPrice: zod_1.z
        .number()
        .positive('Total price must be a positive number') // Total price must be positive
        .optional(), // totalPrice is optional
});
// Example usage
exports.default = exports.orderValidationZodSchema;
