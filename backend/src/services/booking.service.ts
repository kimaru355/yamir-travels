import { PrismaClient } from "@prisma/client";
import { BookingServices } from "../interfaces/booking_service";
import { Booking } from "../interfaces/booking";
import { Res } from "../interfaces/res";
import { Event } from "../interfaces/event";

export class BookingService implements BookingServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createBooking(booking: Booking): Promise<Res<null>> {
    try {
      const event: Event | null = await this.prisma.event.findUnique({
        where: {
          id: booking.eventId,
          isDeleted: false,
        },
      });
      if (!event) {
        return {
          success: false,
          message: "Event does not exist",
          data: null,
        };
      }
      const prevBooking = await this.prisma.booking.findFirst({
        where: {
          userId: booking.userId,
          eventId: booking.eventId,
        },
      });
      if (prevBooking) {
        return {
          success: false,
          message: "User has already booked this event",
          data: null,
        };
      }
      await this.prisma.booking.create({
        data: booking,
      });
      return {
        success: true,
        message: "Booking successfully created",
        data: null,
      };
    } catch (error: any) {
      if (error.message.includes("Foreign key constraint failed")) {
        return {
          success: false,
          message: "Invalid Event or User Id",
          data: null,
        };
      }

      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getAllBookings(): Promise<Res<Booking[] | null>> {
    try {
      const bookings = await this.prisma.booking.findMany();
      return {
        success: true,
        message: "Bookings successfully retrieved",
        data: bookings,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getCompletedBookings(): Promise<Res<Booking[] | null>> {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          isEventCompleted: true,
        },
      });
      return {
        success: true,
        message: "Completed bookings successfully retrieved",
        data: bookings,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getIncompleteBookings(): Promise<Res<Booking[] | null>> {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          isEventCompleted: false,
        },
      });
      return {
        success: true,
        message: "Incomplete bookings successfully retrieved",
        data: bookings,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getBookingsByEventId(eventId: string): Promise<Res<Booking[] | null>> {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          eventId: eventId,
        },
      });
      return {
        success: true,
        message: "Bookings successfully retrieved",
        data: bookings,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getBookingsByUserId(userId: string): Promise<Res<Booking[] | null>> {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          userId: userId,
        },
      });
      return {
        success: true,
        message: "Bookings successfully retrieved",
        data: bookings,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }
}
