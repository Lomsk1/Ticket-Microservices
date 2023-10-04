import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import Listener from "./base-listener";
import { OrderCancelledEvent } from "./order-cancelled-event";
import { Subjects } from "../publishers/subjects";
import { Order } from "../../models/order";
import { OrderStatus } from "../types/order-status";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error("Ticket not found");
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();
    // await new TicketUpdatedPublisher(this.client).publish({
    //   id: order.id,
    //   orderId: order.orderId,
    //   userId: order.userId,
    //   price: order.price,
    //   title: order.title,
    //   version: order.version,
    // });

    msg.ack();
  }
}
