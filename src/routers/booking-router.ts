/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { changeBookings, createBookings, listBookings } from '@/controllers';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken)
bookingRouter.get('/', listBookings)
bookingRouter.post('/', createBookings)
bookingRouter.put('/:bookingId', changeBookings)


export { bookingRouter };
