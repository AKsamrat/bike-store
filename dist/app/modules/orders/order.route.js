"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
// Define the routes for the products
const router = express_1.default.Router();
router.get('/verify', (0, auth_1.default)(user_constants_1.UserRole.user), order_controller_1.orderController.verifyPayment);
router.post('/', (0, auth_1.default)(user_constants_1.UserRole.user), order_controller_1.orderController.createOrder);
router.patch('/:productId', order_controller_1.orderController.updateOrder);
router.get('/', (0, auth_1.default)(user_constants_1.UserRole.user), order_controller_1.orderController.getOrders);
router.get('/user/:userId', (0, auth_1.default)(user_constants_1.UserRole.user), order_controller_1.orderController.getMyOrders);
router.get('/revenue', order_controller_1.orderController.calculateRevenue);
exports.orderRoutes = router;
