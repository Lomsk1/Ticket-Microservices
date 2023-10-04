import { PaymentCreatedEvent } from "../payment-created-event";
import Publisher from "./base-publisher";
import { Subjects } from "./subjects";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
