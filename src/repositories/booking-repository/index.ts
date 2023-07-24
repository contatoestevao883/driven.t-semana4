import { prisma } from '@/config';

async function findBookings() {
  return prisma.booking.findMany();
}

async function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function updateBooking(id: number, roomId: number, userId: number) {
  return prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
}

const hotelRepository = {
  findBookings,
  createBooking,
  updateBooking,
};

export default hotelRepository;
