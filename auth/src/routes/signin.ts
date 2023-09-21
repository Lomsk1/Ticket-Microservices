import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import AppError from "../errors/appErrors";
import { User, UserDoc } from "../models/userModel";
import { createSendToken } from "../middlewares/jwt_token";

const router = express.Router();

router.post(
  "/api/v1/users/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    /* 1) Check if email and password exist */
    if (!email || !password) {
      return next(new AppError("Please, enter Password and Email", 400));
    }

    /* 2) Check if user exist && password is correct */
    const user: UserDoc = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Invalid Password or Email", 401));
    }

    /* 3) If everything is OK, send token to client */
    // const userToken = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //   },
    //   process.env.JWT_KEY!,
    //   {
    //     expiresIn: process.env.JWT_EXPIRES_IN,
    //   }
    // );

    // req.session = {
    //   jwt: userToken,
    // };

    createSendToken(user, 200, res, req);
  }
);

export { router as signinRouter };
