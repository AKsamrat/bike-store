import express from 'express';
import { orderController } from './order.controller';
import { UserRole } from '../user/user.constants';
import auth from '../../middlewares/auth';

// Define the routes for the products
const router = express.Router();
router.get('/verify', auth(UserRole.user), orderController.verifyPayment);
router.post('/', auth(UserRole.user), orderController.createOrder);
router.patch('/:productId', orderController.updateOrder);
router.get('/', auth(UserRole.user), orderController.getOrders);
router.get('/user/:userId', auth(UserRole.user), orderController.getMyOrders);
router.get('/revenue', orderController.calculateRevenue);

export const orderRoutes = router;
