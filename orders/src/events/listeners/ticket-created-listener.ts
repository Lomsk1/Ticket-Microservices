import { Message } from "node-nats-streaming";
import { Subjects } from "../subjects";
import Listener from "../base-listener";
import { TicketCreatedEvent } from "../ticket-created-event";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    const ticket = await Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
