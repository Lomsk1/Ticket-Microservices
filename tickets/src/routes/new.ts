import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post(
  "/api/tickets",
  async (req: Request, res: Response, next: NextFunction) => {}
);

export { router as createTicketRouter };