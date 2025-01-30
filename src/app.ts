import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/products/product.route';
import { orderRoutes } from './app/modules/orders/order.route';
import userRouter from './app/modules/user/user.router';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

// perser
app.use(express.json());
app.use(cors({ origin: ['https://wise-book-sigma.vercel.app'], credentials: true }));

//aplication routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', ProductRoutes);
app.use('/api/v1/order', orderRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  });
});

export default app;
