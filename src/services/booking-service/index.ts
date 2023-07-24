/* eslint-disable prettier/prettier */

import { forbiddenError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";


async function listBookings(userId: number) {
  const booking = bookingRepository.findBookings(userId);

  if (!booking) {
    throw notFoundError();
  }

  return booking;
}

async function createBooking(roomId: number, userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }

  if (!roomId) {
    throw notFoundError();
  }

  const room = await bookingRepository.roomCapacity(roomId);

  const bookingCount = await bookingRepository.bookingCount(roomId);

  if (room.Room.capacity === bookingCount) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.createBooking(roomId, userId);

  const bookingId = await bookingRepository.findBookingById(booking.id);

  return bookingId;
}

// async function changeBooking(userId: number) {
//   return
// }

const bookingService = {
  listBookings,
  createBooking,
};

export default bookingService;
