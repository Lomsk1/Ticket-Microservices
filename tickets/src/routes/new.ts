import express, { NextFunction, Request, Response } from "express";
import { protect } from "../middlewares/userProtection";
import Ticket from "../models/ticketModel";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/v1/tickets",
  // protect,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.user.id,
    });
    await ticket.save();

    /* It's recommended setting data from database and not from req.body */
    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
