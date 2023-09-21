import express, { NextFunction, Request, Response } from "express";
import { User, UserDoc } from "../models/userModel";
import AppError from "../errors/appErrors";
import { getMe } from "../middlewares/user";
import { protect } from "../middlewares/userProtection";

const router = express.Router();

router.get(
  "/api/v1/users/me",
  protect,
  getMe,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      user,
    });
  }
);

export { router as currentUserRouter };
