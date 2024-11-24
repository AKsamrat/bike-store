/* eslint-disable prettier/prettier */
import { z } from 'zod';

// Define the Zod schema
export const orderValidationZodSchema = z.object({
  email: z
    .string()
    .email('Invalid email address') // Ensures the email is valid
    .min(1, 'Email is required'), // Email cannot be empty
  product: z.string().min(1, 'Product ID is required'), // Product is a required string
  quantity: z
    .number()
    .int('Quantity must be an integer') // Quantity must be an integer
    .positive('Quantity must be greater than zero'), // Quantity must be greater than 0
  totalPrice: z
    .number()
    .positive('Total price must be a positive number') // Total price must be positive
    .optional(), // totalPrice is optional
});

// Example usage
export default orderValidationZodSchema;
