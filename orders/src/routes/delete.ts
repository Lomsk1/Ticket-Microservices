import express, { NextFunction, Request, Response } from "express";
// import {
//   requireAuth,
//   NotFoundError,
//   NotAuthorizedError,
// } from '@cygnetops/common';
import { Order, OrderStatus } from "../models/order";
import AppError from "../errors/appErrors";
import { natsWrapper } from "../nats-wrapper";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("ticket");

    if (!order) {
      return next(new AppError("", 404));
    }
    if (order.userId !== req.user!.id) {
      return next(new AppError("", 404));
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled!
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
