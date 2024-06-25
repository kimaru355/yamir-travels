import { Prisma, PrismaClient } from "@prisma/client";
import { Event } from "../interfaces/event";
import { EventServices } from "../interfaces/event_service";
import { Res } from "../interfaces/res";

export class EventService implements EventServices {
  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  async createEvent(event: Event): Promise<Res<null>> {
    try {
      await this.prisma.event.create({
        data: event,
      });
      return {
        success: true,
        message: "Event successfully created",
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

  async updateEvent(event: Event): Promise<Res<null>> {
    try {
      await this.prisma.event.update({
        where: {
          id: event.id,
        },
        data: event,
      });
      return {
        success: true,
        message: "Event successfully updated",
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

  async deleteEvent(id: string): Promise<Res<null>> {
    try {
      await this.prisma.event.update({
        where: {
          id: id,
          isDeleted: false,
        },
        data: {
          isDeleted: true,
        },
      });
      return {
        success: true,
        message: "Event successfully deleted",
        data: null,
      };
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.message.includes("Record to update not found")) {
          return {
            success: false,
            message: "Event not found",
            data: null,
          };
        }
      }

      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEvent(eventId: string): Promise<Res<Event | null>> {
    try {
      const event: Event | null = await this.prisma.event.findUnique({
        where: {
          id: eventId,
          isDeleted: false,
        },
      });
      if (!event) {
        return {
          success: false,
          message: "Event not found",
          data: null,
        };
      }
      delete event.isDeleted;
      return {
        success: true,
        message: "Event found",
        data: event,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getAllEvents(): Promise<Res<Event[] | null>> {
    try {
      const events: Event[] = await this.prisma.event.findMany({
        where: {
          isDeleted: false,
        },
      });
      events.forEach((event) => {
        delete event.isDeleted;
      });
      return {
        success: true,
        message: "Events found",
        data: events,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventsByTourType(tourType: string): Promise<Res<Event[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          tourType: tourType,
          isDeleted: false,
        },
      });
      return {
        success: true,
        message: "Events found",
        data: events,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An Error Occurred",
        data: null,
      };
    }
  }

  async getEventsByName(eventName: string): Promise<Res<Event[] | null>> {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          isDeleted: false,
          destination: {
            contains: eventName,
          },
        },
      });
      return {
        success: true,
        message: "Events found",
        data: events,
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
