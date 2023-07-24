import { prisma } from '@/config';

async function findBookings(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function findBookingById(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
  });
}

async function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function roomCapacity(roomId: number) {
  return prisma.booking.findFirst({
    where: {
      roomId,
    },
    include: {
      Room: true,
    },
  });
}

async function bookingCount(roomId: number) {
  return prisma.booking.count({
    where: {
      roomId,
    },
  });
}

// async function updateBooking(id: number, roomId: number, userId: number) {
//   return prisma.booking.upsert({
//     where: {
//       id,
//     },
//     create: {
//       roomId,
//       userId,
//     },
//     update: {
//       roomId,
//     },
//   });
// }

const bookingRepository = {
  findBookings,
  findBookingById,
  createBooking,
  roomCapacity,
  bookingCount,
};

export default bookingRepository;
