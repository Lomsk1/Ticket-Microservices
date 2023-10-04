import Publisher from "./base-publisher";
import { Subjects } from "./subjects";
import { TicketUpdatedEvent } from "./ticket-updated-event";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
