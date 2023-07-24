/* eslint-disable prettier/prettier */
import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function listBookings(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const booking = bookingService.listBookings(userId);
        return res.sendStatus(httpStatus.OK).send(booking);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.send(httpStatus.FORBIDDEN);
    }
}

export async function createBookings(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { roomId } = req.body;
    try {
        const bookingId = await bookingService.createBooking(roomId, userId);
        return res.sendStatus(httpStatus.OK).send(bookingId);
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.FORBIDDEN);
    }
}

// export async function changeBookings(req: AuthenticatedRequest, res: Response) {
//     const { userId } = req;

//     try {

//     } catch (error) {

//     }
// }