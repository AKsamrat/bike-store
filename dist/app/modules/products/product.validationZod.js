"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productZodValidationSchema = void 0;
/* eslint-disable prettier/prettier */
const zod_1 = require("zod");
// Define the Zod schema
exports.productZodValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    author: zod_1.z.string().min(1, 'Author is required'),
    price: zod_1.z
        .number()
        .positive('Price must be a positive number')
        .min(0, 'Price cannot be negative'),
    category: zod_1.z.enum([
        'Fiction',
        'Science',
        'SelfDevelopment',
        'Poetry',
        'Religious',
    ]), // Category is restricted to specific values
    description: zod_1.z.string().min(1, 'Description is required'),
    quantity: zod_1.z
        .number()
        .int('Quantity must be an integer')
        .min(0, 'Quantity cannot be less than zero'),
    inStock: zod_1.z.boolean(),
    isDeleted: zod_1.z.boolean().optional(),
});
// Example usage
exports.default = exports.productZodValidationSchema;
