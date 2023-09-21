import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from 'cookie-session'
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorController } from "./controllers/errorController";

dotenv.config();

const app = express();

// app.set("trust proxy", true)

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)
// app.use(cookieParser());

/* Routes */
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorController);

export default app;
