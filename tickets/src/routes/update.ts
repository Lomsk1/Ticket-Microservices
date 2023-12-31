import express, { Request, Response, NextFunction } from "express";
import Ticket from "../models/ticketModel";
import AppError from "../errors/appErrors";
import { protect } from "../middlewares/userProtection";
import { natsWrapper } from "../nats-wrapper";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";

const router = express.Router();

router.patch(
  "/api/v1/tickets/:id",
  protect,
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return next(new AppError("No Ticket found with this ID", 404));
    }

    if (ticket.orderId) {
      throw new Error("Cannot edit a reserved ticket");
    }

    if (ticket.userId !== req.user.id) {
      return next(new AppError("", 401));
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(200).json({
      status: "success",
      ticket,
    });
  }
);

export { router as updateTicketRouter };
