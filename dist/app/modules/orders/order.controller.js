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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const product_model_1 = __importDefault(require("../products/product.model"));
const order_validationZod_1 = __importDefault(require("./order.validationZod"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product, quantity } = req.body;
        const zodParsedata = order_validationZod_1.default.parse(req.body);
        // Find the product and check if the quantity is sufficient
        const Oproduct = yield product_model_1.default.findById(product);
        if (!Oproduct) {
            throw new Error('Product not found');
        }
        if (Oproduct.quantity === 0) {
            yield product_model_1.default.findByIdAndUpdate(product, { inStock: false });
        }
        if (Oproduct.quantity < quantity) {
            throw new Error('Insufficient product quantity');
        }
        const result = yield order_service_1.orderService.createOrder(zodParsedata);
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result,
        });
        // Reduce the product quantity
        Oproduct.quantity -= quantity;
        yield product_model_1.default.findByIdAndUpdate(product, { quantity: Oproduct.quantity });
        // console.log(Oproduct.quantity)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to place order',
            stack: error.stack,
            error,
        });
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield order_service_1.orderService.calculateRevenue();
        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error,
        });
    }
});
exports.orderController = {
    createOrder,
    calculateRevenue,
};
