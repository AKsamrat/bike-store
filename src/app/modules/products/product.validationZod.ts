/* eslint-disable prettier/prettier */
import { z } from 'zod';

// Define the Zod schema
export const productZodValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  price: z
    .number()
    .positive('Price must be a positive number')
    .min(0, 'Price cannot be negative'),
  category: z.enum([
    'Fiction',
    'Science',
    'SelfDevelopment',
    'Poetry',
    'Religious',
  ]), // Category is restricted to specific values
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string(),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(0, 'Quantity cannot be less than zero'),
  inStock: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

// Example usage
export default productZodValidationSchema;
