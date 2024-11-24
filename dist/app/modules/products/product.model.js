"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema for the TProduct interface
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'author name is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: (value) => value >= 0,
            message: 'Price cannot be negative',
        },
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
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
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false
});
//query middleware
productSchema.pre('save', function (next) {
    this.inStock = this.quantity > 0;
    next();
});
productSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// Create and export the model
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
