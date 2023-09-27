// import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import { natsWrapper } from "./nats-wrapper";

// dotenv.config();

// process.on("uncaughtException", (err) => {
//   console.log(err.name, err.message);
//   console.log("UNCAUGHT REJECTION! Shutting down...");
//   process.exit(1);
// });

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    /* 1 argument - id from infra (last from arr) */
    /* 2 argument - random  */
    /* 3 argument - serer from infra */
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "microservices",
    });
    console.log("DB success");
  } catch (err) {
    console.error(err);
  }

  const server = app.listen(port, () => {
    console.log(`App running on port ${port}...!`);
  });
};

start();

// process.on("unhandledRejection", (err: any) => {
//   console.log(err.name, err.message);
//   console.log("UNHANDLED REJECTION! Shutting down...");
//   server.close(() => {
//     process.exit(1);
//   });
// });
