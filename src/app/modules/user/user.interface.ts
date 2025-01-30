/* eslint-disable prettier/prettier */
import { Document, Model } from "mongoose";
import { UserRole } from "./user.constants";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
  isBlocked: boolean;
  userStatus: 'active' | 'inactive';

}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateToken(): string;
}
export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<IUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

// Create a new Model type that knows about IUserMethods...
type TUserModel = Model<IUser, IUserMethods>;

export default TUserModel;
export type TUserRole = keyof typeof UserRole;