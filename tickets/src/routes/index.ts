import express, { Request, Response, NextFunction } from "express";
import Ticket from "../models/ticketModel";
import AppError from "../errors/appErrors";

const router = express.Router();

router.get(
  "/api/v1/tickets",
  async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find();

    if (!tickets) {
      return next(new AppError("No Tickets found", 404));
    }

    res.status(200).json({
      status: "success",
      tickets,
    });
  }
);

export { router as indexTicketRouter };
