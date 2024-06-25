import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ReviewServices } from "../interfaces/review_service";
import { Review } from "../interfaces/review";
import { Res } from "../interfaces/res";
import { Booking } from "../interfaces/booking";
import { isEventCompleted } from "../helpers/calculateDate";
import { Event } from "../interfaces/event";

export class ReviewService implements ReviewServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createReview(review: Review): Promise<Res<null>> {
    try {
      const event: Event | null = await this.prisma.event.findUnique({
        where: {
          id: review.eventId,
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
      const booking: Booking | null = await this.prisma.booking.findFirst({
        where: {
          userId: review.userId,
          eventId: review.eventId,
        },
      });
      if (!booking) {
        return {
          success: false,
          message: "User has not booked this event",
          data: null,
        };
      }
      booking.isEventCompleted = isEventCompleted(event, booking);
      if (!booking.isEventCompleted) {
        return {
          success: false,
          message: "Travel is not completed",
          data: null,
        };
      }
      review.bookingId = booking.id;
      await this.prisma.review.create({
        data: review,
      });
      return {
        success: true,
        message: "Review successfully created",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getAllReviews(): Promise<Res<Review[] | null>> {
    try {
      const reviews = await this.prisma.review.findMany();
      return {
        success: true,
        message: "Reviews successfully retrieved",
        data: reviews,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getReviewsByUserId(userId: string): Promise<Res<Review[] | null>> {
    try {
      const reviews = await this.prisma.review.findMany({
        where: {
          userId,
        },
      });
      return {
        success: true,
        message: "Reviews successfully retrieved",
        data: reviews,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getReviewsByEventId(eventId: string): Promise<Res<Review[] | null>> {
    try {
      const event: Event | null = await this.prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });
      if (!event) {
        return {
          success: false,
          message: "Event does not exist",
          data: null,
        };
      }
      const reviews = await this.prisma.review.findMany({
        where: {
          eventId,
        },
      });
      return {
        success: true,
        message: "Reviews successfully retrieved",
        data: reviews,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async updateReview(review: Review): Promise<Res<null>> {
    try {
      await this.prisma.review.update({
        where: {
          id: review.id,
        },
        data: review,
      });
      return {
        success: true,
        message: "Review successfully updated",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async deleteReview(id: string): Promise<Res<null>> {
    try {
      await this.prisma.review.delete({
        where: {
          id,
        },
      });
      return {
        success: true,
        message: "Review successfully deleted",
        data: null,
      };
    } catch (unknownError: unknown) {
      if (!(unknownError instanceof PrismaClientKnownRequestError)) {
        return {
          success: false,
          message: "An Error Occurred",
          data: null,
        };
      }
      const error: PrismaClientKnownRequestError =
        unknownError as PrismaClientKnownRequestError;
      if (error.message.includes("Record to delete does not exist.")) {
        return {
          success: false,
          message: "Event not found",
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
}
