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
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const product_model_1 = __importDefault(require("../products/product.model"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const product = req.body.products[0].product;
    const quantity = req.body.products[0].quantity;
    const Oproduct = yield product_model_1.default.findById(product);
    console.log(product);
    if (!Oproduct) {
        throw new Error('Product not found');
    }
    if (Oproduct.quantity === 0) {
        yield product_model_1.default.findByIdAndUpdate(product, { inStock: false });
    }
    if (Oproduct.quantity < quantity) {
        throw new Error('Insufficient product quantity');
    }
    console.log(req.body);
    const order = yield order_service_1.orderService.createOrder(user, req.body, req.ip);
    Oproduct.quantity -= quantity;
    yield product_model_1.default.findByIdAndUpdate(product, { quantity: Oproduct.quantity });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Order placed successfully",
        data: order,
    });
}));
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const body = req.body;
        console.log(productId, body);
        const result = yield order_service_1.orderService.updateOrder(productId, body);
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
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const body = req.body;
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
const getOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.getOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: 'Order retrieved successfully',
        data: order,
    });
}));
const getMyOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    console.log(userId);
    const order = yield order_service_1.orderService.getMyOrders(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: 'Order retrieved successfully',
        data: order,
    });
}));
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: 'Order verified successfully',
        data: order,
    });
}));
exports.orderController = {
    createOrder,
    calculateRevenue,
    verifyPayment,
    getOrders,
    updateOrder,
    getMyOrders
};
