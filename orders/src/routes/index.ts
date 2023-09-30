import express, { Request, Response } from 'express';
// import { requireAuth } from '@cygnetops/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.user!.id,
  }).populate('ticket');

  res.send(orders);
});

export { router as indexOrderRouter };
