// import dotenv from "dotenv";
import express from "express";
// import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorController } from "./controllers/errorController";
import AppError from "./errors/appErrors";
import { createTicketRouter } from "./routes/new";

// dotenv.config();

const app = express();

// app.set("trust proxy", true)

app.use(cors());
app.options("*", cors());

app.use(express.json());
// app.use(
//     cookieSession({
//         signed: false,
//         secure: true
//     })
// )
app.use(cookieParser());

/* Routes */
// app.all("*", async (req, res, next) => {
//   next(new AppError("No Route Found", 404));
// });
app.use(createTicketRouter);

app.use(errorController);

export default app;
