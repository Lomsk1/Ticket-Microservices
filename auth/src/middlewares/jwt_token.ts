import jwt from "jsonwebtoken";
import { UserDoc } from "../models/userModel";
import { Request, Response } from "express";

const signToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createSendToken = (
  user: UserDoc,
  statusCode: number,
  res: Response,
  req: Request
) => {
  const token = signToken(user._id, user.email);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_EXPIRES_IN!) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
