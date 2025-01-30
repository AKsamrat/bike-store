/* eslint-disable prettier/prettier */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.registerUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Registered successfully",
    data,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.ACCEPTED,
    message: "Logged in successfully",
    data,
  });
});

const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization;

  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found !');
  // }

  const { userId, role } = req.user;

  const result = await UserService.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await UserService.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserService.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});

export const UserController = {
  registerUser,
  loginUser,
  getMe,
  changeStatus,
  changePassword
};
