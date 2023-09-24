import { createSendToken } from './../middlewares/jwt_token';
import express, { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";
import AppError from "../errors/appErrors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post(
  "/api/v1/users/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return next(new AppError("Email is use", 400));
    }

    const user = User.build({ email, password });
    await user.save();

    createSendToken(user, 201, res, req);
  }
);

export { router as signupRouter };
