"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validationZod_1 = __importDefault(require("./product.validationZod"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        //validation using zod
        const zodParsedata = product_validationZod_1.default.parse(body);
        const result = yield product_service_1.productService.createProduct(zodParsedata);
        res.status(200).json({
            success: true,
            message: 'Book created successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            stack: error.stack,
            error,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.getAllProduct();
        if (!result) {
            throw new Error('Book not found');
        }
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            stack: error.stack,
            error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.productService.getSingleProduct(productId);
        if (!result) {
            throw new Error('Book not found');
        }
        res.status(200).json({
            success: true,
            message: 'Book retrive successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Something went wrong',
            stack: error.stack,
            error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const body = req.body;
        const result = yield product_service_1.productService.updateProduct(productId, body);
        res.status(200).json({
            success: true,
            message: 'Book Update successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            stack: error.stack,
            error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.productService.deleteProduct(productId);
        if (!result) {
            throw new Error('Book not found');
        }
        res.status(200).json({
            success: true,
            message: 'Book Delete successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            stack: error.stack,
            error,
        });
    }
});
exports.productController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
