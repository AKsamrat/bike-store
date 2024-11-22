import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

// Define the schema for the TProduct interface
const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be greater than or equal to 0'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
      message: '{VALUE} is not a valid category',
    },
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be greater than or equal to 0'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Stock status is required'],
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // timestamps: true,
    
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    // timestamps: true,
    
  },
});

// Create and export the model
const Product = model<TProduct>('Product', productSchema);

export default Product;
