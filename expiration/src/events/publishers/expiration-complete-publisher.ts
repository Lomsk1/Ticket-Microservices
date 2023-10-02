import Publisher from "../base-publisher";
import { ExpirationCompleteEvent } from "../expiration-complete-event";
import { Subjects } from "../subjects";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
