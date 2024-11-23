"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./app/modules/products/product.route");
const order_route_1 = require("./app/modules/orders/order.route");
const app = (0, express_1.default)();
// perser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//aplication routes
app.use('/api/products', product_route_1.ProductRoutes);
app.use('/api/orders', order_route_1.orderRoutes);
const getAController = (req, res) => {
    const a = 10;
    res.send(a);
};
app.get('/', getAController);
exports.default = app;
