import express from 'express';
import { orderController } from './order.controller';

// Define the routes for the products
const router = express.Router();
router.post('/', orderController.createOrder);
router.get('/revenue', orderController.calculateRevenue);

export const orderRoutes = router;
