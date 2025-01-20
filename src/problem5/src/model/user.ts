import mongoose, { Document, Schema } from "mongoose";
import { z } from "zod";

export const filterUserSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number(),
  perPage: z.coerce.number(),
});

export const getUserByIdSchema = z.object({
  id: z
    .string({
      required_error: "Id is required",
    })
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
});

export const createUserSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Email is invalid" }),
  age: z.number({
    required_error: "Age is required",
  }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Email is invalid" }).optional(),
  age: z.number().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export interface IFilterUserQuery {
  name?: string;
  page: number;
  perPage: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    phone: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
