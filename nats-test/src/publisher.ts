import nats from "node-nats-streaming";
import { TicketCreatePublisher } from "./events/ticket-create-publish";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new TicketCreatePublisher(stan);

  // try {
  //   await publisher.publish({
  //     id: "123",
  //     title: "content",
  //     price: 20,
  //     userId: ""
  //   });
  // } catch (err) {
  //   console.error(err);
  // }

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "concert",
  //   price: 20,
  // });

  // stan.publish("TicketCreated", data, () => {
  //   console.log("Event published");
  // });
});

// kubectl port-forward nats-depl-595bbc5477-pwmrg 4222:4222
