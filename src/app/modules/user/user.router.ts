/* eslint-disable prettier/prettier */
import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const userRouter = Router();

userRouter.post("/register", UserController.registerUser);
userRouter.post("/login", UserController.loginUser);
userRouter.post(
  '/change-status/:id',
  auth('admin'),
  UserController.changeStatus,
);
userRouter.post(
  '/change-password',
  auth('admin', 'user'),
  UserController.changePassword,
);

userRouter.get('/me', auth('admin'), UserController.getMe);

export default userRouter;
