/* eslint-disable prettier/prettier */
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import User from "./user.model";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import config from "../../config";

const registerUser = async (userData: IUser) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const loginUser = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is inactive
  const userStatus = user?.userStatus;

  if (userStatus === 'inactive') {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'This user is blocked ! !');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Invalid Credential or Password? ',
    );
  }

  //create token and sent to the  client
  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '1d' });

  return { token, user };
};
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const getMe = async (userId: string, role: string) => {
  // const decoded = verifyToken(token, config.jwt_access_secret as string);
  // const { userId, role } = decoded;

  let result = null;
  if (role === 'user') {
    result = await User.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await User.findOne({ id: userId }).populate('user');
  }
  return result;
};
const updateUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  console.log(userData)
  const user = await User.findOne(userData._id).select(
    '+password',
  );
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'inActive') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  console.log(payload.oldPassword, user?.password)

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const blockUser = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, { isBlocked: true });
  return result;
};

export const UserService = {
  registerUser,
  loginUser,
  changeStatus,
  getMe,
  updateUser,
  blockUser,
  changePassword

};
