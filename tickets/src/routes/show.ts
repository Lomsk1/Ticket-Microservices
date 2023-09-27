import express, { Request, Response, NextFunction } from "express";
import Ticket from "../models/ticketModel";
import AppError from "../errors/appErrors";

const router = express.Router();

router.get(
  "/api/v1/tickets/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.d);

    if (!ticket) {
      return next(new AppError("Ticket not found with this ID", 404));
    }

    res.status(200).json({
      status: "success",
      ticket,
    });
  }
);

export { router as showTicketRouter };
