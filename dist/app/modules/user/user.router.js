"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userRouter = (0, express_1.Router)();
userRouter.post("/register", user_controller_1.UserController.registerUser);
userRouter.post("/login", user_controller_1.UserController.loginUser);
userRouter.post('/change-status/:id', (0, auth_1.default)('admin'), user_controller_1.UserController.changeStatus);
userRouter.post('/change-password', (0, auth_1.default)('admin', 'user'), user_controller_1.UserController.changePassword);
userRouter.get('/me', (0, auth_1.default)('admin'), user_controller_1.UserController.getMe);
exports.default = userRouter;
