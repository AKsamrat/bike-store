"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./app/modules/products/product.route");
const order_route_1 = require("./app/modules/orders/order.route");
const user_router_1 = __importDefault(require("./app/modules/user/user.router"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const app = (0, express_1.default)();
// perser
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ['https://wise-book-sigma.vercel.app'], credentials: true }));
//aplication routes
app.use('/api/v1/user', user_router_1.default);
app.use('/api/v1/product', product_route_1.ProductRoutes);
app.use('/api/v1/order', order_route_1.orderRoutes);
const getAController = (req, res) => {
    const a = 10;
    res.send(a);
};
app.get('/', getAController);
app.use(globalErrorhandler_1.default);
app.use('*', (req, res) => {
    res.status(404).json({
        status: false,
        message: 'Route not found',
    });
});
exports.default = app;
